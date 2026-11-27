'use client';

import BackLink from '@components/BackLink';
import Chat from '@components/Chat';
import LoadingIcon from '@components/Icons/LoadingIcon';
import PenIcon from '@components/Icons/PenIcon';
import InterviewModeToggle from '@components/pages/InterviewPreparationPage/InterviewModeToggle';
import { Mode } from '@types';
import { PROJECT_NAME } from '@utils/constants/constants';
import { Form, Typography } from 'antd';
import { Button, Card } from 'flowbite-react';
import Link from 'next/link';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './JobVacancyReviewPage.module.scss';
import useJobVacancyReviewPage from './useJobVacancyReviewPage';

const JobVacancyReviewPage: FC<{ modes: Mode[] }> = ({ modes }) => {
  const { t } = useTranslation();
  const {
    form,
    sessionData,
    isLoading,
    errorMessage,
    onStartInterview,
    resetModeId,
    jobVacancyEditLink,
    numberQuestions,
    isRecommendation,
    mode,
    jobTitle,
    companyName,
    jobDesc,
  } = useJobVacancyReviewPage(modes);

  const renderChangeIcon = () => (
    <PenIcon
      className={
        'absolute right-4 top-3 flex items-center gap-1 text-xl font-semibold text-seagreen-700 hover:underline sm:right-5'
      }
    />
  );

  const renderContent = () => (
    <div className={'mx-auto w-full max-w-5xl'}>
      <h1 className={'mb-[0.8em] mt-0 text-center text-4xl font-bold dark:text-white md:text-5xl'}>
        Job Vacancy Review
      </h1>

      <div className={'flex flex-wrap gap-5'}>
        <div className={'flex-auto'}>
          <Link href={jobVacancyEditLink} className={'text-default hover:text-seagreen-700'}>
            <Card className={'relative h-[120px]'}>
              <div className={'flex flex-col gap-1 sm:gap-4'}>
                <Typography.Text>Position</Typography.Text>
                <h5 className="flex-shrink-0 grow text-xl font-semibold capitalize tracking-tight sm:text-2xl">
                  {jobTitle}
                </h5>
              </div>
              {renderChangeIcon()}
            </Card>
          </Link>
        </div>

        <div className={'h-full flex-auto'}>
          <Link href={jobVacancyEditLink} className={'text-default hover:text-seagreen-700'}>
            <Card className={'relative h-[120px]'}>
              <div className={'flex flex-col gap-1 sm:gap-4'}>
                <Typography.Text>Company</Typography.Text>
                <h5 className="flex-shrink-0 grow text-xl font-semibold tracking-tight sm:text-3xl">{companyName}</h5>
              </div>
              {renderChangeIcon()}
            </Card>
          </Link>
        </div>

        <BackLink
          href={jobVacancyEditLink}
          beforeClick={resetModeId}
          isArrow={false}
          className={'flex-auto text-default hover:text-seagreen-700'}
        >
          <Card className={'relative h-[120px] w-full'}>
            <header className={'border-b-solid mt-4 border-b border-b-gray-300 pb-2 text-2xl font-bold'}>
              Mode: <span className={'text-seagreen-500'}>{mode && t(mode.title)}</span>
            </header>
            {numberQuestions ? (
              <p className={'-mt-2 text-xl font-semibold'}>
                {numberQuestions} {t('questions')}
              </p>
            ) : null}

            {renderChangeIcon()}
          </Card>
        </BackLink>
      </div>
      <BackLink
        href={jobVacancyEditLink}
        beforeClick={resetModeId}
        isArrow={false}
        className={'flex-auto text-default hover:text-seagreen-700'}
      >
        <Card className={'relative mb-5 mt-5 w-full'}>
          <Typography.Text>Requirements</Typography.Text>
          <div className={'whitespace-pre-wrap font-normal'}>{jobDesc}</div>
          {renderChangeIcon()}
        </Card>
      </BackLink>
      <Card className={'mb-5 mt-5 w-full'}>
        <Chat>
          <div className={'md:text-lg'}>
            <p className="mb-2">{t('Preparation.you_should_know')}:</p>
            <ul className="mb-2 list-disc space-y-1 pl-[1em] text-left">
              <li>{t('Preparation.info_item.count_questions', { value: numberQuestions })}</li>
              <li>{t('Preparation.info_item.questions_not_prepared')}</li>
              <li>{t('Preparation.info_item.is_passed_interview')}</li>
              {isRecommendation && <li>{t('Preparation.info_item.recommendations', { projectName: PROJECT_NAME })}</li>}
              <li>{t('Preparation.info_item.continue')}</li>

              {/* TODO: maybe to display this after the Strict interview mode activate */}
              {/* {isTimer && <li>{t('Preparation.info_item.timer', { value: INTERVIEW_TIMER_DURATION / 60 })}</li>} */}
              {/* {!isStepBack && <li>{t('Preparation.info_item.previous_question')}</li>} */}
            </ul>
            <p>{t('good_luck')}</p>
          </div>
        </Chat>
      </Card>

      <Card>
        <Form form={form} onFinish={onStartInterview} className={styles.form}>
          <Form.Item className={'mb-0'} name={'isInterviewModeFlag'} label={null} initialValue={false}>
            <InterviewModeToggle />
          </Form.Item>

          {sessionData && (
            <Button
              size="md"
              className={'btn-md w-full max-w-[150px]'}
              color={'primary'}
              disabled={isLoading}
              type={'submit'}
            >
              {isLoading ? 'Wait' : t('Start')}
            </Button>
          )}
        </Form>
      </Card>

      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );

  return <>{jobTitle && companyName && jobDesc && mode ? renderContent() : <LoadingIcon />}</>;
};

export default JobVacancyReviewPage;
