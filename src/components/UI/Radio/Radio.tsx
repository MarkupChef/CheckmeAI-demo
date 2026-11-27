import { ChangeEvent, FC } from 'react';
import styles from './radio.module.scss';

interface RadioProps {
  id: string;
  name: string;
  label: string;
  value: string | number;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Radio: FC<RadioProps> = ({ id, name, value, label, checked, onChange, ...props }) => {
  const letters = ['A', 'B', 'C', 'D'];

  return (
    <label htmlFor={id} className={styles.label}>
      <input
        id={id}
        type="radio"
        value={value}
        name={name}
        checked={checked}
        className={styles.input}
        onChange={onChange}
        {...props}
      />
      <span>{letters[+value]}</span>
      <span>{label}</span>
    </label>
  );
};

export default Radio;
