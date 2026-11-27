import { Schema, model, models } from 'mongoose';
import { questionsSchema } from './question.model';

const interviewSchema = new Schema(
  {
    topic_slug: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    questions: {
      type: [questionsSchema],
      required: true,
    },
    passed: {
      type: Boolean,
      required: true,
    },
    public_hash: {
      type: String,
      default: null,
    },
    recommendation: {
      type: String,
    },
    mode: {
      type: Schema.Types.ObjectId,
      ref: 'Mode',
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Interview = models.Interview || model('Interview', interviewSchema);

export default Interview;
