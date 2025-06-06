import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import type { SaveResponsesRequestDTO } from "@/types/response";
import { saveOrUpdateResponseSet } from "@/services/responseService";

export async function POST(request: NextRequest) {
  let body: SaveResponsesRequestDTO;
  try {
    body = (await request.json()) as SaveResponsesRequestDTO;
  } catch (err) {
    console.error("Error parsing JSON:", err);
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (
    typeof body.assignmentId !== "string" ||
    (body.status !== "DRAFT" && body.status !== "SUBMITTED") ||
    !Array.isArray(body.answers) ||
    !Array.isArray(body.objectives)
  ) {
    return NextResponse.json({ error: "Malformed request" }, { status: 400 });
  }

  try {
    const result = await saveOrUpdateResponseSet(body);
    return NextResponse.json(result);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Error parsing JSON:", err);
    if (err.message === "Assignment not found") {
      return NextResponse.json({ error: err.message }, { status: 404 });
    }
    console.error("Error in saveOrUpdateResponseSet:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
