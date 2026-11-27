'use client';

import GitHubIcon from '@components/Icons/GitHubIcon';
import GoogleIcon from '@components/Icons/GoogleIcon';
import LoadingIcon from '@components/Icons/LoadingIcon';
import H1 from '@components/UI/H1';
import { ERROR_LOGIN_PROVIDER_MISMATCH_KEY } from '@utils/constants/constants';
import { ROUTES } from '@utils/constants/routes';
import { Button, Card } from 'flowbite-react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LoginPage: FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || ROUTES.root;
  const { data: session, status } = useSession();
  const isErrorLoginProvider = searchParams?.get('error') === ERROR_LOGIN_PROVIDER_MISMATCH_KEY;

  useLayoutEffect(() => {
    if (status === 'authenticated') {
      router.push(ROUTES.root);
    }
  }, [session, status, router]);

  if (status === 'loading' || status === 'authenticated') {
    return <LoadingIcon />;
  }

  return (
    <div className={'mx-auto w-full max-w-6xl text-center'}>
      <H1>{t('Sign_in')}</H1>
      <Card className={'mx-auto mb-5 max-w-lg bg-gray-50'}>
        <h2 className={'text-2xl'}>{t('Continue_with')}</h2>
        <Button
          size="sm"
          className={'btn-sm w-full'}
          color={'primary'}
          onClick={() => signIn('google', { callbackUrl })}
        >
          <GoogleIcon />
          {t('Continue_with')} Google
        </Button>
        <Button
          size="sm"
          className={'btn-sm w-full'}
          color={'primary'}
          onClick={() => signIn('github', { callbackUrl })}
        >
          <GitHubIcon />
          {t('Continue_with')} GitHub
        </Button>
        {isErrorLoginProvider && <p className={'text-sm font-semibold text-red'}>{t('error_login_provider')}</p>}
      </Card>
    </div>
  );
};

export default LoginPage;
