'use client';

import BackLink from '@components/BackLink';
import Chat from '@components/Chat';
import LoadingIcon from '@components/Icons/LoadingIcon';
import PenIcon from '@components/Icons/PenIcon';
import LevelIcon from '@components/LevelIcon/LevelIcon';
import TopicLogoPlaceholder from '@components/TopicCard/TopicLogoPlaceholder';
import InterviewModeToggle from '@components/pages/InterviewPreparationPage/InterviewModeToggle';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { useLazyStartInterviewQuery } from '@store/api/interviewApi';
import { setInterviewModeFlag, setModeId } from '@store/interviewSlice';
import { resetTimer, start } from '@store/questionsSlice';
import { Mode } from '@types';
import { INTERVIEW_TYPE_TOPIC, PROJECT_NAME } from '@utils/constants/constants';
import { ROUTES } from '@utils/constants/routes';
import { App, Form } from 'antd';
import { Button, Card } from 'flowbite-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './interviewPreparationPage.module.scss';

const InterviewPreparationPage: FC<{ modes: Mode[] }> = ({ modes }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const { modal } = App.useApp();

  const [startInterview, { isFetching, isLoading, isSuccess, isError, error }] = useLazyStartInterviewQuery();
  const router = useRouter();
  const { topicSlug, topicName, topicIcon, level, modeId } = useAppSelector((state) => state.interview);
  const { started } = useAppSelector((state) => state.questions);

  const { data } = useSession();
  const mode = modeId ? modes.find((mode) => mode._id === modeId) : null;

  const numberQuestions = mode?.number_questions;
  const isCertificate = mode?.is_certificate;
  const isRecommendation = mode?.is_recommendation;

  const backLink = `${ROUTES.topics}/${topicSlug}/${level}`;
  const topicsLink = `${ROUTES.topics}/?edit`;
  const levelLink = `${ROUTES.topics}/${topicSlug}/?edit`;

  useEffect(() => {
    if (!topicSlug || !level || !modeId) {
      router.push(ROUTES.topics);
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      startInterviewHandler();
    }

    if (isError) {
      console.error('Error of starting the interview');
    }
  }, [isFetching, isSuccess, isError]);

  async function startInterviewHandler() {
    try {
      const topic = { slug: topicSlug || '', name: topicName || '', icon: topicIcon || '', level: level || '' };
      await dispatch(start({ modeId: modeId || '', topic }));
      await router.push(`${ROUTES.interview}/${modeId}?type=${INTERVIEW_TYPE_TOPIC}`);
    } catch (err: any) {
      console.error('Error during starting the interview:', err);
    }
  }

  const onStartInterview = (values: any) => {
    if (started) {
      modal.confirm({
        title: t('Preparation.restart_confirm_title'),
        content: t('Preparation.restart_confirm_text'),
        okText: t('Start'),
        cancelText: t('Cancel'),
        centered: true,
        onOk: () => startNewInterview(values),
      });

      return;
    }

    startNewInterview(values);
  };

  const startNewInterview = async (values: any) => {
    if (!modeId) {
      return;
    }

    dispatch(setInterviewModeFlag({ interviewModeFlag: values['isInterviewModeFlag'] }));
    dispatch(resetTimer());

    await startInterview(modeId);
  };

  const resetModeId = async () => {
    await dispatch(setModeId({ modeId: null }));
  };

  const renderChangeIcon = () => (
    <PenIcon
      className={
        'absolute right-4 top-3 flex items-center gap-1 text-xl font-semibold text-seagreen-700 hover:underline sm:right-5'
      }
    />
  );

  const renderContent = () => (
    <div className={'mx-auto max-w-4xl'}>
      <h1 className={'mb-[0.8em] mt-0 text-center text-4xl font-bold dark:text-white md:text-5xl'}>
        {t('Welcome_to')} <span className="capitalize">{topicName}</span> {t('Interview')}
      </h1>

      <div className={'flex flex-wrap gap-5'}>
        <div className={'flex-auto'}>
          <Link href={topicsLink} className={'text-default hover:text-seagreen-700'}>
            <Card className={'relative h-[120px]'}>
              <div className={'flex flex-col items-center gap-1 sm:flex-row sm:gap-4'}>
                <div className={'h-[48px] w-[48px] sm:h-[64px] sm:w-[64px]'}>
                  {topicIcon ? (
                    <Image src={topicIcon} width={64} height={64} alt="" priority={true} />
                  ) : (
                    <TopicLogoPlaceholder name={topicName as string} />
                  )}
                </div>
                <h5 className="flex-shrink-0 grow text-xl font-semibold capitalize tracking-tight sm:text-3xl">
                  {topicName}
                </h5>
              </div>
              {renderChangeIcon()}
            </Card>
          </Link>
        </div>

        <div className={'h-full flex-auto'}>
          <Link href={levelLink} className={'text-default hover:text-seagreen-700'}>
            <Card className={'relative h-[120px]'}>
              <div className={'flex flex-col items-center gap-1 sm:flex-row sm:gap-4'}>
                <div className={'h-[48px] w-[48px] flex-shrink-0 sm:h-[64px] sm:w-[64px]'}>
                  {level && <LevelIcon level={level} />}
                </div>
                <h5 className="flex-shrink-0 grow text-xl font-semibold capitalize tracking-tight sm:text-3xl">
                  {level}
                </h5>
              </div>
              {renderChangeIcon()}
            </Card>
          </Link>
        </div>

        <BackLink
          href={backLink}
          beforeClick={resetModeId}
          isArrow={false}
          className={'flex-auto text-default hover:text-seagreen-700'}
        >
          <Card className={'relative h-[120px] w-full'}>
            <header className={'border-b-solid mt-4 border-b border-b-gray-300 pb-2 text-2xl font-bold'}>
              Mode: <span className={'text-seagreen-500'}>{mode && t(mode.title)}</span>
            </header>
            <p className={'-mt-2 text-xl font-semibold'}>
              {mode && mode.number_questions} {t('questions')}
            </p>

            {renderChangeIcon()}
          </Card>
        </BackLink>
      </div>

      <Card className={'mb-5 mt-5 w-full'}>
        <Chat>
          <div className={'md:text-lg'}>
            <p className="mb-2">{t('Preparation.you_should_know')}:</p>
            <ul className="mb-2 list-disc space-y-1 pl-[1em] text-left">
              <li>{t('Preparation.info_item.count_questions', { value: numberQuestions })}</li>
              <li>{t('Preparation.info_item.questions_not_prepared')}</li>
              <li>{t('Preparation.info_item.is_passed_interview')}</li>
              {isCertificate && <li>{t('Preparation.info_item.certificate')}</li>}
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

          {data && (
            <Button
              size="md"
              className={'btn-md w-full max-w-[150px]'}
              color={'primary'}
              disabled={isLoading}
              type={'submit'}
            >
              {t('Start')}
            </Button>
          )}
        </Form>
      </Card>

      {error && 'data' in error && <p className={styles.errorMessage}>{(error.data as any)?.message}</p>}
    </div>
  );

  return <>{topicSlug && level && mode && topicName ? renderContent() : <LoadingIcon />}</>;
};

export default InterviewPreparationPage;
