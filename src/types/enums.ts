const Levels = {
  Leadership: "Leadership",
  Manager: "Manager",
  Supervisory: "Supervisory",
  IC: "IC",
};

const Statuses = {
  DRAFT: "DRAFT",
  SUBMITTED: "SUBMITTED",
};

const Categories = {
  Technical: "Technical",
  NonTechnical: "NonTechnical",
};

const QuestionTypes = {
  RatingScale: "RatingScale",
  FreeText: "FreeText",
};

const SectionTypes = {
  QUESTIONS: "QUESTIONS",
  OBJECTIVES: "OBJECTIVES",
};

const QuestionnaireTypes = {
  Self: "Self",
  Manager: "Manager",
  Upwards: "Upwards",
  Peer: "Peer",
};

type Levels = (typeof Levels)[keyof typeof Levels];
type Statuses = (typeof Statuses)[keyof typeof Statuses];
type Categories = (typeof Categories)[keyof typeof Categories];
type QuestionTypes = (typeof QuestionTypes)[keyof typeof QuestionTypes];
type SectionTypes = (typeof SectionTypes)[keyof typeof SectionTypes];
type QuestionnaireTypes =
  (typeof QuestionnaireTypes)[keyof typeof QuestionnaireTypes];

export {
  Levels,
  Statuses,
  Categories,
  SectionTypes,
  QuestionTypes,
  QuestionnaireTypes,
};
