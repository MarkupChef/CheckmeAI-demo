'use client';

import CardPrice from '@components/CardPrice';
import ModeCard from '@components/ModeCard';
import ModeFeatureList from '@components/ModeFeatureList';
import useClientMediaQuery from '@hooks/useClientMediaQuery';
import { useGetModesQuery } from '@store/api/modesApi';
import { setModeId } from '@store/interviewSlice';
import { Mode, Price } from '@types';
import { CURRENCY_SYMBOL, FREE_MODE_SLUG } from '@utils/constants/constants';
import { ROUTES } from '@utils/constants/routes';
import { Button } from 'flowbite-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import styles from './priceCardList.module.scss';

const PriceCardList: FC<{ prices: Price[] | null }> = ({ prices }) => {
  const { t } = useTranslation();
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const [modes, setModes] = useState<Price[] | null>(prices);
  const isMobile = useClientMediaQuery('(max-width: 767px)');
  const isTablet = useClientMediaQuery('(min-width: 768px) and (max-width: 1023px)');

  let btnSize = 'sm';

  if (isTablet) {
    btnSize = 'rg';
  }

  if (isMobile) {
    btnSize = 'md';
  }

  const isAuth = session && status === 'authenticated';

  // getting available (paid) mode for authed user
  const { data, isLoading, isError } = useGetModesQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: !isAuth,
  });

  const handlePay = async (id: string) => {
    await dispatch(setModeId({ modeId: id }));
    await router.push(`${ROUTES.price}/${id}`);
  };

  const handleStartFromPricePage = async (id: string) => {
    await dispatch(setModeId({ modeId: id }));
    // await router.push(ROUTES.topics);
    await router.push(`${ROUTES.interview}/${id}`);
  };

  useEffect(() => {
    if (isError) {
      console.error('Error of getting User modes');

      return;
    }

    if (data && !isLoading && !isError) {
      setModes(data);
    }
  }, [data, isLoading, isError]);

  const renderPriceFooter = (mode: Mode) => {
    const renderAvailableBtn = () => (
      <Button
        size={btnSize}
        className={styles.btn}
        color={'primary'}
        onClick={() => handleStartFromPricePage(mode._id)}
        disabled={isLoading}
      >
        {t('Start')}
      </Button>
    );

    const renderNotAvailableBtn = () => (
      <Button size={btnSize} className={styles.btn} onClick={() => handlePay(mode._id)} disabled={isLoading}>
        {t('buy_now')}
      </Button>
    );

    if (!isAuth) {
      return mode.slug === FREE_MODE_SLUG ? renderAvailableBtn() : renderNotAvailableBtn();
    }

    if (mode.slug === FREE_MODE_SLUG && !mode.available) {
      return <div className={styles.warningMessage}>* {t('not_available_free_move_message')}</div>;
    }

    if (mode.is_used && !mode.available) {
      return <div className={styles.warningMessage}>* {t('not_available_paid_mode_message')}</div>;
    }

    return mode.available ? renderAvailableBtn() : renderNotAvailableBtn();
  };

  const freeModes = modes?.filter((mode) => mode.slug === FREE_MODE_SLUG) || [];
  const paidModes = modes?.filter((mode) => mode.slug !== FREE_MODE_SLUG) || [];
  const sortedModes = [...freeModes, ...paidModes];

  return (
    <ul className={styles.root}>
      {sortedModes.map((price, i) => (
        <li key={`price-${i}`} className={styles.item}>
          <ModeCard
            name={t(price.title)}
            title={
              <div className={'flex items-center justify-center gap-2'}>
                <span className={'text-3xl'}>{CURRENCY_SYMBOL}</span>
                <CardPrice price={price.price} />
              </div>
            }
            subtitle={`${price.number_questions} ${t('questions')}`}
            description={`1 ${t('interview')}`}
            content={<ModeFeatureList mode={price} />}
            footer={renderPriceFooter(price)}
          />
        </li>
      ))}
    </ul>
  );
};

export default PriceCardList;
