import { levelCardTheme } from '@components/LevelCard/theme.fb';
import LevelIcon from '@components/LevelIcon/LevelIcon';
import LevelStepsLine from '@components/SVG/LevelStepsLine';
import { Card } from 'flowbite-react';

const LevelsSection = () => {
  const levelCards = [
    {
      level: 'junior',
      title: 'Junior',
      description: 'For beginners who are just starting their journey in the field',
    },
    {
      level: 'middle',
      title: 'Middle',
      description: 'For those who have some experience in the field',
    },
    {
      level: 'senior',
      title: 'Senior',
      description: 'For professionals with extensive experience in the field',
    },
  ];

  const renderLevelCardsList = () => {
    return levelCards.map(({ level, title, description }, i) => {
      return (
        <Card key={i} theme={levelCardTheme} className={'w-full max-w-[460px] py-3 text-left'}>
          <div className={'h-[50px] w-[50px] flex-shrink-0 sm:h-[90px] sm:w-[90px]'}>
            <LevelIcon level={level} />
          </div>
          <div>
            <h5 className="mb-[.1em] font-semibold tracking-tight sm:text-3xl">{title}</h5>
            <p className={'sm:text-lg'}>{description}</p>
          </div>
        </Card>
      );
    });
  };

  const renderBgSections = () => (
    <>
      <div
        className={
          'absolute right-0 top-2/4 z-0 h-[2000px] w-[2000px] -translate-y-2/4 rounded-r-full bg-[#7AD0D4] sm:right-[60px]'
        }
      ></div>
      <div
        className={
          'absolute right-[70px] top-2/4 z-[1] h-[2000px] w-[2000px] -translate-y-2/4 rounded-r-full bg-seagreen-500 sm:right-[188px]'
        }
      ></div>
      <div
        className={
          'absolute right-[94%] top-2/4 z-[2] hidden h-[2000px] w-[2000px] -translate-y-2/4 rounded-r-full bg-[#7AD0D4] lg:block'
        }
      ></div>
    </>
  );

  return (
    <section className={'relative overflow-hidden bg-white py-[70px] lg:py-[100px]'}>
      {renderBgSections()}
      <div className={'container relative z-[3]'}>
        <h2 className={'mb-[0.5em] text-center text-4xl font-semibold sm:text-6xl'}>
          Who do you
          <br />
          <span className={'text-white'}>want to be?</span>
        </h2>
        <p className={'mx-auto mb-[64px] max-w-[580px] text-center text-lg text-white sm:text-xl'}>
          {/* Choose one of the levels and check if your knowledge matches it */}
          Specify the position level in the job title and check if your knowledge matches it
        </p>
        <div className={'text-center'}>
          <div className={'relative mx-auto inline-flex flex-col gap-6'}>
            {renderLevelCardsList()}
            <div className={'absolute -right-20 top-2/4 -translate-y-2/4'}>
              <LevelStepsLine />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LevelsSection;
