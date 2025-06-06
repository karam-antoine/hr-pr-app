import type {
  Answer as PrismaAnswer,
  ResponseObjective as PrismaResponseObjective,
  ResponseSet as PrismaResponseSet,
  KPI as PrismaKPI,
} from "@prisma/client";

import type {
  AnswerDTO,
  ResponseObjectiveDTO,
  SaveResponsesResponseDTO,
  KPIDTO,
} from "@/types/response";

export function toAnswerDTO(raw: PrismaAnswer): AnswerDTO {
  return {
    id:                raw.id,
    sectionQuestionId: raw.sectionQuestionId,
    ratingValue:       raw.ratingValue,
    textValue:         raw.textValue,
    createdAt:         raw.createdAt.toISOString(),
    updatedAt:         raw.updatedAt.toISOString(),
  };
}

function toKPIDTO(raw: PrismaKPI): KPIDTO {
  return {
    id:        raw.id,
    text:      raw.text,
    status:    raw.status,
    createdAt: raw.createdAt.toISOString(),
    updatedAt: raw.updatedAt.toISOString(),
  };
}

export function toResponseObjectiveDTO(
  raw: PrismaResponseObjective & { kpis: PrismaKPI[] }
): ResponseObjectiveDTO {
  return {
    id:             raw.id,
    objectiveIndex: raw.objectiveIndex,
    description:    raw.description,
    kpis:           raw.kpis.map(toKPIDTO),
    createdAt:      raw.createdAt.toISOString(),
    updatedAt:      raw.updatedAt.toISOString(),
  };
}

export function toResponseSetDTO(
  raw: PrismaResponseSet & {
    answers:            PrismaAnswer[];
    responseObjectives: (PrismaResponseObjective & { kpis: PrismaKPI[] })[];
  }
): SaveResponsesResponseDTO {
  return {
    id:                 raw.id,
    assignmentId:       raw.assignmentId,
    status:             raw.status,
    createdAt:          raw.createdAt.toISOString(),
    updatedAt:          raw.updatedAt.toISOString(),
    submittedAt:        raw.submittedAt?.toISOString() ?? null,
    answers:            raw.answers.map(toAnswerDTO),
    responseObjectives: raw.responseObjectives.map(toResponseObjectiveDTO),
  };
}
