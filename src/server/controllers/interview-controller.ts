import Interview from '@server/DBs/models/interview';
import InterviewByJobDesc from '@server/DBs/models/interviewByJobDesc';
import Mode from '@server/DBs/models/mode';
import Transaction from '@server/DBs/models/transaction';
import { getTopic } from '@server/controllers/topic-controller';
import { InterviewByJobDescType } from '@store/api/models/InterviewByJobDesc.type';
import { NewInterview, NewInterviewByJobDesc } from '@types';
import { TRANSACTION_MODE_STATUSES } from '@utils/constants/constants';
import dbConnect from '@utils/dbConnect';
import { Interview as InterviewType } from '../../store/api/models/Interview.type';

export const getInterviews = async (filter: {}): Promise<InterviewType[] | null | never> => {
  await dbConnect();

  try {
    return await Interview.find(filter).sort({ createdAt: -1 });
  } catch (err: any) {
    throw new Error(`Error getting interviews: ${err.message}`);
  }
};

export const getInterviewsByJobDesc = async (filter: {}): Promise<InterviewByJobDescType[] | null> => {
  await dbConnect();

  try {
    return await InterviewByJobDesc.find(filter).sort({ createdAt: -1 });
  } catch (err: any) {
    throw new Error(`Error getting interviews: ${err.message}`);
  }
};

export const getInterviewById = async (id: string, user_id: string): Promise<any | never> => {
  await dbConnect();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const ModeInit = Mode; // TODO: need to initialize Mode to populate('mode')

  try {
    return await Interview.findOne({ _id: id, user_id }).populate('mode').exec();
  } catch (err: any) {
    throw new Error(`Error getting interview by id: ${err.message}`);
  }
};

export const getInterviewByJobDescById = async (id: string, userId: string): Promise<InterviewByJobDescType> => {
  try {
    await dbConnect();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ModeInit = Mode; // TODO: need to initialize Mode to populate('mode')
    const interview = await InterviewByJobDesc.findOne({ _id: id, user_id: userId }).populate('mode');

    if (!interview) {
      throw new Error(`Interview ${id} is not found.`);
    }

    return interview;
  } catch (err: any) {
    throw new Error(`Error getting interview by id for job desc: ${err.message}`);
  }
};

export const getInterviewWithTitleById = async (
  id: string,
  user_id: string
): Promise<{ interview: any; title: string } | null> => {
  const interviewByJobDesc = await getInterviewByJobDescById(id, user_id).catch(() => null);

  if (interviewByJobDesc) {
    return { interview: interviewByJobDesc, title: interviewByJobDesc.jobTitle };
  }

  const interview = await getInterviewById(id, user_id).catch(() => null);

  if (!interview) {
    return null;
  }

  const topic = await getTopic(interview.topic_slug);
  const level = `${interview.level.charAt(0).toUpperCase()}${interview.level.slice(1)}`;

  return { interview, title: `${level} ${topic?.name || interview.topic_slug}` };
};

export const getInterviewByModeId = async (mode_id: string, user_id: string): Promise<any | never> => {
  await dbConnect();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const ModeInit = Mode; // TODO: need to initialize Mode to populate('mode')

  try {
    return await Interview.findOne({ mode: mode_id, user_id }).populate('mode').exec();
  } catch (err: any) {
    throw new Error(`Error getting interview by slug: ${err.message}`);
  }
};

export const saveInterview = async (data: NewInterview) => {
  await dbConnect();

  const interview = new Interview(data);

  try {
    // TODO not sure if this is the best place to update transactions
    await Transaction.updateMany(
      { user_id: data.user_id, mode_status: TRANSACTION_MODE_STATUSES.IN_PROGRESS },
      { mode_status: TRANSACTION_MODE_STATUSES.FINISHED }
    );

    return await interview.save();
  } catch (err: any) {
    throw new Error(`Error saving interview: ${err.message}`);
  }
};

export const saveInterviewByJobDesc = async (data: NewInterviewByJobDesc) => {
  await dbConnect();

  const interview = new InterviewByJobDesc(data);

  try {
    // TODO not sure if this is the best place to update transactions
    await Transaction.updateMany(
      { user_id: data.user_id, mode_status: TRANSACTION_MODE_STATUSES.IN_PROGRESS },
      { mode_status: TRANSACTION_MODE_STATUSES.FINISHED }
    );

    return await interview.save();
  } catch (err: any) {
    throw new Error(`Error saving interview by job desc: ${err.message}`);
  }
};

export const getInterviewByHash = async (hash: string): Promise<any | null> => {
  await dbConnect();

  try {
    return await Interview.findOne({ public_hash: hash }).exec();
  } catch (err: any) {
    throw new Error(`Error getting interview by Hash: ${err.message}`);
  }
};

export const getInterviewByJobDescByHash = async (hash: string): Promise<any | null> => {
  await dbConnect();

  try {
    return await InterviewByJobDesc.findOne({ public_hash: hash }).exec();
  } catch (err: any) {
    throw new Error(`Error getting interview by job desc by Hash: ${err.message}`);
  }
};
