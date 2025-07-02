import {
  getCycleDetails,
  updateCycleWithAssignments,
} from '@/services/cycleService';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const cycles = await getCycleDetails(id);
  return NextResponse.json(cycles);
}
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    await updateCycleWithAssignments({
      id: id,
      name: body.name,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
      participantIds: body.participantIds,
      questionnaireIds: body.questionnaireIds,
    });
    return NextResponse.json({ ok: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
