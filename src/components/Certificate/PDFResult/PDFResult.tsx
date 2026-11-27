import { PDFCardStyles } from '@components/Certificate/PDFStyles';
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { FC } from 'react';

const PDFStyles = StyleSheet.create({
  card: PDFCardStyles,

  resultPercent: {
    fontFamily: 'Montserrat',
    fontWeight: 600,
    fontSize: '40pt',
    color: '#FF5722',
    textAlign: 'center',
    marginBottom: '4pt',
  },

  resultText: {
    fontFamily: 'Montserrat',
    fontSize: '10pt',
    textAlign: 'center',
    color: '#222831',
    fontWeight: 500,
  },
});

const PDFResult: FC<{ result: number }> = ({ result }) => {
  return (
    <View style={{ ...PDFStyles.card, height: '85pt' }}>
      <Text style={PDFStyles.resultPercent}>{result}%</Text>
      <Text style={PDFStyles.resultText}>Interview result</Text>
    </View>
  );
};

export default PDFResult;
