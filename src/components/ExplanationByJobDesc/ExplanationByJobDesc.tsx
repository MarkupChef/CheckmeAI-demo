import Chat from '@components/Chat';
import { useLazyGetExplanationByJobDescQuery } from '@store/api/explanationApi';
import { useSession } from 'next-auth/react';
import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface ExplanationProps {
  interviewId: string;
  indexQuestion: number;
  question: string;
  answer: string;
  explanation: string | null;
  setExplanation: Dispatch<SetStateAction<string | null>>;
}
// TODO: optimize this component with PracticalApplication component
const ExplanationByJobDesc: FC<ExplanationProps> = ({
  interviewId,
  indexQuestion,
  question,
  answer,
  explanation,
  setExplanation,
}) => {
  const { t } = useTranslation();
  const { data } = useSession();
  const [getExplanationByJobDesc, { data: explanationData, isLoading, isError }] =
    useLazyGetExplanationByJobDescQuery();

  const userId = data && data.user.user_id;

  useEffect(() => {
    if (!explanation && userId) {
      getExplanationByJobDesc({
        interviewId,
        indexQuestion: indexQuestion.toString(),
        question,
        answer,
        userId,
      });
    }
  }, []);

  useEffect(() => {
    if (explanationData) {
      setExplanation(explanationData);
    }
  }, [explanationData]);

  return (
    <div className={'border-gray border border-x-0 border-y border-solid py-4 pr-4'}>
      <Chat isLoading={isLoading} error={isError && t('error_of_getting_explanation')}>
        {explanation}
      </Chat>
    </div>
  );
};

export default ExplanationByJobDesc;
