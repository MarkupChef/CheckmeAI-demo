import { StyleSheet, Text, View } from '@react-pdf/renderer';
import convertSecondsToTime from '@utils/helpers/convertMillisecondsToTime';
import { FC } from 'react';

const PDFStyles = StyleSheet.create({
  layout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  result: {
    fontFamily: 'Montserrat',
    fontWeight: 600,
    fontSize: '18pt',
    color: '#FF5722',
  },

  status: {
    fontFamily: 'Montserrat',
    fontSize: '12pt',
    color: '#205ad2',
    textAlign: 'right',
  },
});

const PDFAverageResult: FC<{ averageTimeForAnswer: number }> = ({ averageTimeForAnswer }) => {
  const averageTimeMin = convertSecondsToTime(averageTimeForAnswer, `m`);
  const averageTimeSec = convertSecondsToTime(averageTimeForAnswer, `ss`);
  const averageTime = `${averageTimeMin}m ${averageTimeSec}s`;

  let statusText = 'good';

  if (averageTimeForAnswer > 90) {
    statusText = 'unconfident';
    PDFStyles.status.color = '#ff0000';
  }

  if (averageTimeForAnswer < 30) {
    statusText = 'confident';
    PDFStyles.status.color = '#00cc2e';
  }

  return (
    <View style={PDFStyles.layout}>
      <View>
        <Text style={PDFStyles.result}>{averageTime}</Text>
      </View>
      <View>
        <Text style={PDFStyles.status}>{statusText}</Text>
      </View>
    </View>
  );
};

export default PDFAverageResult;
