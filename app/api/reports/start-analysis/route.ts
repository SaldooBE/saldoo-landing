import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { parseFinancialFile } from '@/lib/parsers/file-parser';
import { calculateKPIs } from '@/lib/kpis/calculator';
import { prepareContextForAI } from '@/lib/context/preparer';
import { generateReport } from '@/lib/ai/report-generator';
import { NormalizedData } from '@/lib/types/report';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Authenticate user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { report_id } = body;

    if (!report_id) {
      return NextResponse.json(
        { error: 'report_id is required' },
        { status: 400 }
      );
    }

    // Verify report exists and belongs to user
    const { data: report, error: reportError } = await supabase
      .from('reports')
      .select('*')
      .eq('id', report_id)
      .eq('client_id', user.id)
      .single();

    if (reportError || !report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      );
    }

    // Check if report is ready for analysis (allow retry from error status)
    if (report.status !== 'uploaded' && report.status !== 'error') {
      return NextResponse.json(
        { error: `Report status must be 'uploaded' or 'error' to start analysis, current status: ${report.status}` },
        { status: 400 }
      );
    }

    // Check if report already has generated data (idempotency)
    if (report.status === 'generated' && report.report_json) {
      return NextResponse.json({
        success: true,
        message: 'Report already generated',
        report_id: report.id,
        status: report.status,
      });
    }

    // If status is 'error', reset it to 'uploaded' to allow retry
    if (report.status === 'error') {
      await supabase
        .from('reports')
        .update({
          status: 'uploaded',
          error_message: null,
        })
        .eq('id', report_id)
        .eq('client_id', user.id);
    }

    // Validate required data
    if (!report.context_json) {
      return NextResponse.json(
        { error: 'Context data is missing' },
        { status: 400 }
      );
    }

    if (!report.files_json || report.files_json.length === 0) {
      return NextResponse.json(
        { error: 'No files uploaded' },
        { status: 400 }
      );
    }

    // Start analysis pipeline (async, but we'll wait for completion)
    try {
      // Step 1: Download and parse files
      let combinedNormalizedData: NormalizedData | null = null;

      const parseErrors: string[] = [];
      
      for (const fileMeta of report.files_json) {
        try {
          console.log(`Processing file: ${fileMeta.name} (${fileMeta.type})`);
          
          // Download file from Storage
          const { data: fileData, error: downloadError } = await supabase.storage
            .from('reports')
            .download(fileMeta.path);

          if (downloadError || !fileData) {
            const errorMsg = `Failed to download file ${fileMeta.name}: ${downloadError?.message || 'Unknown error'}. Path: ${fileMeta.path}`;
            console.error(errorMsg);
            parseErrors.push(errorMsg);
            // Continue with other files instead of throwing immediately
            continue;
          }

          // Convert blob to buffer
          const arrayBuffer = await fileData.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          
          console.log(`File ${fileMeta.name} downloaded successfully, size: ${buffer.length} bytes`);

          // Parse file
          const parsedData = await parseFinancialFile(
            buffer,
            fileMeta.name,
            fileMeta.type
          );

          console.log(`File ${fileMeta.name} parsed successfully`);

          // Merge with existing data (prefer non-null values)
          if (!combinedNormalizedData) {
            combinedNormalizedData = parsedData;
          } else {
            combinedNormalizedData = mergeNormalizedData(combinedNormalizedData, parsedData);
          }
        } catch (error) {
          const errorMsg = `Error parsing file ${fileMeta.name}: ${error instanceof Error ? error.message : 'Unknown error'}`;
          console.error(errorMsg, error);
          parseErrors.push(errorMsg);
          // Continue with other files
        }
      }

      if (!combinedNormalizedData) {
        const errorDetails = parseErrors.length > 0 
          ? `\nErrors encountered:\n${parseErrors.join('\n')}`
          : 'No files were successfully parsed.';
        throw new Error(`Failed to parse any files. ${errorDetails}`);
      }

      // Update status to 'parsed'
      await supabase
        .from('reports')
        .update({
          normalized_json: combinedNormalizedData,
          status: 'parsed',
        })
        .eq('id', report_id)
        .eq('client_id', user.id);

      // Step 2: Calculate KPIs
      const kpis = calculateKPIs(combinedNormalizedData);

      await supabase
        .from('reports')
        .update({
          kpis_json: kpis,
        })
        .eq('id', report_id)
        .eq('client_id', user.id);

      // Step 3: Prepare context for AI
      const compactContext = prepareContextForAI(report.context_json);

      // Step 4: Generate AI report
      if (!process.env.OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY is not configured. Please set it in your .env.local file.');
      }
      
      const reportData = await generateReport(
        compactContext,
        combinedNormalizedData,
        kpis
      );

      // Step 5: Save final report
      const { error: finalUpdateError } = await supabase
        .from('reports')
        .update({
          report_json: reportData,
          status: 'generated',
        })
        .eq('id', report_id)
        .eq('client_id', user.id);

      if (finalUpdateError) {
        throw new Error(`Failed to save report: ${finalUpdateError.message}`);
      }

      return NextResponse.json({
        success: true,
        message: 'Analysis completed successfully',
        report_id: report.id,
        status: 'generated',
      });
    } catch (error) {
      console.error('Error in analysis pipeline:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      
      // Log full error details for debugging
      console.error('Full error details:', {
        message: errorMessage,
        stack: errorStack,
        report_id: report_id,
      });
      
      // Update report with error status
      await supabase
        .from('reports')
        .update({
          status: 'error',
          error_message: errorMessage,
        })
        .eq('id', report_id)
        .eq('client_id', user.id);

      return NextResponse.json(
        { 
          error: 'Analysis failed',
          message: errorMessage,
          details: errorStack ? errorStack.substring(0, 500) : undefined, // Limit stack trace length
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in start-analysis:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Merge two normalized data objects, preferring non-null values
 */
function mergeNormalizedData(
  data1: NormalizedData,
  data2: NormalizedData
): NormalizedData {
  return {
    year: data1.year || data2.year,
    pnl: {
      revenue: data1.pnl.revenue ?? data2.pnl.revenue,
      direct_costs: data1.pnl.direct_costs ?? data2.pnl.direct_costs,
      opex: data1.pnl.opex ?? data2.pnl.opex,
      net_profit: data1.pnl.net_profit ?? data2.pnl.net_profit,
    },
    balance: {
      cash: data1.balance.cash ?? data2.balance.cash,
      receivables: data1.balance.receivables ?? data2.balance.receivables,
      payables: data1.balance.payables ?? data2.balance.payables,
      equity: data1.balance.equity ?? data2.balance.equity,
      total_assets: data1.balance.total_assets ?? data2.balance.total_assets,
      current_liabilities: data1.balance.current_liabilities ?? data2.balance.current_liabilities,
      current_assets: data1.balance.current_assets ?? data2.balance.current_assets,
    },
    missing_fields: [
      ...(data1.missing_fields || []),
      ...(data2.missing_fields || []),
    ].filter((v, i, a) => a.indexOf(v) === i), // Remove duplicates
  };
}

