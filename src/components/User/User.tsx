import UserIcon from '@components/Icons/UserIcon';
import { ROUTES } from '@utils/constants/routes';
import { Dropdown, Flowbite } from 'flowbite-react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import userTheme from './userTheme.fb';

interface UserProps {
  name: string;
  email: string;
  imageUrl?: string | null;
}

const User: FC<UserProps> = ({ email, imageUrl }) => {
  const { t } = useTranslation();

  return (
    <div className={'relative'}>
      <Flowbite theme={{ theme: userTheme }}>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <div className="h-10 w-10 cursor-pointer overflow-hidden rounded-full border-[3px] border-darkblue-500 transition-colors duration-300 hover:border-seagreen-900">
              {imageUrl ? (
                <Image
                  id="avatarButton"
                  data-dropdown-placement="bottom-start"
                  src={imageUrl}
                  width={40}
                  height={40}
                  className={'rounded-full border-gray-400'}
                  alt="UserModel dropdown"
                />
              ) : (
                <UserIcon id="avatarButton" className={'h-full w-full bg-gray-100 pt-1 text-gray-400'} />
              )}
            </div>
          }
          className={'text-right'}
        >
          <Dropdown.Header>
            <span className="block truncate text-sm font-medium">{email}</span>
          </Dropdown.Header>
          <Dropdown.Item>
            <Link href="/profile" className={'text-default'}>
              {t('Profile')}
            </Link>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            <span onClick={() => signOut({ redirect: true, callbackUrl: ROUTES.root })}>{t('Sign_out')}</span>
          </Dropdown.Item>
        </Dropdown>
      </Flowbite>
    </div>
  );
};

export default User;
