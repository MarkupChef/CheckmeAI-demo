import { SolutionOutlined } from '@ant-design/icons';
import HomeIcon from '@components/Icons/HomeIcon';
import InterviewIcon from '@components/Icons/InterviewIcon';
import LoginIcon from '@components/Icons/LoginIcon';
import TopicsIcon from '@components/Icons/TopicsIcon';
import MobileNavItem from '@components/MobileNavItem/MobileNavItem';
import useAppDispatch from '@hooks/useAppDispatch';
import { setModeId } from '@store/interviewSlice';
import { ROUTES } from '@utils/constants/routes';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import styles from './mobileNavPanel.module.scss';

const MobileNavPanel = () => {
  const router = useRouter();
  const pathname = usePathname() || '';
  const dispatch = useAppDispatch();

  const { t } = useTranslation();
  const { data } = useSession();

  const isHomeRoute = pathname === ROUTES.root;
  const isInterviewsRoute = pathname.startsWith(ROUTES.interviews);
  const isTopicsRoute = pathname.startsWith(ROUTES.topics);
  const isJobVacancyRoute = pathname.startsWith(ROUTES.job_vacancy);

  const handleMoveToTopics = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await dispatch(setModeId({ modeId: null }));
    await router.push(ROUTES.topics);
  };

  return (
    <div className={styles.root}>
      <div>
        <Link href={ROUTES.root} className={isHomeRoute ? 'text-primary' : 'text-default'}>
          <MobileNavItem title={t('Home')} icon={<HomeIcon />} />
        </Link>
      </div>

      <div>
        <Link
          href={ROUTES.topics}
          className={isTopicsRoute ? 'text-primary' : 'text-default'}
          onClick={handleMoveToTopics}
        >
          <MobileNavItem title={t('menu_topics')} icon={<TopicsIcon />} />
        </Link>
      </div>

      <div>
        <Link href={ROUTES.job_vacancy} className={isJobVacancyRoute ? 'text-primary' : 'text-default'}>
          <MobileNavItem title={t('menu_job_vacancy')} icon={<SolutionOutlined className={'!block'} />} />
        </Link>
      </div>

      {data && (
        <div>
          <Link href={ROUTES.interviews} className={isInterviewsRoute ? 'text-primary' : 'text-default'}>
            <MobileNavItem title={t('Interviews')} icon={<InterviewIcon />} />
          </Link>
        </div>
      )}

      {!data && (
        <div>
          <Link href={ROUTES.login}>
            <MobileNavItem title={t('Sign_in')} icon={<LoginIcon />} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileNavPanel;
