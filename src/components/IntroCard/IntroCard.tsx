import LogoIcon from '@components/Icons/LogoIcon';
import { Card } from 'flowbite-react';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface IntroCardProps {
  children?: ReactNode;
}

const IntroCard = ({ children }: IntroCardProps) => {
  const { t } = useTranslation();

  return (
    <Card className={'relative mt-[2.2rem] rounded-3xl'}>
      <LogoIcon
        className={
          'absolute left-1/2 top-0 h-[3.5rem] w-[3.5rem] translate-x-[-50%] translate-y-[-40%] md:h-[4.5rem] md:w-[4.5rem]'
        }
      />
      <h1
        className={
          'mb-0 mt-4 text-center text-2xl font-bold tracking-tight dark:text-white md:mt-8 md:text-3xl xl:text-4xl'
        }
      >
        {t('hi_i_am_checkmeai')}
      </h1>

      <p className="text-balance text-center text-lg font-medium leading-normal text-gray-700 dark:text-gray-300 md:text-xl">
        I am CheckmeAI, your AI coach for real technical interviews at junior, middle or senior level.
        {/* TODO: hid for Topic Interview functionality */}
        {/* {t('Welcome_description')} */}
      </p>

      <p
        className={
          'text-balance text-center text-sm font-normal leading-normal text-gray-500 dark:text-gray-400 md:text-base'
        }
      >
        I will ask the most common questions from real interviews. Paste a Job Description or choose a topic and check
        whether your knowledge matches the position.
      </p>

      {children}
    </Card>
  );
};

export default IntroCard;
