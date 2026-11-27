import AnswerList from '@components/AnswerList';
import ErrorIcon from '@components/Icons/ErrorIcon';
import LikeIcon from '@components/Icons/LikeIcon';
import { Accordion } from 'flowbite-react';
import { memo, useState } from 'react';
import styles from './accordionItem.module.scss';

interface AccordionItemProps {
  i: number;
  question: any;
  interviewId: string;
  topicName: string;
  level: string;
  mode: any;
}

const AccordionItem = ({ i, question, interviewId, topicName, level, mode }: AccordionItemProps) => {
  const [isOpened, setIsOpened] = useState(false);

  const toggleAccordion = (e: any) => {
    const target = e.target;

    if (target.hasAttribute('data-button') || target.closest('button[data-button]')) {
      setIsOpened(!isOpened);
    }
  };

  return (
    <Accordion collapseAll alwaysOpen onClick={toggleAccordion}>
      <Accordion.Panel key={`q-${i}`}>
        <Accordion.Title className={i > 0 ? 'mt-4' : ''} data-button={''}>
          <div className={styles.item}>
            {question.answerIndex === question.answerUserIndex ? (
              <LikeIcon className={styles.icon} />
            ) : (
              <ErrorIcon className={styles.icon} />
            )}
            <span className={styles.text}>
              {i + 1}. {question.expression}
            </span>
          </div>
        </Accordion.Title>
        <Accordion.Content>
          {isOpened && (
            <AnswerList
              interviewId={interviewId}
              topic={topicName}
              level={level}
              question={question}
              indexQuestion={i}
              isExplanation={mode.is_explanation}
              isPracticalApplication={mode.is_practical_application}
            />
          )}
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  );
};

export default memo(AccordionItem);
