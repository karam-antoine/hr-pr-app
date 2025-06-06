import type {
  Questionnaire as PrismaQuestionnaire,
  Section as PrismaSection,
  SectionQuestion as PrismaSectionQuestion,
  Question as PrismaQuestion,
} from "@prisma/client";

import type {
  QuestionnaireDTO,
  SectionDTO,
  SectionQuestionDTO,
  QuestionDTO,
} from "@/types/questionnaire";

function mapQuestion(raw: PrismaQuestion): QuestionDTO {
  return {
    id: raw.id,
    text: raw.text,
    type: raw.type,
    description: raw.description,
  };
}

function mapSectionQuestion(
  rawSQ: PrismaSectionQuestion & { question: PrismaQuestion }
): SectionQuestionDTO {
  return {
    id: rawSQ.id,
    orderIndex: rawSQ.orderIndex,
    required: rawSQ.required,
    question: mapQuestion(rawSQ.question),
  };
}
function mapSection(
  rawSec: PrismaSection & {
    sectionQuestions: (PrismaSectionQuestion & { question: PrismaQuestion })[];
  }
): SectionDTO {
  return {
    id: rawSec.id,
    title: rawSec.title,
    type: rawSec.type,
    orderIndex: rawSec.orderIndex,
    sectionQuestions: rawSec.sectionQuestions.map(mapSectionQuestion),
  };
}

function toQuestionnaireDTO(
  raw: PrismaQuestionnaire & {
    sections: (PrismaSection & {
      sectionQuestions: (PrismaSectionQuestion & {
        question: PrismaQuestion;
      })[];
    })[];
  }
): QuestionnaireDTO {
  return {
    id: raw.id,
    name: raw.name,
    level: raw.level,
    category: raw.category,
    type: raw.type,
    isActive: raw.isActive,
    sections: raw.sections.map(mapSection),
  };
}

export { toQuestionnaireDTO, mapQuestion, mapSectionQuestion, mapSection };
