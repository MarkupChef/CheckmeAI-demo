import { InterviewQuestion } from '@types';

export function getPercentCorrectAnswers(questions: InterviewQuestion[]): number {
  const correctAnswers = questions.filter(
    (q) => q.answerUserIndex !== -1 && q.answerUserIndex === q.answerIndex
  ).length;

  return Math.round((correctAnswers / questions.length) * 100);
}
