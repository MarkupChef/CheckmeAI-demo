'use client';

import Chat from '@components/Chat';
import Counter from '@components/Counter';
import LoadingIcon from '@components/Icons/LoadingIcon';
import InterviewHeader from '@components/InterviewHeader';
import InterviewTimer from '@components/InterviewTimer';
import Question from '@components/Question';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import useDisableContextMenu from '@hooks/useDisableContextMenu';
import { useLazyGetAnswersQuery, useLazyGetQuestionsQuery, useSaveInterviewMutation } from '@store/api/interviewApi';
import { clearQuestionsSlice, nextQuestion, prevQuestion, resetTimer, setAnswerTime } from '@store/questionsSlice';
import { Mode } from '@types';
import { TRANSACTION_MODE_STATUSES } from '@utils/constants/constants';
import { ROUTES } from '@utils/constants/routes';
import { Button, Card } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './questionPage.module.scss';

const loadingStatuses = ['Preparing questions', 'Almost done'];
const timeout = 15000;

const QuestionPage: FC<{ startedMode: Mode; interviewStatus: string }> = ({ startedMode, interviewStatus }) => {
  const { t } = useTranslation();

  const router = useRouter();
  const modeId = startedMode._id;

  const interview = useAppSelector((state) => state.interview);
  const { index, questions = [], lastIndexWithAnswer, finished, topic } = useAppSelector((state) => state.questions);
  const { isInterviewMode } = interview;
  const currentTopic = topic || {
    slug: interview.topicSlug,
    name: interview.topicName,
    icon: interview.topicIcon,
    level: interview.level,
  };
  const { slug: topicSlug, name: topicName, icon: topicIcon, level } = currentTopic;

  const isTimer = isInterviewMode;
  const isStepBack = !isInterviewMode;

  const isGetQuestions = interviewStatus === TRANSACTION_MODE_STATUSES.STARTED && !questions.length;
  const isErrorContinueInterview = interviewStatus === TRANSACTION_MODE_STATUSES.IN_PROGRESS && !questions.length;

  const [
    saveInterview,
    {
      data: interviewID,
      isSuccess: isSuccessSaveInterview,
      isLoading: isLoadingSaveInterview,
      isError: isErrorSavingInterview,
      error: savingError,
    },
  ] = useSaveInterviewMutation();

  useDisableContextMenu(isInterviewMode);

  const [isLoading, setIsLoading] = useState(false);

  // questions are saved in useGetQuestionsQuery
  const [getQuestions, { isFetching, isError, error }] = useLazyGetQuestionsQuery();
  const [getOneMoreAnswers, { isFetching: isFetchingMoreAnswers }] = useLazyGetAnswersQuery();

  const dispatch = useAppDispatch();
  const next = () => dispatch(nextQuestion());
  const prev = () => dispatch(prevQuestion());

  const question = questions.length && questions[index];

  const [loadingText, setLoadingText] = useState(loadingStatuses[0]);

  const handleNext = async () => {
    await dispatch(setAnswerTime());
    await next();

    if (isTimer) {
      await dispatch(resetTimer());
    }

    if (lastIndexWithAnswer < questions.length - 1 && topicSlug) {
      const nextIndexQuestion = lastIndexWithAnswer + 1;
      const expression = questions[nextIndexQuestion].expression;
      await getOneMoreAnswers({ topic: topicSlug, question: expression });
    }
  };

  // start point
  useEffect(() => {
    if (isGetQuestions) {
      getQuestions({
        topic: topicSlug || '',
        level: level || '',
        mode_id: modeId,
      });
    }
  }, [modeId]);

  useEffect(() => {
    setIsLoading(false);

    if (isError && error) {
      console.error(error);
    }

    if (isErrorSavingInterview && savingError) {
      console.error(savingError);
    }
  }, [isError, error, isErrorSavingInterview, savingError]);

  useEffect(() => {
    const st = setTimeout(() => setLoadingText(loadingStatuses[1]), timeout);

    return () => {
      clearTimeout(st);
    };
  }, []);

  useEffect(() => {
    if (finished && level && topicSlug) {
      setIsLoading(true);
      saveInterview({ topic_slug: topicSlug, level, questions, mode: modeId });
    }
  }, [finished]);

  useLayoutEffect(() => {
    if (isSuccessSaveInterview && interviewID) {
      dispatch(clearQuestionsSlice());
      router.push(`${ROUTES.interviews}/${interviewID}`);
    }
  }, [isLoadingSaveInterview]);

  if (isErrorContinueInterview) {
    return (
      <div className={styles.root}>
        <Card className={'mx-auto max-w-2xl'}>
          <Chat>
            <p className={'text-red'}>{t('error_continue_interview')}</p>
            <p>{t('error_continue_interview_desc')}</p>
          </Chat>
        </Card>
      </div>
    );
  }

  const counter = <Counter leftNum={index + 1} rightNum={questions.length} />;

  return (
    <div className={styles.root}>
      {isError || isErrorSavingInterview ? (
        <h2 className={'mb-2'}>{t('Error_loading_questions')}</h2>
      ) : isFetching || isLoading ? (
        <div>
          <LoadingIcon />
          {isFetching && loadingText}
        </div>
      ) : (
        question && (
          <>
            <header className="mb-5">
              <InterviewHeader
                topicName={topicName || ''}
                topicIcon={topicIcon || ''}
                level={level || ''}
                counter={counter}
              />
            </header>
            <form>
              <Question title={question.expression} question={question} isTextSelect={!isInterviewMode} />

              <div className={'mt-8 flex justify-center gap-4'}>
                {isStepBack && index > 0 && (
                  <Button size={'md'} className={'btn-md'} onClick={prev}>
                    {t('Prev')}
                  </Button>
                )}

                {!isFetchingMoreAnswers ? (
                  <Button type={'button'} size={'md'} color={'primary'} className={'btn-md'} onClick={handleNext}>
                    {t('Next')}
                  </Button>
                ) : (
                  <Button color={'primary'} size={'md'} className={'btn-md'} disabled>
                    {t('Next')}
                  </Button>
                )}
              </div>
            </form>

            {isTimer && <InterviewTimer afterEndCallback={handleNext} className={'mt-4'} />}
          </>
        )
      )}
    </div>
  );
};

export default QuestionPage;
