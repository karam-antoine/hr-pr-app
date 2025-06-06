export interface AnswerInputDTO {
  sectionQuestionId: string;
  ratingValue: number | null;
  textValue: string | null;
}

export interface ObjectiveInputDTO {
  objectiveIndex: number;
  description: string;
  kpis: {
    text: string;
    status: string;
  }[];
}

export interface SaveResponsesRequestDTO {
  assignmentId: string;
  status: "DRAFT" | "SUBMITTED";
  answers: AnswerInputDTO[];
  objectives: ObjectiveInputDTO[];
}

export interface AnswerDTO {
  id: string;
  sectionQuestionId: string;
  ratingValue: number | null;
  textValue: string | null;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

export interface KPIDTO {
  id: string;
  text: string;
  status: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

export interface ResponseObjectiveDTO {
  id: string;
  objectiveIndex: number;
  description: string;
  kpis: KPIDTO[];
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

export interface SaveResponsesResponseDTO {
  id: string;
  assignmentId: string;
  status: "DRAFT" | "SUBMITTED";
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  submittedAt: string | null;
  answers: AnswerDTO[];
  responseObjectives: ResponseObjectiveDTO[];
}
