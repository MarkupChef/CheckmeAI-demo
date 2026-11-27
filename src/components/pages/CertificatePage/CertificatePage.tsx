'use client';

import LoadingIcon from '@components/Icons/LoadingIcon';
import { Interview, Topic } from '@types';
import { NEXT_PUBLIC_URL } from '@utils/constants/environments';
import { ROUTES } from '@utils/constants/routes';
import { getPercentCorrectAnswers } from '@utils/getPercentCorrectAnswers';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { FC } from 'react';

// react-pdf can create documents only in the browser
const CertificateDownloadLink = dynamic(() => import('@components/CertificateDownloadLink'), {
  ssr: false,
  loading: () => <LoadingIcon fontSize={'40px'} />,
});

export interface CertificatePageProps {
  interview: Interview;
  topic: Topic | null;
  topicLogoBase64: string | null;
}

const CertificatePage: FC<CertificatePageProps> = ({ interview, topic, topicLogoBase64 }) => {
  const { data } = useSession();
  const topicName = topic?.name;
  const date = interview.createdAt;
  const level = interview.level;
  const userImg = data?.user?.image || undefined;
  const userName = data?.user?.name as string;
  const questions = interview.questions;
  const result = getPercentCorrectAnswers(questions);
  const fileName = `${userName}_${level}_${topicName}.pdf`;
  const public_hash = interview.public_hash;
  const public_link = `${NEXT_PUBLIC_URL}${ROUTES.public_interview_result}/?hash=${public_hash}`;

  return (
    <>
      {/* TODO: for view */}
      {/* <PDFViewer height={1300}>
        <Certificate
          date={date}
          level={level}
          topicName={topicName}
          userName={userName}
          userImg={userImg}
          topicLogoBase64={topicLogoBase64}
          result={result}
          questions={questions}
          public_link={public_link}
        />
      </PDFViewer>*/}

      <CertificateDownloadLink
        date={date}
        level={level}
        topicName={topicName}
        userName={userName}
        userImg={userImg}
        topicLogoBase64={topicLogoBase64}
        result={result}
        questions={questions}
        public_link={public_link}
        fileName={fileName}
      />
    </>
  );
};

export default CertificatePage;
