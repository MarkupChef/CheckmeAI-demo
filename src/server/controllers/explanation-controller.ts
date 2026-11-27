import Interview from '@server/DBs/models/interview';
import InterviewByJobDesc from '@server/DBs/models/interviewByJobDesc';
import dbConnect from '@utils/dbConnect';

export const saveExplanation = async (
  interviewId: string,
  indexQuestion: string,
  explanation: string,
  user_id: string
): Promise<any | never> => {
  try {
    await dbConnect();

    const filter = { _id: interviewId, user_id };
    const update = { $set: { [`questions.${indexQuestion}.explanation`]: explanation } };
    const options = { new: true, runValidators: true };

    let updatedInterview = await InterviewByJobDesc.findOneAndUpdate(filter, update, options);

    if (!updatedInterview) {
      updatedInterview = await Interview.findOneAndUpdate(filter, update, options);
    }

    if (!updatedInterview) {
      throw new Error('Interview not found during update');
    }

    return updatedInterview;
  } catch (err: any) {
    throw new Error(`Error saving explanation: ${err.message}`);
  }
};
