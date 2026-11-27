import PDFAverageResult from '@components/Certificate/PDFAverageResult';
import { PDFCardStyles } from '@components/Certificate/PDFStyles';
import RDFCertificateSummaryItem from '@components/Certificate/PDFSummaryItem/PDFSummaryItem';
import PDFBadgeCheckIcon from '@components/Icons/PDFicons/PDFBadgeCheckIcon';
import PDFClockIcon from '@components/Icons/PDFicons/PDFClockIcon';
import PDFCloseIcon from '@components/Icons/PDFicons/PDFCloseIcon';
import PDFQuestionIcon from '@components/Icons/PDFicons/PDFQuestionIcon';
import { Image, StyleSheet, Text, View } from '@react-pdf/renderer';
import { InterviewQuestion } from '@types';
import convertSecondsToTime from '@utils/helpers/convertMillisecondsToTime';
import { FC } from 'react';

const PDFStyles = StyleSheet.create({
  card: PDFCardStyles,

  header: {
    display: 'flex',
    flexDirection: 'row',
    gap: '12pt',
    alignItems: 'center',
    marginBottom: '12pt',
  },

  topicLogo: {
    width: '30pt',
    height: '30pt',
  },

  summaryTitle: {
    fontFamily: 'Montserrat',
    fontWeight: 600,
    color: '#222831',
    fontSize: '22pt',
  },
});

interface PDFSummaryProps {
  topicLogo?: string | null;
  topicName?: string;
  level?: string;
  questions: InterviewQuestion[];
}

const PDFSummary: FC<PDFSummaryProps> = ({ topicLogo, topicName, level, questions }) => {
  const totalQuestions = questions.length;
  const correctAnswers = questions.filter((question) => question.answerIndex === question.answerUserIndex).length;
  const incorrectAnswers = totalQuestions - correctAnswers;
  // calculate all dataTime of all questions by reduce
  const totalDuration = questions.reduce((acc, question) => acc + question.answerTime, 0);
  // calculate average time for answer
  const averageTimeForAnswer = Math.floor(totalDuration / totalQuestions);

  return (
    <View style={PDFStyles.card}>
      <View style={PDFStyles.header}>
        {topicLogo && (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image src={topicLogo} style={PDFStyles.topicLogo} />
        )}
        <Text style={PDFStyles.summaryTitle}>Summary of the interview:</Text>
      </View>
      {topicName && <RDFCertificateSummaryItem title={'Topic'} result={topicName} resultColor={{ color: '#007277' }} />}
      {level && <RDFCertificateSummaryItem title={'Level'} result={level} resultColor={{ color: '#007277' }} />}
      <RDFCertificateSummaryItem title={'Number of questions'} result={totalQuestions} icon={<PDFQuestionIcon />} />
      <RDFCertificateSummaryItem title={'Correct answers'} result={correctAnswers} icon={<PDFBadgeCheckIcon />} />
      <RDFCertificateSummaryItem title={'Incorrect answers'} result={incorrectAnswers} icon={<PDFCloseIcon />} />
      <RDFCertificateSummaryItem
        title={'Interview duration'}
        result={convertSecondsToTime(totalDuration, 'hh:mm:ss')}
        icon={<PDFClockIcon />}
      />
      <RDFCertificateSummaryItem title={'Time for an answer'} result={'2 min'} icon={<PDFClockIcon />} />
      <RDFCertificateSummaryItem
        title={'Average time for answer'}
        result={<PDFAverageResult averageTimeForAnswer={averageTimeForAnswer} />}
        icon={<PDFClockIcon />}
      />
    </View>
  );
};

export default PDFSummary;
