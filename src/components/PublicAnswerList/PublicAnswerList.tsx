import { InterviewQuestion } from '@types';
import { FC } from 'react';

interface AnswerListProps {
  question: InterviewQuestion;
}

const PublicAnswerList: FC<AnswerListProps> = ({ question }) => {
  return (
    <ul>
      {question.options.map((opt, i) => (
        <li
          key={`answer-id-${i}`}
          className={'mb-4 ml-[1.5em] list-decimal text-sm font-medium last:mb-0 lg:text-base 2xl:text-lg'}
        >
          {i === question.answerIndex ? (
            <div className={'flex flex-wrap items-center gap-4'}>
              <div className={'flex-[1_1_85%] text-lime md:max-w-[85%]'}>{`${opt}`}</div>
            </div>
          ) : i === question.answerUserIndex && question.answerUserIndex !== question.answerIndex ? (
            <div className={'text-red md:max-w-[85%]'}>{`${opt}`}</div>
          ) : (
            <div className={'md:max-w-[85%]'}>{`${opt}`}</div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default PublicAnswerList;
