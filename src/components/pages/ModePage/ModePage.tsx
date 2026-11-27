'use client';

import BackLink from '@components/BackLink';
import LoadingIcon from '@components/Icons/LoadingIcon';
import ModeFeatureList from '@components/ModeFeatureList';
import H1 from '@components/UI/H1';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { useGetModesQuery } from '@store/api/modesApi';
import { setLevel, setModeId } from '@store/interviewSlice';
import { Mode } from '@types';
import { FREE_MODE_SLUG } from '@utils/constants/constants';
import { ROUTES } from '@utils/constants/routes';
import { Button } from 'flowbite-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import ModeCard from '../../ModeCard';
import styles from './modePage.module.scss';

const ModePage: FC = () => {
  const { t } = useTranslation();
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const params = useParams<{ level: string; slug: string }>();
  const level = params?.level as string;
  const topicName = params?.slug as string;
  const modeId = useAppSelector((state) => state.interview.modeId);
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isAuth = session && status === 'authenticated';
  const backLink = `${ROUTES.topics}/${topicName}`;

  // getting modes with availability for the user
  const { data: modes, isLoading } = useGetModesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const handleClick = async (id: string) => {
    dispatch(setModeId({ modeId: id }));
    await router.push(ROUTES.interview_preparation);
  };

  useEffect(() => {
    dispatch(setLevel({ level }));

    if (modeId) {
      router.push(ROUTES.interview_preparation);
    }
  }, []);

  if (modeId) {
    return <LoadingIcon />;
  }

  const renderModeFooter = (mode: Mode) => {
    const renderAvailableBtn = () => (
      <Button
        size={isMobile ? 'md' : 'sm'}
        className={styles.btn}
        color={'primary'}
        onClick={() => handleClick(mode._id)}
      >
        {t('Start')}
      </Button>
    );

    const renderNotAvailableBtn = () => (
      <Link href={ROUTES.price} className={'font-semibold'}>
        <Button size={isMobile ? 'md' : 'sm'} className={styles.btn}>
          {t('get')}
        </Button>
      </Link>
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

  const renderModeList = () => {
    return [modes[1], modes[0]].map((mode, i) => (
      <li key={`mode-${i}`} className={styles.item}>
        <ModeCard
          name={t(mode.title)}
          title={mode.number_questions}
          subtitle={t('questions')}
          description={mode.description}
          content={<ModeFeatureList mode={mode} />}
          footer={renderModeFooter(mode)}
        />
      </li>
    ));
  };

  return (
    <div className={'mx-auto w-full max-w-6xl text-center'}>
      <H1>{t('Choose_mode')}</H1>
      {isLoading && <LoadingIcon />}
      {!isLoading && modes && <ul className={styles.root}>{renderModeList()}</ul>}

      <BackLink href={backLink} className={'mx-auto mt-6 max-w-[160px]'}>
        {t('back_to_levels')}
      </BackLink>
    </div>
  );
};

export default ModePage;
