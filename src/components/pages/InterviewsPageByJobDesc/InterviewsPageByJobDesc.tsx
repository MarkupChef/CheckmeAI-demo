'use client';

import Chat from '@components/Chat';
import ErrorIcon from '@components/Icons/ErrorIcon';
import LikeIcon from '@components/Icons/LikeIcon';
import useIsMounted from '@hooks/useIsMounted';
import { InterviewsProps } from '@types';
import { ROUTES } from '@utils/constants/routes';
import { Button, Card } from 'flowbite-react';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

function toFormatDate(data: string): { time: string; date: string } {
  const time = DateTime.fromISO(data, { zone: 'utc' }).setZone('local').toFormat('HH:mm');
  const date = DateTime.fromISO(data, { zone: 'utc' }).setZone('local').toFormat('dd.LL.yyyy');

  return {
    time,
    date,
  };
}

const InterviewsPageByJobDesc: FC<InterviewsProps> = ({ interviews }) => {
  const { t } = useTranslation();
  // the local time zone is known only on the client
  const isMounted = useIsMounted();

  return (
    <div className={'mx-auto w-full max-w-6xl'}>
      {interviews?.length > 0 ? (
        <ul className={'text-md'}>
          <li className="mb-4 flex gap-4 rounded-2xl bg-darkblue-500 px-4 py-3 text-white shadow-md sm:py-3 md:gap-5 md:px-8 lg:flex lg:gap-8 lg:px-11">
            <div className="hidden w-[1.6rem] text-center font-normal sm:block">№</div>
            <div className="w-full max-w-[calc(100%-51px)] grow sm:w-auto sm:max-w-full md:w-[10rem] md:flex-shrink-0 md:grow">
              {t('Position')}
            </div>
            <div className="hidden w-[6.5rem] font-normal md:block md:flex-shrink-0">{t('Company')}</div>
            <div className="hidden font-normal md:block md:w-[115px] lg:w-[12.5rem]">{t('Interviews.date')}</div>
            <div className="hidden w-[6.25rem] text-center font-normal md:block">{t('Interviews.answers')}</div>
            <div className="w-[4.3rem]  text-center font-normal">{t('Result')}</div>
          </li>

          {interviews.map((item, index) => {
            const { time, date } = toFormatDate(item.createdAt);

            return (
              <li key={index} className={'mb-4 last:mb-0'}>
                <Link
                  href={`${ROUTES.interviews}/${item._id}`}
                  className="flex items-center gap-4 rounded-2xl bg-gray-10 px-4 py-2 text-default shadow-md hover:bg-gray-100 hover:text-default sm:py-4 md:flex-nowrap md:gap-5 md:p-0 md:px-8 lg:gap-8 lg:px-11"
                >
                  {/* number */}
                  <div className="hidden w-[1.6rem] flex-shrink-0 text-center sm:block md:py-4">{++index}</div>

                  {/* Job title */}
                  <div className="mr-auto w-full max-w-[calc(65%-51px)] grow font-bold sm:w-auto sm:max-w-full md:w-[10rem] md:flex-shrink-0 md:grow md:py-4">
                    <div className={'flex items-center gap-4'}>
                      <span className={'truncate'}>{item.jobTitle}</span>
                    </div>
                  </div>

                  {/* Company Name */}
                  <div className="w-[6.5rem] flex-shrink-0 md:py-4">
                    <div className={'flex items-center gap-2'}>
                      <span className={'flex-grow font-semibold'}>{item.companyName}</span>
                    </div>
                  </div>

                  {/* date */}
                  <div className="order-4 ml-auto hidden flex-shrink-0 sm:order-none sm:block sm:w-[156px] md:ml-0 md:py-4 lg:w-[12.5rem]">
                    <span className={'text-default/50'}>{isMounted && time}</span> {isMounted && date}
                  </div>

                  {/* answers */}
                  <div className="hidden flex-shrink-0 text-left md:block md:w-[4rem] md:py-4 md:text-center lg:w-[6.25rem]">
                    {`${
                      item.questions.filter((question) => question.answerIndex === question.answerUserIndex).length
                    } / ${item.questions.length}`}
                  </div>

                  <div className="flex-shrink-0 md:w-[4.3rem] md:py-4">
                    {item.passed ? (
                      <LikeIcon className={'mx-auto h-6 w-6 md:h-7 md:w-7'} />
                    ) : (
                      <ErrorIcon className={'mx-auto h-6 w-6 md:h-7 md:w-7'} />
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <Card className={'mx-auto max-w-2xl'}>
          <Chat>
            <>
              <p>You do not have any completed interviews yet.</p>
              <Link href={ROUTES.job_vacancy} className={'mt-6 inline-block'}>
                <Button size={'xs'} className={'btn-xs'} color={'primary'}>
                  Start new interview
                </Button>
              </Link>
            </>
          </Chat>
        </Card>
      )}
    </div>
  );
};

export default InterviewsPageByJobDesc;
