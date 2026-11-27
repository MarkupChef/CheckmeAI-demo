'use client';

import { DeleteOutlined } from '@ant-design/icons';
import H1 from '@components/UI/H1';
import { useDeleteAccountMutation } from '@store/api/accountApi';
import { ROUTES } from '@utils/constants/routes';
import { App, Button } from 'antd';
import { Card } from 'flowbite-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const ProfilePage: FC = () => {
  const { data } = useSession();
  const { t } = useTranslation();
  const { modal, message } = App.useApp();
  const [deleteAccount] = useDeleteAccountMutation();

  const showDeleteConfirm = () => {
    modal.confirm({
      title: t('Delete_account.confirm_title'),
      content: t('Delete_account.confirm_text'),
      okText: t('Delete'),
      okType: 'danger',
      cancelText: t('Cancel'),
      centered: true,
      onOk: async () => {
        try {
          await deleteAccount().unwrap();
        } catch (error) {
          message.error(t('Delete_account.error'));

          return;
        }

        await signOut({ redirect: true, callbackUrl: ROUTES.root });
      },
    });
  };

  return (
    <div className={'mx-auto w-full max-w-6xl px-4 text-center'}>
      <H1>{t('Profile')}</H1>
      <Card className={'mx-auto mb-5 max-w-xl bg-gray-50'}>
        <div className="border-default sm:border-3 relative mx-auto mb-2 h-[6rem] w-[6rem] overflow-hidden rounded-full border-4 border-darkblue-500 bg-gray-100 shadow-md">
          {data?.user.image ? (
            <Image width={120} height={120} src={data.user.image} alt={'Profile logo'} />
          ) : (
            <svg
              className="absolute top-4 h-full w-full text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
          )}
        </div>

        <div>
          <div className={'text-2xl font-semibold'}>{data?.user.name}</div>
          <div className="font-secondary text-base font-semibold text-gray-400 dark:text-gray-400">
            <div>{data?.user.email}</div>
          </div>
        </div>

        <div>
          <Button danger icon={<DeleteOutlined />} onClick={showDeleteConfirm}>
            {t('Delete_account')}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
