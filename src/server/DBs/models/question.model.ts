import { Schema } from 'mongoose';

export const questionsSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  expression: {
    type: String,
    required: true,
  },
  answerIndex: {
    type: Number,
    required: true,
  },
  answerUserIndex: {
    type: Number,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  answerTime: {
    type: Number,
    required: true,
  },
  explanation: {
    type: String,
    default: null,
  },
  practicalApplication: {
    type: String,
    default: null,
  },
});
