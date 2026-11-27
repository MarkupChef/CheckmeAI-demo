import InterviewModeType from '@store/api/models/InterviewMode.type';
import { InterviewQuestion } from '@types';

export interface Interview {
  _id: string;
  name: string; // TODO: need to remove but it should be to check if it uses in the code
  topic_slug: string;
  level: string;
  user_id: string;
  questions: InterviewQuestion[];
  recommendation: string;
  passed: boolean;
  createdAt: string;
  mode: InterviewModeType;
  public_hash: string | null;
}
