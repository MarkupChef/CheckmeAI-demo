import { Schema, model, models } from 'mongoose';
import { questionsSchema } from './question.model';

const interviewByJobDescSchema = new Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    jobDesc: {
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

const InterviewByJobDesc = models.interview_by_job_desc || model('interview_by_job_desc', interviewByJobDescSchema);

export default InterviewByJobDesc;
