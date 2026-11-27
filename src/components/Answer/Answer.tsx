import { FC } from 'react';
import styles from './answer.module.scss';

interface AnswerProps {
  correct?: boolean;
  children: any;
  checked?: boolean;
}

const Answer: FC<AnswerProps> = ({ correct, children, checked, ...props }) => {
  let classList = styles.default;

  classList = correct !== undefined ? (correct ? styles.correct : styles.wrong) : classList;

  if (checked) {
    classList = styles.checked;
  }

  return (
    <div className={`${styles.root} ${classList}`} {...props}>
      {children}
    </div>
  );
};

export default Answer;
