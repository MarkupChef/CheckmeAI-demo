import Chat from '@components/Chat';
import { useLazyGetPracticalApplicationByJobDescQuery } from '@store/api/practicalApplicationApi';
import { useSession } from 'next-auth/react';
import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface PracticalApplicationProps {
  interviewId: string;
  indexQuestion: number;
  practicalApplication: string | null;
  setPracticalApplication: Dispatch<SetStateAction<string | null>>;
}
// TODO: optimize this component with Explanation component
const PracticalApplicationByJobDesc: FC<PracticalApplicationProps> = ({
  interviewId,
  indexQuestion,
  practicalApplication,
  setPracticalApplication,
}) => {
  const { t } = useTranslation();
  const { data } = useSession();
  const [getPracticalApplication, { data: practicalApplicationData, isLoading, isError }] =
    useLazyGetPracticalApplicationByJobDescQuery();

  const userId = data && data.user.user_id;

  useEffect(() => {
    if (!practicalApplication && userId) {
      getPracticalApplication({
        interviewId,
        indexQuestion: indexQuestion.toString(),
      });
    }
  }, []);

  useEffect(() => {
    if (practicalApplicationData) {
      setPracticalApplication(practicalApplicationData);
    }
  }, [practicalApplicationData]);

  return (
    <div className={'border-gray border border-x-0 border-y border-solid py-4 pr-4'}>
      <Chat isLoading={isLoading} error={isError && t('error_of_getting_practical_application')}>
        {practicalApplication}
      </Chat>
    </div>
  );
};

export default PracticalApplicationByJobDesc;
