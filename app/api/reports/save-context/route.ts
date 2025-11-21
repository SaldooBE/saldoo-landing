import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getQuestionsForStep } from '@/lib/questionnaire-data';

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
    const { context_json, report_id } = body;

    if (!context_json || typeof context_json !== 'object') {
      return NextResponse.json(
        { error: 'Invalid context_json' },
        { status: 400 }
      );
    }

    // Check if all required questions are answered
    const allRequiredQuestions = [1, 2, 3, 4, 5, 6, 8].flatMap(step => 
      getQuestionsForStep(step).filter(q => q.required)
    );

    const allRequiredAnswered = allRequiredQuestions.every(question => {
      const value = context_json[question.id];
      return value !== undefined && value !== null && value !== '';
    });

    const status = allRequiredAnswered ? 'context_completed' : 'draft';

    // Create or update report
    if (report_id) {
      // Update existing report
      const { data, error } = await supabase
        .from('reports')
        .update({
          context_json,
          status,
        })
        .eq('id', report_id)
        .eq('client_id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating report:', error);
        return NextResponse.json(
          { error: 'Failed to update report' },
          { status: 500 }
        );
      }

      return NextResponse.json({ 
        report_id: data.id,
        status: data.status 
      });
    } else {
      // Create new report
      const { data, error } = await supabase
        .from('reports')
        .insert({
          client_id: user.id,
          context_json,
          status,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating report:', error);
        return NextResponse.json(
          { error: 'Failed to create report' },
          { status: 500 }
        );
      }

      return NextResponse.json({ 
        report_id: data.id,
        status: data.status 
      });
    }
  } catch (error) {
    console.error('Error in save-context:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


