import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { decrementTimer, resetTimer } from '@store/questionsSlice';
import formatDuration from '@utils/helpers/formatDuration';
import { useEffect } from 'react';
const useInterviewTimer = () => {
  const dispatch = useAppDispatch();
  const timer = useAppSelector((state) => state.questions.timer);
  const isTimerEnded = timer <= 0;
  const formattedTimer = formatDuration(Math.ceil(timer));
  const reset = () => {
    dispatch(resetTimer());
  };
  useEffect(() => {
    if (timer <= 0) {
      return;
    }
    const interval: any = setInterval(() => {
      dispatch(decrementTimer());
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return {
    timer: formattedTimer,
    isTimerEnded,
    resetTimer: reset,
  };
};
export default useInterviewTimer;
