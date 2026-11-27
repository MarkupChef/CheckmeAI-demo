export interface GetQuestions {
  topic: string;
  level: string;
  mode_id: string;
}

export interface GetQuestionsByJobDesc {
  jobTitle: string;
  jobDesc: string;
  mode_id: string;
}

export interface CheckJobDesc {
  jobTitle: string;
  jobDesc: string;
  companyName: string;
  modeId: string;
}

export interface Question {
  id: number;
  expression: string;
  date: string;
  answerIndex: string | null;
  answerUserIndex: number;
  options: any[];
  answerTime: number;
  explanation: string | null;
  practicalApplication: string | null;
}

export interface Questions {
  lastIndexWithAnswer: number;
  questions: Question[];
}
