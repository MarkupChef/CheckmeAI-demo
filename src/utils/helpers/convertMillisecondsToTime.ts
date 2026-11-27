import { Duration } from 'luxon';

function convertSecondsToTime(sec: number, format: string): string {
  const duration = Duration.fromMillis(sec * 1000);

  return duration.toFormat(format);
}

export default convertSecondsToTime;
