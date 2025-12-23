
export interface Question {
  noi_dung: string;
  lua_chon: { [key: string]: string };
  dap_an: string;
}

export interface QuizData {
  "PHẦN I": Question[];
}

export interface UserAnswer {
  questionIndex: number;
  answer: string;
  isCorrect: boolean;
}

export interface QuizResult {
  correct: number;
  incorrect: number;
  total: number;
}
