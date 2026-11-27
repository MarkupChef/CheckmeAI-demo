import { ModeSlug } from '@types';

interface InterviewModeType {
  _id: string;
  title: string;
  description: string;
  number_questions: number;
  price: number;
  is_certificate: boolean;
  slug: ModeSlug;
}

export default InterviewModeType;
