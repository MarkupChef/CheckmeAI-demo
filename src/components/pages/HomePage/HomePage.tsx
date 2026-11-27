'use client';

import CertificateSection from '@components/pages/HomePage/CertificateSection';
import IntroSectionByJobDesc from '@components/pages/HomePage/IntroSectionByJobDesc';
import JobVacancySection from '@components/pages/HomePage/JobVacancySection';
import LevelsSection from '@components/pages/HomePage/LevelSection';
import PricingSection from '@components/pages/HomePage/PricingSection';
import TopicsSection from '@components/pages/HomePage/TopicsSection';
import { Price, Topic } from '@types';
import { FC } from 'react';

interface HomePageProps {
  topics: Topic[];
  prices: Price[];
}

const HomePage: FC<HomePageProps> = ({ topics, prices }) => {
  return (
    <>
      <IntroSectionByJobDesc />

      <JobVacancySection />

      <TopicsSection topics={topics} />

      <LevelsSection />

      <CertificateSection />

      <PricingSection prices={prices} />
    </>
  );
};

export default HomePage;
