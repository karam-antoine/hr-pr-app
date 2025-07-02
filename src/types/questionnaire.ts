import {
  Categories,
  Levels,
  QuestionnaireTypes,
  QuestionTypes,
  SectionTypes,
} from './enums';

export interface QuestionDTO {
  id: string;
  text: string;
  type: QuestionTypes;
  description?: string | null;
}

export interface SectionQuestionDTO {
  id: string;
  orderIndex: number;
  required: boolean;
  question: QuestionDTO;
}
export interface SectionDTO {
  id: string;
  title: string;
  type: SectionTypes;
  orderIndex: number;
  sectionQuestions: SectionQuestionDTO[];
}

export interface QuestionnaireDTO {
  id: string;
  name: string;
  level: Levels;
  category: Categories;
  type: QuestionnaireTypes;
  isActive: boolean;
  sections?: SectionDTO[];
}
export interface UserDTO {
  id: string;
  name: string;
}
