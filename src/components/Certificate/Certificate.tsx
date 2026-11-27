import PDFFooter from '@components/Certificate/PDFFooter';
import PDFHeader from '@components/Certificate/PDFHeader';
import PDFProfile from '@components/Certificate/PDFProfile';
import PDFResult from '@components/Certificate/PDFResult';
import PDFStamp from '@components/Certificate/PDFStamp';
import PDFStyles from '@components/Certificate/PDFStyles';
import PDFSummary from '@components/Certificate/PDFSummary';
import { Document, Link, Page, View } from '@react-pdf/renderer';
import { InterviewQuestion } from '@types';
import { DateTime } from 'luxon';
import { FC } from 'react';

export interface CertificateProps {
  date: string;
  topicName?: string;
  level?: string;
  userName: string;
  topicLogoBase64?: string | null;
  userImg?: string;
  result: number;
  questions: InterviewQuestion[];
  public_link?: string;
}

const Certificate: FC<CertificateProps> = ({
  date,
  topicName,
  level,
  userName,
  userImg,
  topicLogoBase64,
  result,
  questions,
  public_link,
}) => {
  const formattedDate = DateTime.fromISO(date).toFormat('dd.MM.yyyy');
  const title = `${level} ${topicName}`;

  return (
    <>
      <Document>
        <Page size="A4" style={PDFStyles.page}>
          <View style={PDFStyles.bgCircle1}></View>
          <View style={PDFStyles.bgCircle2}></View>
          <View style={PDFStyles.wrapper}>
            <PDFHeader title={title} passedDate={formattedDate} />
            <View style={PDFStyles.layout}>
              <View style={{ flex: '1 1 0%' }}>
                <PDFProfile userName={userName} userImg={userImg} />
              </View>
              <View style={{ flex: '0 1 0%', minWidth: '120pt' }}>
                <PDFResult result={result} />
              </View>
              <View style={{ flex: '1 1 100%' }}>
                <PDFSummary topicLogo={topicLogoBase64} topicName={topicName} level={level} questions={questions} />
              </View>
              <View style={{ flex: '1 0 100%' }}>
                <Link href={public_link} style={PDFStyles.link}>
                  Go to questions list
                </Link>
              </View>
            </View>
            <PDFFooter />
          </View>
          <PDFStamp />
        </Page>
      </Document>
    </>
  );
};

export default Certificate;
