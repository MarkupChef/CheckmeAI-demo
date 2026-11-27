import { Question } from '@store/api/models/Questions.type';
import decryptNumber from '@utils/helpers/decryptNumber';
import getSecretKeyByDate from '@utils/helpers/getSecretKeyByDate';

export function getPercentCorrectAnswersWithDecrypt(questions: Question[]): number {
  const correctAnswers = questions.reduce((acc, question) => {
    if (!question.answerIndex) {
      return acc;
    }

    const secret = getSecretKeyByDate(question.date);
    const decryptedAnswerIndex = decryptNumber(question.answerIndex, secret);

    if (question.answerUserIndex === decryptedAnswerIndex) {
      acc++;
    }

    return acc;
  }, 0);

  return Math.round((correctAnswers / questions.length) * 100);
}
