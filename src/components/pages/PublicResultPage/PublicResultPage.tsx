'use client';

import AboveTitle from '@components/AboveTitle';
import Counter from '@components/Counter';
import ErrorIcon from '@components/Icons/ErrorIcon';
import LikeIcon from '@components/Icons/LikeIcon';
import PublicAnswerList from '@components/PublicAnswerList';
import H1 from '@components/UI/H1';
import { accordionQuestionTheme } from '@components/pages/ResultPage/theme.fb';
import { InterviewQuestion } from '@types';
import { Accordion, Flowbite } from 'flowbite-react';
import Image from 'next/image';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface PublicResultPageProps {
  interviewId: string;
  topicName?: string;
  topicImage?: string;
  level?: string;
  jobTitle?: string;
  companyName?: string;
  questions: InterviewQuestion[];
  userName: string;
}

const PublicResultPage: FC<PublicResultPageProps> = ({
  topicName,
  topicImage,
  level,
  jobTitle,
  companyName,
  questions,
  userName,
}) => {
  const { t } = useTranslation();

  const leftNum = questions.filter((question) => question.answerIndex === question.answerUserIndex).length;
  const rightNum = questions.length;

  return (
    <div className={'mx-auto w-full max-w-6xl text-center'}>
      <div className="mb-5">
        <AboveTitle>
          <div className={'mb-4 text-3xl'}>{userName}</div>
          <div className={'flex items-center justify-center gap-2'}>
            {topicImage && <Image src={topicImage} width={20} height={20} className={'h-[20px] w-[20px]'} alt="" />}
            <span>{jobTitle ? `${jobTitle} | ${companyName}` : `${topicName} | ${level}`}</span>
          </div>
        </AboveTitle>
        <span>{t('Correct_answers')}: </span>
        <Counter leftNum={leftNum} rightNum={rightNum} />
      </div>

      <H1>{t('Result')}</H1>

      <Flowbite theme={{ theme: accordionQuestionTheme }}>
        <Accordion alwaysOpen={true}>
          {questions.map((question, i) => {
            return (
              <Accordion.Panel key={`q-${i}`} isOpen={true}>
                <Accordion.Title className={i > 0 ? 'mt-4' : ''}>
                  <div className={'flex items-center gap-4 sm:gap-6'}>
                    {question.answerIndex === question.answerUserIndex ? (
                      <LikeIcon className={'h-7 w-7 flex-shrink-0 md:h-10 md:w-10 2xl:h-14 2xl:w-14'} />
                    ) : (
                      <ErrorIcon className={'h-7 w-7 flex-shrink-0 md:h-10 md:w-10 2xl:h-14 2xl:w-14'} />
                    )}
                    <span>
                      {i + 1}. {question.expression}
                    </span>
                  </div>
                </Accordion.Title>
                <Accordion.Content>
                  <PublicAnswerList question={question} />
                </Accordion.Content>
              </Accordion.Panel>
            );
          })}
        </Accordion>
      </Flowbite>
    </div>
  );
};

export default PublicResultPage;
