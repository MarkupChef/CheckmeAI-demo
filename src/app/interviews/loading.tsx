'use client';

import H1 from '@components/UI/H1';
import { Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';

export default function Loading() {
  const { t } = useTranslation();

  return (
    <div className={'mx-auto w-full max-w-6xl'}>
      <H1>{t('My_interviews')}</H1>
      <div className={'mx-auto mb-8 max-w-[21rem]'}>
        <Skeleton.Button active block size={'large'} shape={'round'} />
      </div>
      <ul>
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i} className={'mb-4 last:mb-0'}>
            <Skeleton.Input active block className={'!h-14 !rounded-2xl'} />
          </li>
        ))}
      </ul>
    </div>
  );
}
