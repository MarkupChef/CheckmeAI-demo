'use client';

import Chat from '@components/Chat';
import Counter from '@components/Counter';
import InterviewHeader from '@components/InterviewHeader';
import H1 from '@components/UI/H1';
import AccordionItem from '@components/pages/ResultPage/AccordionItem';
import Recommendation from '@components/pages/ResultPage/Recommendation';
import { accordionQuestionTheme } from '@components/pages/ResultPage/theme.fb';
import { InterviewMode, InterviewQuestion } from '@types';
import { getPercentCorrectAnswers } from '@utils/getPercentCorrectAnswers';
import { Typography } from 'antd';
import { Button, Card, Flowbite } from 'flowbite-react';
import { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './resultPage.module.scss';

interface InterviewPageProps {
  interviewId: string;
  jobTitle: string;
  companyName: string;
  jobDesc: string;
  isPassed: boolean;
  questions: InterviewQuestion[];
  mode: InterviewMode;
  recommendation?: string;
}

const ResultPageByJobDesc: FC<InterviewPageProps> = ({
  interviewId,
  jobTitle,
  companyName,
  isPassed,
  questions,
  mode,
  recommendation,
}) => {
  const { t } = useTranslation();
  const [isShowRecommendation, setIsShowRecommendation] = useState(false);
  const recommendationRef = useRef<HTMLDivElement>(null);

  const leftNum = questions.filter((question) => question.answerIndex === question.answerUserIndex).length;
  const rightNum = questions.length;

  const { is_recommendation } = mode;

  const isRecommendation = is_recommendation && getPercentCorrectAnswers(questions) < 100;

  const scrollToRecommendation = () => {
    recommendationRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  const onShowRecommendation = () => {
    setIsShowRecommendation(true);

    if (isShowRecommendation) {
      scrollToRecommendation();

      return;
    }

    const st = setTimeout(() => {
      scrollToRecommendation();
      clearTimeout(st);
    }, 100);
  };

  const ActionPanel = (
    <Card className={styles.actionPanel}>
      <div className={styles.footer}>
        {/* TODO: to do it later */}
        {/* <Link href={restartLink}>
          <Button size={'sm'} className={'btn'}>
            {t('Restart')}
          </Button>
        </Link> */}

        <div className={styles.footerAiAction}>
          {isRecommendation && (
            <Button size={'sm'} className={'btn btn-shadow'} onClick={onShowRecommendation}>
              {t('get_ai_recommendation')}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );

  const renderFailedMessage = () => (
    <Card className={styles.failedMessage}>
      <Chat>
        <Typography.Title level={3} className={'mb-2'}>
          Unfortunately the{' '}
          <span className={'text-seagreen-600'}>
            {jobTitle} interview for the {companyName}
          </span>{' '}
          was not passed :(
        </Typography.Title>

        <p className={'mb-2'}>
          But nobody is born an expert, and even the most experienced professionals continue to learn and improve in
          their field. Your desire for self-improvement and readiness to fill the gaps in your knowledge are important
          qualities of a professional.
        </p>
        <p>
          Don&apos;t perceive your incorrect answers as failures, but rather as opportunities for growth. The interview
          helped to identify areas where you can expand your knowledge and become better. I recommend that you work
          through each question that you did not answer correctly, study the relevant materials, and take the interview
          again to make sure that you have successfully increased your knowledge. Good luck!
        </p>
      </Chat>
    </Card>
  );

  return (
    <div className={styles.root}>
      <div className="mb-5">
        <InterviewHeader
          topicName={jobTitle}
          topicIcon={''}
          level={companyName}
          counter={<Counter leftNum={leftNum} rightNum={rightNum} />}
        />
      </div>

      <H1>{isPassed ? 'Interview passed successfully' : t('Result')}</H1>

      {!isPassed && renderFailedMessage()}

      {ActionPanel}

      <Flowbite theme={{ theme: accordionQuestionTheme }}>
        {questions.map((question, i) => {
          return (
            <AccordionItem
              key={i}
              i={i}
              question={question}
              interviewId={interviewId}
              topicName={''}
              level={''}
              mode={mode}
            />
          );
        })}
      </Flowbite>

      <div ref={recommendationRef}></div>

      {ActionPanel}

      {isShowRecommendation && isRecommendation && (
        <Recommendation interviewId={interviewId} recommendation={recommendation} callback={scrollToRecommendation} />
      )}
    </div>
  );
};
export default ResultPageByJobDesc;
