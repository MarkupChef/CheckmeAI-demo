import JuniorIcon from '@components/Icons/JuniorIcon';
import MiddleIcon from '@components/Icons/MiddleIcon';
import SeniorIcon from '@components/Icons/SeniorIcon';
import { FC, ReactNode } from 'react';

export interface IconLevel {
  [key: string]: ReactNode;
}

const LevelIcon: FC<{ level: string }> = ({ level }) => {
  const classes = 'h-full w-full';

  const iconLevel: IconLevel = {
    junior: <JuniorIcon className={classes} />,
    middle: <MiddleIcon className={classes} />,
    senior: <SeniorIcon className={classes} />,
  };

  return <>{iconLevel[level]}</>;
};

export default LevelIcon;
