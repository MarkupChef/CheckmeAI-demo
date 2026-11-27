import LogoIcon from '@components/Icons/LogoIcon';
import OptionList from '@components/OptionList';
import { Question as QuestionType } from '@store/api/models/Questions.type';
import { Card } from 'flowbite-react';
import { FC } from 'react';
import styles from './question.module.scss';

interface QuestionProps {
  title: string;
  question: QuestionType;
  isTextSelect?: boolean;
}

const Question: FC<QuestionProps> = ({ title, question, isTextSelect = true }) => {
  const noSelectClass = isTextSelect ? '' : 'select-none';

  return (
    <Card>
      <header className={styles.header}>
        <LogoIcon className={styles.logo} />
        <h2 id={'question'} className={`${styles.question} ${noSelectClass}`}>
          {title}
        </h2>
      </header>
      <OptionList question={question} />
    </Card>
  );
};

export default Question;
