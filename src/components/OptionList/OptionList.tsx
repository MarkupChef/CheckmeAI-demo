import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { Question } from '@store/api/models/Questions.type';
import { setAnswer } from '@store/questionsSlice';
import { FC } from 'react';
import Answer from '../Answer';
import Radio from '../UI/Radio/Radio';

interface OptionListProps {
  question: Question;
}

const OptionList: FC<OptionListProps> = ({ question }) => {
  const dispatch = useAppDispatch();
  const { index, questions } = useAppSelector((state) => state.questions);

  return (
    <ul>
      {question.options.map((opt, i) => (
        <li key={`answer-id-${i}`} className={'mb-4 last:mb-0'}>
          {questions[index].options.length > 0 && (
            <Answer checked={i === question.answerUserIndex}>
              <Radio
                id={`answer-id-${i}`}
                name={'answer'}
                label={opt ? opt.toString() : `Error option: ${opt}`}
                value={i}
                checked={i === question.answerUserIndex}
                onChange={(e) => dispatch(setAnswer({ answerIndex: +e.target.value }))}
              />
            </Answer>
          )}
        </li>
      ))}
    </ul>
  );
};

export default OptionList;
