import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import useIsRehydrated from '@hooks/useIsRehydrated';
import { useGetModesQuery } from '@store/api/modesApi';
import { setJobParam } from '@store/interviewSlice';
import { MAX_JOB_REQUIREMENTS_CHAR } from '@utils/constants/constants';
import { ROUTES } from '@utils/constants/routes';
import getErrorMessage from '@utils/helpers/getErrorMessage';
import { Form, type FormProps } from 'antd';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';

export interface JobDescriptionFormType {
  jobTitle: string;
  jobDesc: string;
  companyName: string;
  modeId: string;
}

const useJobVacancyPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [textJobReq, setTextJobReq] = useState('');
  const jobReqCounter = `${textJobReq.length}/${MAX_JOB_REQUIREMENTS_CHAR}`;

  const { jobTitle, companyName, jobDesc, modeId } = useAppSelector((state) => state.interview);

  const isRehydrated = useIsRehydrated();
  const isAuth = session && status === 'authenticated';

  // getting available (paid) mode for authed user
  const {
    data: modes,
    isLoading: isLoadingModes,
    isError: isErrorModes,
    error: errorModes,
  } = useGetModesQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: !isAuth,
  });

  const onCountCharacter = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextJobReq(e.currentTarget.value);
  };

  const onFinish: FormProps<JobDescriptionFormType>['onFinish'] = async (values) => {
    const { jobTitle, jobDesc, companyName, modeId } = values;

    dispatch(setJobParam({ jobTitle, companyName, jobDesc, modeId }));

    await router.push(ROUTES.job_vacancy_review);
  };

  const onFinishFailed: FormProps<JobDescriptionFormType>['onFinishFailed'] = (errorInfo) => {
    console.error('Failed:', errorInfo);
  };

  useEffect(() => {
    const isEdit = new URLSearchParams(window.location.search).has('edit');

    if (isEdit && isRehydrated) {
      form.setFieldsValue({
        jobTitle,
        jobDesc,
        companyName,
        modeId,
      });
    }
  }, [isRehydrated]);

  const errorModesMessage = getErrorMessage(errorModes);

  return {
    modes,
    isLoadingModes,
    isErrorModes,
    errorModesMessage,
    onFinish,
    onFinishFailed,
    form,
    onCountCharacter,
    jobReqCounter,
  };
};

export default useJobVacancyPage;
