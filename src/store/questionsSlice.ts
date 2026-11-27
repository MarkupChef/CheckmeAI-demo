import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question, Questions } from '@store/api/models/Questions.type';
import { INTERVIEW_TIMER_DURATION } from '@utils/constants/constants';

export interface StartedTopic {
  slug: string;
  name: string;
  icon: string;
  level: string;
}

export interface InitialState {
  index: number;
  lastIndexWithAnswer: number;
  modeId: string;
  topic: StartedTopic | null;
  level: string | null;
  name: string | null;
  questions: Question[];
  started: boolean;
  finished: boolean;
  timer: number;
}

const initialState: InitialState = {
  index: 0,
  lastIndexWithAnswer: 0,
  modeId: '',
  topic: null,
  level: null,
  name: null,
  questions: [],
  started: false,
  finished: false,
  timer: INTERVIEW_TIMER_DURATION,
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    clearQuestionsSlice: () => initialState,
    start(state, action: PayloadAction<{ modeId: string; topic?: StartedTopic }>) {
      state.index = 0;
      state.modeId = action.payload.modeId;
      state.topic = action.payload.topic || null;
      state.questions = [];
      state.started = true;
      state.finished = false;
    },
    setAnswer(state, action: PayloadAction<{ answerIndex: number }>) {
      state.questions[state.index].answerUserIndex = action.payload.answerIndex;
    },
    setInterviewName(state, action: PayloadAction<{ name: string }>) {
      state.name = action.payload.name;
    },
    setLevel(state, action: PayloadAction<{ level: string }>) {
      state.level = action.payload.level;
    },
    setQuestions(state, action: PayloadAction<Questions>) {
      state.questions = action.payload.questions;
      state.index = 0;
      state.lastIndexWithAnswer = action.payload.lastIndexWithAnswer;
      state.started = true;
      state.finished = false;
    },
    setAnswers(state, action: PayloadAction<{ date: string; index: string; options: string[] }>) {
      const lastIndexWithAnswer = state.lastIndexWithAnswer + 1;
      state.questions[lastIndexWithAnswer].options = action.payload.options;
      state.questions[lastIndexWithAnswer].answerIndex = action.payload.index;
      state.questions[lastIndexWithAnswer].date = action.payload.date;
      state.lastIndexWithAnswer = lastIndexWithAnswer;
    },
    nextQuestion(state) {
      if (state.index === state.questions.length - 1) {
        state.started = false;
        state.finished = true;
      } else if (state.index < state.questions.length - 1) {
        state.index++;
      }
    },
    prevQuestion(state) {
      state.index = state.index > 0 ? state.index - 1 : state.index;
    },
    setTimer(state, action: PayloadAction<number>) {
      state.timer = action.payload;
    },
    decrementTimer(state) {
      if (state.timer > 0) {
        state.timer = state.timer - 1;
      }
    },
    resetTimer(state) {
      state.timer = INTERVIEW_TIMER_DURATION;
    },
    setAnswerTime(state) {
      state.questions[state.index].answerTime = INTERVIEW_TIMER_DURATION - state.timer;
    },
  },
});

export const {
  clearQuestionsSlice,
  start,
  setLevel,
  setInterviewName,
  setAnswer,
  nextQuestion,
  prevQuestion,
  setQuestions,
  setAnswers,
  setTimer,
  resetTimer,
  decrementTimer,
  setAnswerTime,
} = questionsSlice.actions;

export default questionsSlice.reducer;
