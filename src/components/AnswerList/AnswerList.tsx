import ChatActionButton from '@components/ChatActionButton/ChatActionButton';
import ExplanationByJobDesc from '@components/ExplanationByJobDesc';
import LogoIcon from '@components/Icons/LogoIcon';
import PracticalApplicationByJobDesc from '@components/PracticalApplicationByJobDesc';
import { InterviewQuestion } from '@types';
import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './answerList.module.scss';

interface AnswerListProps {
  interviewId: string;
  topic: string;
  level: string;
  question: InterviewQuestion;
  indexQuestion: number;
  isExplanation: boolean;
  isPracticalApplication: boolean;
}

interface ChatAction {
  key: string;
  isActive: boolean;
  title: string;
}

const AnswerList: FC<AnswerListProps> = ({
  interviewId,
  indexQuestion,
  question,
  isExplanation,
  isPracticalApplication,
}) => {
  const { t } = useTranslation();

  const [explanation, setExplanation] = useState<string | null>(question.explanation);
  const [practicalApplication, setPracticalApplication] = useState<string | null>(question.practicalApplication);

  const [chatActions, setChatActions] = useState<ChatAction[]>([]);

  const isChatOpened = chatActions.some((action) => action.isActive);

  const addChatAction = (chatAction: ChatAction) => {
    setChatActions((currentState) => {
      if (currentState.some((item) => item.key === chatAction.key)) {
        return currentState;
      }

      return [...currentState, chatAction];
    });
  };

  useMemo(() => {
    if (isExplanation) {
      addChatAction({ key: 'explanation', isActive: false, title: t('Why') });
    }

    if (isPracticalApplication) {
      addChatAction({ key: 'practicalApplication', isActive: false, title: t('where_can_i_use_this') });
    }
  }, [isExplanation, isPracticalApplication]);

  const onChatActionClick = (key: string) => {
    const updatedChatActions = chatActions.map((action) => {
      if (action.key === key) {
        return { ...action, isActive: !action.isActive };
      }

      return { ...action, isActive: false };
    });

    setChatActions(updatedChatActions);
  };

  const onCloseChat = () => {
    const updatedChatActions = chatActions.map((action) => {
      return { ...action, isActive: false };
    });

    setChatActions(updatedChatActions);
  };

  const renderExplanation = () => {
    return (
      <ExplanationByJobDesc
        interviewId={interviewId}
        indexQuestion={indexQuestion}
        question={question.expression}
        explanation={explanation}
        setExplanation={setExplanation}
        answer={question.options[question.answerIndex]}
      />
    );
  };

  const renderPracticalApplication = () => {
    return (
      <PracticalApplicationByJobDesc
        interviewId={interviewId}
        indexQuestion={indexQuestion}
        practicalApplication={practicalApplication}
        setPracticalApplication={setPracticalApplication}
      />
    );
  };

  const renderChatResults = () =>
    chatActions.map((action) =>
      action.isActive ? (
        <div key={action.key} className={styles.chatContainer}>
          {action.key === 'explanation' && renderExplanation()}
          {action.key === 'practicalApplication' && renderPracticalApplication()}
        </div>
      ) : null
    );

  const renderChatActions = () => (
    <div className={styles.chatActions}>
      <LogoIcon className={styles.chatActionsLogo} />
      <ul className={styles.chatActionList}>
        {chatActions.map((action) => (
          <li key={action.key}>
            <div onClick={() => onChatActionClick(action.key)}>
              <ChatActionButton title={action.title} isActive={action.isActive} />
            </div>
          </li>
        ))}
        {isChatOpened && (
          <li>
            <button type={'button'} className={styles.closeButton} onClick={onCloseChat}>
              {t('close')}
            </button>
          </li>
        )}
      </ul>
    </div>
  );

  return (
    <ul className={styles.optionList}>
      {question.options.map((opt, i) => (
        <li key={`answer-id-${i}`} className={styles.answerItem}>
          {i === question.answerIndex ? (
            <>
              <div className={styles.correctOption}>{`${opt}`}</div>
              {renderChatResults()}
              {renderChatActions()}
            </>
          ) : i === question.answerUserIndex && question.answerUserIndex !== question.answerIndex ? (
            <div className={styles.wrongOptions}>{`${opt}`}</div>
          ) : (
            <div>{`${opt}`}</div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default AnswerList;
