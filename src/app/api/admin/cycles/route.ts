import { NextResponse } from "next/server";
import {
  createCycleWithAssignments,
  listCycles,
} from "@/services/cycleService";

export async function GET() {
  const cycles = await listCycles();
  return NextResponse.json(cycles);
}

export async function POST(req: Request) {
  try {
    const { name, startDate, endDate, participantIds, questionnaireIds } =
      await req.json();

    if (
      !name ||
      !startDate ||
      !endDate ||
      !Array.isArray(participantIds) ||
      !Array.isArray(questionnaireIds)
    ) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const cycle = await createCycleWithAssignments({
      name,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      participantIds,
      questionnaireIds,
    });
    return NextResponse.json(cycle, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Unknown error" },
      { status: 500 }
    );
  }
}
