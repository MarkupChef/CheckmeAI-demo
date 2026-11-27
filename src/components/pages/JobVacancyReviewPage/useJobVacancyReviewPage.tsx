import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { useLazyCheckIsJobDescValidQuery, useLazyStartInterviewQuery } from '@store/api/interviewApi';
import { setInterviewModeFlag } from '@store/interviewSlice';
import { resetTimer, start } from '@store/questionsSlice';
import { Mode } from '@types';
import { ROUTES } from '@utils/constants/routes';
import getErrorMessage from '@utils/helpers/getErrorMessage';
import { App, Form } from 'antd';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const useJobVacancyReviewPage = (modes: Mode[]) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: sessionData } = useSession();
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { modal } = App.useApp();

  const [startInterview, { isFetching, isLoading, isSuccess, isError, error }] = useLazyStartInterviewQuery();
  const [
    checkJobVacancyData,
    {
      isFetching: isFetchingCheckJobDesc,
      isLoading: isLoadingCheckJobDesc,
      isSuccess: isSuccessCheckJobDesc,
      isError: isErrorCheckJobDesc,
      error: errorCheckJobDesc,
    },
  ] = useLazyCheckIsJobDescValidQuery();

  const { jobTitle, companyName, jobDesc, modeId } = useAppSelector((state) => state.interview);
  const { started } = useAppSelector((state) => state.questions);

  const mode = modeId ? modes.find((mode) => mode._id === modeId) : null;

  const numberQuestions = mode?.number_questions;
  const isRecommendation = mode?.is_recommendation;

  const jobVacancyEditLink = `${ROUTES.job_vacancy}/?edit`;

  async function startInterviewHandler() {
    try {
      await dispatch(start({ modeId: modeId || '' }));
      await router.push(`${ROUTES.interview}/${modeId}`);
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
    if (!modeId || !jobTitle || !companyName || !jobDesc) {
      return;
    }

    dispatch(setInterviewModeFlag({ interviewModeFlag: values['isInterviewModeFlag'] }));
    dispatch(resetTimer());

    await checkJobVacancyData({
      jobTitle,
      companyName,
      jobDesc,
      modeId,
    });
  };

  useEffect(() => {
    if (!jobTitle || !companyName || !jobDesc || !modeId) {
      router.push(ROUTES.job_vacancy);
    }
  }, []);

  useEffect(() => {
    if (isErrorCheckJobDesc) {
      return;
    }

    if (modeId && isSuccessCheckJobDesc) {
      startInterview(modeId);
    }
  }, [isFetchingCheckJobDesc, isSuccessCheckJobDesc, isErrorCheckJobDesc]);

  useEffect(() => {
    if (isSuccess) {
      startInterviewHandler();
    }

    if (isError) {
      console.error('Error of starting the interview');
    }
  }, [isFetching, isSuccess, isError]);

  const errorMessage = getErrorMessage(error) || getErrorMessage(errorCheckJobDesc);

  return {
    form,
    sessionData,
    isLoading: isLoading || isLoadingCheckJobDesc,
    errorMessage,
    onStartInterview,
    resetModeId: () => {},
    jobVacancyEditLink,
    numberQuestions,
    isRecommendation,
    mode,
    jobTitle,
    companyName,
    jobDesc,
  };
};

export default useJobVacancyReviewPage;
