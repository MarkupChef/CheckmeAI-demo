import ClockIcon from '@components/Icons/ClockIcon';
import useInterviewTimer from '@components/InterviewTimer/useInterviewTimer';
import { FC, useEffect } from 'react';
interface InterviewTimerProps {
  afterEndCallback?: () => any;
  className?: string;
}
const InterviewTimer: FC<InterviewTimerProps> = ({ afterEndCallback, className }) => {
  const { timer, isTimerEnded } = useInterviewTimer();
  useEffect(() => {
    if (isTimerEnded && afterEndCallback) {
      afterEndCallback();
    }
  }, [isTimerEnded]);

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <ClockIcon />
      <span className={'text-xl'}>{timer}</span>
    </div>
  );
};
export default InterviewTimer;
