import InterviewModeType from '@store/api/models/InterviewMode.type';
import { InterviewQuestion } from '@types';

export interface InterviewByJobDescType {
  _id: string;
  jobTitle: string;
  companyName: string;
  jobDesc: string;
  user_id: string;
  questions: InterviewQuestion[];
  recommendation: string;
  passed: boolean;
  createdAt: string;
  mode: InterviewModeType;
  public_hash: string | null;
}
