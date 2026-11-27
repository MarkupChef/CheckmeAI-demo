import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const AverageTime: FC<{ averageTime: number }> = ({ averageTime }) => {
  const { t } = useTranslation();
  const time = Math.round(averageTime * 10) / 10;

  return (
    <div>
      {t('average_time_answer')}:{' '}
      <span className={'font-bold'}>
        {time}
        {t('s')}
      </span>
    </div>
  );
};

export default AverageTime;
