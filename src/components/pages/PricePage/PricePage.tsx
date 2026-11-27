'use client';

import PriceCardList from '@components/PriceCardList';
import H1 from '@components/UI/H1';
import { Price } from '@types';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const PricePage: FC<{ prices: Price[] | null }> = ({ prices }) => {
  const { t } = useTranslation();

  return (
    <section className={'mx-auto w-full max-w-6xl text-center'}>
      <H1>{t('pricing')}</H1>

      <PriceCardList prices={prices} />
    </section>
  );
};

export default PricePage;
