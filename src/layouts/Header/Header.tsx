import { MenuOutlined } from '@ant-design/icons';
import UserIcon from '@components/Icons/UserIcon';
import Logo from '@components/Logo';
import User from '@components/User';
import useAppDispatch from '@hooks/useAppDispatch';
import { setModeId } from '@store/interviewSlice';
import { IS_DEMO_MODE } from '@utils/constants/environments';
import { ROUTES } from '@utils/constants/routes';
import { Button, Drawer, Menu, MenuProps, Tag } from 'antd';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import colors from '../../../colors';
import styles from './header.module.scss';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname() || '';
  const dispatch = useAppDispatch();
  const { data } = useSession();
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const isHomeRoute = pathname === ROUTES.root;
  const isProfileRoute = pathname.startsWith(ROUTES.profile);
  const isInterviewsRoute = pathname.startsWith(ROUTES.interviews);
  const isLoginRoute = pathname.startsWith(ROUTES.login);
  const isPriceRoute = pathname.startsWith(ROUTES.price);
  const isTopicsRoute = pathname.startsWith(ROUTES.topics);
  const isJobVacancyRoute = pathname.startsWith(ROUTES.job_vacancy);
  const isContactsRoute = pathname.startsWith(ROUTES.contacts);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMoveToTopics = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await dispatch(setModeId({ modeId: null }));
    await router.push(ROUTES.topics);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const logOut = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await signOut({ redirect: true, callbackUrl: ROUTES.root });
  };

  const menuRoutes = [
    { key: ROUTES.root, isActive: isHomeRoute },
    { key: ROUTES.topics, isActive: isTopicsRoute },
    { key: ROUTES.job_vacancy, isActive: isJobVacancyRoute },
    { key: ROUTES.price, isActive: isPriceRoute },
    { key: ROUTES.contacts, isActive: isContactsRoute },
    { key: ROUTES.interviews, isActive: isInterviewsRoute },
    { key: ROUTES.login, isActive: isLoginRoute },
  ];
  const selectedMenuKeys = menuRoutes.filter((route) => route.isActive).map((route) => route.key);

  const menuItems: MenuProps['items'] = [
    { key: ROUTES.root, label: <Link href={ROUTES.root}>{t('Home')}</Link> },
    {
      key: ROUTES.topics,
      label: (
        <Link href={ROUTES.topics} onClick={handleMoveToTopics}>
          {t('menu_topics')}
        </Link>
      ),
    },
    { key: ROUTES.job_vacancy, label: <Link href={ROUTES.job_vacancy}>{t('menu_job_vacancy')}</Link> },
    { key: ROUTES.price, label: <Link href={ROUTES.price}>{t('pricing')}</Link> },
    { key: ROUTES.contacts, label: <Link href={ROUTES.contacts}>{t('contacts')}</Link> },
    ...(data ? [{ key: ROUTES.interviews, label: <Link href={ROUTES.interviews}>{t('My_interviews')}</Link> }] : []),
  ];

  const authMenuItems: MenuProps['items'] = data
    ? [
        {
          key: 'sign_out',
          label: (
            <Link href={'#'} onClick={logOut}>
              {t('Sign_out')}
            </Link>
          ),
        },
      ]
    : [{ key: ROUTES.login, label: <Link href={ROUTES.login}>{t('Sign_in')}</Link> }];

  return (
    <header className={'absolute left-0 top-0 w-full py-4 sm:py-8'}>
      <nav className="relative px-4 dark:border-gray-700 dark:bg-gray-800 md:px-8 xl:px-11">
        <div className="mx-auto flex flex-wrap items-center justify-end">
          <div className={'mr-auto flex h-[54px] items-center gap-2 sm:items-start'}>
            <Link href="/" className={`hover:text-default`}>
              <Logo />
            </Link>
            {IS_DEMO_MODE && (
              <Tag color={colors.orangered} className={'!me-0 !px-1.5 !text-[0.625rem] !leading-4 sm:mt-[0.45rem]'}>
                {t('demo_mode_label')}
              </Tag>
            )}
          </div>

          {data && !isMobile && (
            <div
              className={`${isMobile ? 'ml-auto' : 'ml-8'} lg:order-3 ${
                isProfileRoute && 'lg:nav-link-active lg:nav-link-active--logo'
              }`}
            >
              {<User name={data.user.name} email={data.user.email} imageUrl={data.user.image} />}
            </div>
          )}
          <Button
            type="text"
            size="large"
            className="ml-6 lg:!hidden"
            aria-label={'Open main menu'}
            icon={<MenuOutlined className="!text-2xl text-default" />}
            onClick={() => setIsMenuOpen(true)}
          />
          <Drawer
            open={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            width={280}
            rootClassName={styles.drawer}
            title={
              data && (
                <Link href={ROUTES.profile} className={styles.drawerProfile}>
                  {data.user.image ? (
                    <Image
                      src={data.user.image}
                      width={32}
                      height={32}
                      className={styles.drawerProfileImg}
                      alt="UserModel dropdown"
                    />
                  ) : (
                    <UserIcon className={`${styles.drawerProfileImg} bg-gray-100 text-gray-400`} />
                  )}
                  {t('Profile')}
                </Link>
              )
            }
          >
            <Menu
              mode="inline"
              items={menuItems}
              selectedKeys={selectedMenuKeys}
              className={styles.menu}
              onClick={() => setIsMenuOpen(false)}
            />
            <Menu
              mode="inline"
              items={authMenuItems}
              selectedKeys={selectedMenuKeys}
              className={styles.menu}
              onClick={() => setIsMenuOpen(false)}
            />
          </Drawer>
          <div className="ml-auto hidden lg:block">
            <ul className={styles.navList}>
              <li>
                <Link href={ROUTES.root} className={`${styles.navItem} ${isHomeRoute ? styles.navLinkActive : ''}`}>
                  {t('Home')}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.topics}
                  className={`${styles.navItem} ${isTopicsRoute ? styles.navLinkActive : ''}`}
                  onClick={handleMoveToTopics}
                >
                  {t('menu_topics')}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.job_vacancy}
                  className={`${styles.navItem} ${isJobVacancyRoute ? styles.navLinkActive : ''}`}
                >
                  {t('menu_job_vacancy')}
                </Link>
              </li>
              <li>
                <Link href={ROUTES.price} className={`${styles.navItem} ${isPriceRoute ? styles.navLinkActive : ''}`}>
                  {t('pricing')}
                </Link>
              </li>
              {data ? (
                <li>
                  <Link
                    href={ROUTES.interviews}
                    className={`${styles.navItem} ${isInterviewsRoute ? styles.navLinkActive : ''}`}
                  >
                    {t('My_interviews')}
                  </Link>
                </li>
              ) : (
                <li>
                  <Link href={ROUTES.login} className={`${styles.navItem} ${isLoginRoute ? styles.navLinkActive : ''}`}>
                    {t('Sign_in')}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
