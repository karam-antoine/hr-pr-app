import { prisma } from '@/lib/prisma';
import { QuestionnaireDTO } from '@/types/questionnaire';
import { toQuestionnaireDTO } from '@/mappers/questionnaireMapper';

export async function getQuestionnaireById(id: string) {
  const questionnaire = await prisma.questionnaire.findUnique({
    where: { id },
    include: {
      sections: {
        orderBy: { orderIndex: 'asc' },
        include: {
          sectionQuestions: {
            orderBy: { orderIndex: 'asc' },
            include: { question: true },
          },
        },
      },
    },
  });

  if (!questionnaire) {
    throw new Error('Questionnaire not found');
  }
  const dto: QuestionnaireDTO = toQuestionnaireDTO(questionnaire);
  return dto;
}
