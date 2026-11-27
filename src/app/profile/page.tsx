import ProfilePage from '@components/pages/ProfilePage';
import { t } from '@i18n/server';
import { PROJECT_NAME } from '@utils/constants/constants';
import type { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: `${PROJECT_NAME} | ${t('Profile')}`,
  };
}

export default function Profile() {
  return <ProfilePage />;
}
