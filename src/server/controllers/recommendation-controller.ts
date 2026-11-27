import Interview from '@server/DBs/models/interview';
import InterviewByJobDesc from '@server/DBs/models/interviewByJobDesc';
import { aiGenerateRecommendation } from '@server/ai_methods/aiGenerateRecommendation';
import { getInterviewById, getInterviewByJobDescById } from '@server/controllers/interview-controller';
import { InterviewQuestion, Recommendation } from '@types';
import dbConnect from '@utils/dbConnect';

export const saveRecommendation = async (
  interviewId: string,
  recommendation: string,
  user_id: string
): Promise<any> => {
  try {
    await dbConnect();

    const filter = { _id: interviewId, user_id };
    const update = { $set: { recommendation } };
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
    throw new Error(`Error saving recommendation: ${err.message}`);
  }
};

export async function getRecommendation(
  interviewId: string,
  user_id: string
): Promise<Recommendation | string | null | Error> {
  try {
    let interview: any = await getInterviewByJobDescById(interviewId, user_id).catch(() => null);
    let topic = interview?.jobTitle;

    if (!interview) {
      interview = await getInterviewById(interviewId, user_id);
      topic = interview?.topic_slug;
    }

    if (!interview) {
      throw new Error(`Interview ${interviewId} is not found.`);
    }

    const questionListWithWrongAnswer = interview.questions
      .filter((question: InterviewQuestion) => question.answerIndex !== question.answerUserIndex)
      .map((question: InterviewQuestion, index: number) => `${++index}. ${question.expression}`);

    if (interview && topic && questionListWithWrongAnswer.length) {
      const questionsStringList = questionListWithWrongAnswer.join(' ');

      const generatedRecommendation = await aiGenerateRecommendation(topic, questionsStringList);

      // TODO: for the test
      // const generatedRecommendation = '<h2>Generated recommendation</h2>';

      const updatedInterview = await saveRecommendation(interviewId, generatedRecommendation, user_id);

      return updatedInterview.recommendation as string;
    } else {
      return 'There are no recommendations. You are the best!';
    }
  } catch (err: any) {
    throw new Error(`Error getRecommendation: ${err.message}`);
  }
}
