'use client';

import { ArrowRightOutlined } from '@ant-design/icons';
import Chat from '@components/Chat';
import Counter from '@components/Counter';
import LockIcon from '@components/Icons/LockIcon';
import InterviewHeader from '@components/InterviewHeader';
import H1 from '@components/UI/H1';
import AccordionItem from '@components/pages/ResultPage/AccordionItem';
import Recommendation from '@components/pages/ResultPage/Recommendation';
import { accordionQuestionTheme } from '@components/pages/ResultPage/theme.fb';
import { setLevel, setModeId, setTopicIcon, setTopicName, setTopicSlug } from '@store/interviewSlice';
import { InterviewMode, InterviewQuestion } from '@types';
import { ROUTES } from '@utils/constants/routes';
import { getPercentCorrectAnswers } from '@utils/getPercentCorrectAnswers';
import { Typography } from 'antd';
import { Button, Card, Flowbite, Tooltip } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import styles from './resultPage.module.scss';

interface InterviewPageProps {
  interviewId: string;
  isPassed: boolean;
  topicName: string;
  topicImage?: string;
  topicSlug: string;
  level: string;
  questions: InterviewQuestion[];
  mode: InterviewMode;
  recommendation?: string;
}

const ResultPage: FC<InterviewPageProps> = ({
  interviewId,
  isPassed,
  topicName,
  topicImage,
  topicSlug,
  level,
  questions,
  mode,
  recommendation,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [isShowRecommendation, setIsShowRecommendation] = useState(false);
  const recommendationRef = useRef<HTMLDivElement>(null);

  const leftNum = questions.filter((question) => question.answerIndex === question.answerUserIndex).length;
  const rightNum = questions.length;

  const certificateLink = `${interviewId}${ROUTES.certificate}`;
  const restartLink = `${ROUTES.topics}/${topicSlug}/${level}`;

  const { is_certificate, is_recommendation } = mode;

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

  const onNextInterview = () => {
    if (level === 'senior') {
      router.push(ROUTES.topics);

      return;
    }

    const nextLevel = level === 'junior' ? 'middle' : 'senior';
    dispatch(setLevel({ level: nextLevel }));
    dispatch(setTopicSlug({ slug: topicSlug }));
    dispatch(setTopicName({ name: topicName }));
    dispatch(setModeId({ modeId: mode._id }));

    if (topicImage) {
      dispatch(setTopicIcon({ icon: topicImage }));
    }

    router.push(ROUTES.interview_preparation);
  };

  const renderLinkCertificate = () => {
    return (
      <Link href={certificateLink}>
        <Button size={'sm'} className={'btn btn-shadow'}>
          {t('download_certificate')}
        </Button>
      </Link>
    );
  };

  const renderLockLinkCertificate = () => (
    <Tooltip content={t('available_in_interview_mode')}>
      <Button size={'sm'} className={'btn btn-shadow opacity-70'}>
        <LockIcon className={styles.lockIcon} /> {t('download_certificate')}
      </Button>
    </Tooltip>
  );

  const renderNextInterviewBtn = () => {
    const nextLevel = level === 'junior' ? 'middle' : level === 'middle' ? 'senior' : null;
    const nextInterviewText = nextLevel ? `Start for ${t(nextLevel)}` : t('start_a_new_topic');

    return (
      <Button size={'sm'} className={'btn'} color={'primary'} onClick={onNextInterview}>
        {nextInterviewText}
        <ArrowRightOutlined className={styles.nextActionBtnIcon} />
      </Button>
    );
  };

  const ActionPanel = (
    <Card className={styles.actionPanel}>
      <div className={styles.footer}>
        <Link href={restartLink}>
          <Button size={'sm'} className={'btn'}>
            {t('Restart')}
          </Button>
        </Link>

        <div className={styles.footerAiAction}>
          {isRecommendation && (
            <Button size={'sm'} className={'btn btn-shadow'} onClick={onShowRecommendation}>
              {t('get_ai_recommendation')}
            </Button>
          )}

          {isPassed && is_certificate ? renderLinkCertificate() : isPassed && renderLockLinkCertificate()}
        </div>

        {renderNextInterviewBtn()}
      </div>
    </Card>
  );

  const renderFailedMessage = () => (
    <Card className={styles.failedMessage}>
      <Chat>
        <Typography.Title level={3} className={'mb-2'}>
          Unfortunately the{' '}
          <span className={'text-seagreen-600'}>
            {t(level)} {topicName} interview
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
          topicName={topicName}
          topicIcon={topicImage || ''}
          level={level}
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
              topicName={topicName}
              level={level}
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
export default ResultPage;
