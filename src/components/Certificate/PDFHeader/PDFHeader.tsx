import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { FC } from 'react';

const PDFStyles = StyleSheet.create({
  header: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: '24pt',
  },

  title: {
    fontFamily: 'Montserrat',
    fontWeight: 700,
    fontSize: '36pt',
    color: '#222831',
    textTransform: 'uppercase',
    marginBottom: '8pt',
  },

  subtitle: {
    fontFamily: 'Montserrat',
    fontSize: '24pt',
    textTransform: 'uppercase',
  },

  date: {
    fontFamily: 'Montserrat',
    fontSize: '10pt',
    fontWeight: 600,
    color: '#222831',
  },
});

const PDFHeader: FC<{ title: string; passedDate: string }> = ({ title, passedDate }) => {
  return (
    <View style={PDFStyles.header}>
      <Text style={PDFStyles.title}>{title}</Text>
      <Text style={PDFStyles.subtitle}>Certificate</Text>
      <Text style={PDFStyles.date}>Issued {passedDate}</Text>
    </View>
  );
};

export default PDFHeader;
