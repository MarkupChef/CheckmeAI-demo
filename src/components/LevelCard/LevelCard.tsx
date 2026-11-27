import JuniorIcon from '@components/Icons/JuniorIcon';
import MiddleIcon from '@components/Icons/MiddleIcon';
import SeniorIcon from '@components/Icons/SeniorIcon';
import { LevelTypes } from '@types';
import { Card } from 'flowbite-react';
import { FC, ReactNode } from 'react';
import { levelCardTheme } from './theme.fb';

interface TopicCardProps {
  name: string;
  level: LevelTypes;
  small?: boolean;
}

interface IconLevel {
  [key: string]: ReactNode;
}

const LevelCard: FC<TopicCardProps> = ({ name, level, small }) => {
  const levelIcons: IconLevel = {
    junior: <JuniorIcon className={'mx-auto max-h-full'} />,
    middle: <MiddleIcon className={'mx-auto max-h-full'} />,
    senior: <SeniorIcon className={'mx-auto max-h-full'} />,
  };

  return (
    <Card theme={levelCardTheme}>
      {small ? (
        <>
          <div className={'h-[50px] w-[50px] flex-shrink-0'}>{levelIcons[level]}</div>
          <h5 className="text-3xl font-medium capitalize tracking-tight dark:text-white">{name}</h5>
        </>
      ) : (
        <>
          <div className={'h-[50px] w-[50px] flex-shrink-0 lg:h-[70px] lg:w-[70px]'}>{levelIcons[level]}</div>
          <h5 className="text-2xl font-medium tracking-tight dark:text-white lg:text-4xl">{name}</h5>
        </>
      )}
    </Card>
  );
};

export default LevelCard;
