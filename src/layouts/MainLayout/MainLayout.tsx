'use client';

import MobileNavPanel from '@components/MobileNavPanel';
import useClientMediaQuery from '@hooks/useClientMediaQuery';
import Footer from '@layouts/Footer';
import Header from '@layouts/Header';
import { ROUTES } from '@utils/constants/routes';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, ReactElement } from 'react';

function MainLayout({ children }: PropsWithChildren) {
  const isMobile = useClientMediaQuery('(max-width: 767px)');
  const pathname = usePathname() || '';
  const isHomeRoute = pathname === ROUTES.root;
  const isPricingRoute = pathname.startsWith(ROUTES.price);
  const isInterviewRoute = pathname.startsWith(`${ROUTES.interview}/`);

  const mainClasses =
    isHomeRoute || isPricingRoute
      ? 'flex-grow pt-[128px] sm:pt-[164px]'
      : 'pt-[128px] sm:pt-[164px] xs:px-4 sm:px-8 xl:px-11 flex grow flex-col';

  const mainLayoutClasses = isHomeRoute ? 'before:absolute after:absolute' : '';

  return (
    <div className={`main-layout min-h-screen min-w-[320px] overflow-hidden pb-[108px] md:pb-0 ${mainLayoutClasses}`}>
      <div className={'relative z-10 flex flex-col pb-5 md:min-h-[inherit]'}>
        <Header />
        <main className={`${mainClasses}`}>{children}</main>
        <Footer />
        {isMobile && !isInterviewRoute && <MobileNavPanel />}
      </div>
    </div>
  );
}

export default MainLayout;

export const getMainLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
