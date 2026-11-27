import { FC } from 'react';

interface CounterProps {
  leftNum: number;
  rightNum: number;
}

const Counter: FC<CounterProps> = ({ leftNum, rightNum }) => {
  return (
    <div className={'text-lg font-semibold md:text-xl 2xl:text-2xl'}>
      {leftNum} <span className={'text-default/70'}>/ {rightNum}</span>
    </div>
  );
};

export default Counter;
