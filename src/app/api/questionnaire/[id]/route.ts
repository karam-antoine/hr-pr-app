import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";
import type { QuestionnaireDTO } from "@/types/questionnaire";
import { toQuestionnaireDTO } from "@/mappers/questionnaireMapper";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const questionnaire = await prisma.questionnaire.findUnique({
    where: { id },
    include: {
      sections: {
        orderBy: { orderIndex: "asc" },
        include: {
          sectionQuestions: {
            orderBy: { orderIndex: "asc" },
            include: { question: true },
          },
        },
      },
    },
  });

  if (!questionnaire) {
    return NextResponse.json(
      { error: "Questionnaire not found" },
      { status: 404 }
    );
  }
  const dto: QuestionnaireDTO = toQuestionnaireDTO(questionnaire);

  return NextResponse.json(dto);
}
