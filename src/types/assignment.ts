export type AssignmentStatus = 'DUE' | 'DRAFT' | 'SUBMITTED';

export interface AssignmentDTO {
  id: string;
  revieweeName: string;
  dueDate: string;
  questionnaireId: string;
  status: AssignmentStatus;
  rating: number | null;
}

export interface CycleDTO {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
}
export interface CycleDetailsDTO {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  participantIds: string[];
  questionnaireIds: string[];
}

export interface PastAssignmentDTO extends AssignmentDTO {
  cycleName: string;
}
