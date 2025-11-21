import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { FileMetadata } from '@/lib/types/report';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
];

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

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const report_id = formData.get('report_id') as string;

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    if (!report_id) {
      return NextResponse.json(
        { error: 'report_id is required' },
        { status: 400 }
      );
    }

    // Verify report belongs to user
    const { data: report, error: reportError } = await supabase
      .from('reports')
      .select('id, files_json')
      .eq('id', report_id)
      .eq('client_id', user.id)
      .single();

    if (reportError || !report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      );
    }

    const uploadedFiles: FileMetadata[] = report.files_json || [];
    const errors: string[] = [];

    // Upload each file
    for (const file of files) {
      // Validate file
      if (!ALLOWED_TYPES.includes(file.type)) {
        errors.push(`${file.name}: Ongeldig bestandstype. Alleen PDF en Excel zijn toegestaan.`);
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name}: Bestand is te groot (max 10MB).`);
        continue;
      }

      try {
        // Create file path: reports/{clientId}/{reportId}/{filename}
        const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const filePath = `${user.id}/${report_id}/${fileName}`;

        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('reports')
          .upload(filePath, buffer, {
            contentType: file.type,
            upsert: false,
          });

        if (uploadError) {
          console.error('Upload error:', uploadError);
          errors.push(`${file.name}: Upload mislukt.`);
          continue;
        }

        // Add to files metadata
        uploadedFiles.push({
          name: file.name,
          path: filePath,
          size: file.size,
          type: file.type,
          uploaded_at: new Date().toISOString(),
        });
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error);
        errors.push(`${file.name}: Upload mislukt.`);
      }
    }

    // Update report with file metadata
    const { error: updateError } = await supabase
      .from('reports')
      .update({
        files_json: uploadedFiles,
        status: uploadedFiles.length > 0 ? 'uploaded' : report.status,
      })
      .eq('id', report_id)
      .eq('client_id', user.id);

    if (updateError) {
      console.error('Error updating report:', updateError);
      return NextResponse.json(
        { error: 'Failed to update report' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      uploaded_files: uploadedFiles,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error('Error in upload-files:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


