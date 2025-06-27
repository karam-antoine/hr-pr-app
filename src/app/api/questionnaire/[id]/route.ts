import { NextResponse, type NextRequest } from 'next/server';

import { getQuestionnaireById } from '@/services/questionnaireService';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const dto = getQuestionnaireById(id);

    return NextResponse.json(dto);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
