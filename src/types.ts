import { Question } from '@store/api/models/Questions.type';

// TODO: remove duplicated types
export type LevelTypes = 'junior' | 'middle' | 'senior';
export type ModeStatus = 'pending' | 'paid' | 'started' | 'finished';
export type PaymentStatus = 'pending' | 'succeeded';
export type TopicLevels = 'junior' | 'middle' | 'senior';

export type ModeSlug = 'free' | 'warmup' | 'interview';

export interface User {
  name: string;
  email: string;
  auth: string;
}

export interface SavedUser extends User {
  id: string;
}

export interface Recommendation {
  des: string;
}

export interface InterviewQuestion extends Omit<Question, 'answerIndex'> {
  answerIndex: number;
}

export type InterviewMode = Omit<Mode, 'available' | 'is_used'>;

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
  mode: InterviewMode;
  public_hash: string | null;
}

export interface InterviewByJobDesc {
  _id: string;
  jobTitle: string;
  companyName: string;
  jobDesc: string;
  user_id: string;
  questions: InterviewQuestion[];
  recommendation: string;
  passed: boolean;
  createdAt: string;
  mode: InterviewMode;
  public_hash: string | null;
}

export interface NewInterview {
  topic_slug: string;
  level: string;
  user_id: string;
  questions: InterviewQuestion[];
  passed: boolean;
  mode: string;
  public_hash: string | null;
}

export interface NewInterviewByJobDesc {
  jobTitle: string;
  companyName: string;
  jobDesc: string;
  user_id: string;
  questions: InterviewQuestion[];
  passed: boolean;
  mode: string;
  public_hash: string | null;
}

export interface Topic {
  name: string;
  slug: string;
  image: string;
  isAvailable: boolean;
}

export interface SettingsQuestionsRequest {
  topic: string;
  topicName: string;
  level: TopicLevels | null;
  firstPartAnswers: number;
}

export interface Mode {
  _id: string;
  title: string;
  description: string;
  price: number;
  number_questions: number;
  is_certificate: boolean;
  is_explanation: boolean;
  is_practical_application: boolean;
  is_recommendation: boolean;
  available: boolean; // not in the DB table
  is_used?: boolean; // not in the DB table, demo mode only
  slug: ModeSlug;
}

export type Price = Mode;

export interface Transaction {
  client_secret: string;
  payment_transaction_id: string;
  payment_system: string;
  payment_status: PaymentStatus;
  payment_amount: number;
  mode: string;
  mode_status: ModeStatus;
}

export interface MetaPage {
  slug: string;
  title: string;
  description: string;
  content: string;
}

export interface SocialLink {
  key: string;
  value: string | null;
  name: string | null;
}

export interface InterviewsProps {
  interviews: [
    {
      _id: string;
      jobTitle: string;
      companyName: string;
      jobDesc: string;
      questions: InterviewQuestion[];
      passed: boolean;
      createdAt: string;
    },
  ];
}

export interface InterviewsPageProps {
  interviews: InterviewsProps['interviews'];
  topicInterviews: [
    {
      _id: string;
      jobTitle: string;
      companyName: string;
      jobDesc: string;
      topic_slug: string;
      level: LevelTypes;
      questions: InterviewQuestion[];
      passed: boolean;
      createdAt: string;
    },
  ];
  topics: Topic[];
}
