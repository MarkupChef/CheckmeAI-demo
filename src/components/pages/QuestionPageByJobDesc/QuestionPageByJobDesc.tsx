'use client';

import BackLink from '@components/BackLink';
import Chat from '@components/Chat';
import Counter from '@components/Counter';
import LoadingIcon from '@components/Icons/LoadingIcon';
import InterviewHeader from '@components/InterviewHeader';
import InterviewTimer from '@components/InterviewTimer';
import Question from '@components/Question';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import useDisableContextMenu from '@hooks/useDisableContextMenu';
import {
  useLazyGetAnswerOptionsQuery,
  useLazyGetQuestionsByJobDescriptionQuery,
  useSaveInterviewByJobDescMutation,
} from '@store/api/interviewApi';
import { clearInterviewSlice } from '@store/interviewSlice';
import { clearQuestionsSlice, nextQuestion, prevQuestion, resetTimer, setAnswerTime } from '@store/questionsSlice';
import { Mode } from '@types';
import { TRANSACTION_MODE_STATUSES } from '@utils/constants/constants';
import { ROUTES } from '@utils/constants/routes';
import getErrorMessage from '@utils/helpers/getErrorMessage';
import { Button, Card } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './questionPageByJobDesc.module.scss';

const loadingStatuses = ['Preparing questions', 'Almost done'];
const timeout = 15000;

const QuestionPageByJobDesc: FC<{ startedMode: Mode; interviewStatus: string }> = ({
  startedMode,
  interviewStatus,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const modeId = startedMode._id;

  const { isInterviewMode, jobTitle, companyName, jobDesc } = useAppSelector((state) => state.interview);
  const { index, questions = [], lastIndexWithAnswer, finished } = useAppSelector((state) => state.questions);

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
  ] = useSaveInterviewByJobDescMutation();

  useDisableContextMenu(isInterviewMode);

  const [isLoading, setIsLoading] = useState(false);

  // questions are saved in useGetQuestionsQuery
  const [getQuestionsByJobDesc, { isFetching, isError, error }] = useLazyGetQuestionsByJobDescriptionQuery();

  const [getOneMoreAnswers, { isFetching: isFetchingMoreAnswers }] = useLazyGetAnswerOptionsQuery();

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

    if (lastIndexWithAnswer < questions.length - 1) {
      const nextIndexQuestion = lastIndexWithAnswer + 1;
      const expression = questions[nextIndexQuestion].expression;
      await getOneMoreAnswers({ question: expression });
    }
  };

  const handleFinish = async (id: string) => {
    dispatch(clearInterviewSlice());
    dispatch(clearQuestionsSlice());
    await router.push(`${ROUTES.interviews}/${id}`);
  };

  // start point
  useEffect(() => {
    if (isGetQuestions) {
      getQuestionsByJobDesc({
        jobTitle: jobTitle || '',
        jobDesc: jobDesc || '',
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
    if (finished && jobTitle && companyName && jobDesc) {
      setIsLoading(true);
      saveInterview({ jobTitle, companyName, jobDesc, questions, mode: modeId });
    }
  }, [finished]);

  // Interview is finished and saved
  useEffect(() => {
    (async () => {
      if (isSuccessSaveInterview && interviewID) {
        await handleFinish(interviewID);
      }
    })();
  }, [isLoadingSaveInterview, interviewID]);

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
  const errorMessage = getErrorMessage(error);

  return (
    <div className={styles.root}>
      {(isError && errorMessage) || isErrorSavingInterview ? (
        <Card className={'mx-auto max-w-2xl'}>
          <div className={'text-center'}>
            <h2 className={'mb-2'}>{t('Error_loading_questions')}</h2>
            <p className={'text-red'}>{errorMessage}</p>
            <BackLink href={ROUTES.job_vacancy}>Back</BackLink>
          </div>
        </Card>
      ) : isFetching || isLoading ? (
        <div>
          <LoadingIcon />
          {isFetching && loadingText}
        </div>
      ) : (
        question && (
          <>
            <header className="mb-5">
              <InterviewHeader topicName={jobTitle || ''} topicIcon={''} level={''} counter={counter} />
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

export default QuestionPageByJobDesc;
