import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { FC, ReactNode } from 'react';

const PDFStyles = StyleSheet.create({
  layout: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10pt',
    borderTop: '1pt solid #CBCBCB',
    paddingVertical: '12pt',
  },

  title: {
    fontFamily: 'Montserrat',
    fontWeight: 500,
    color: '#222831',
    fontSize: '18pt',
  },

  result: {
    fontFamily: 'Montserrat',
    fontWeight: 600,
    fontSize: '18pt',
    color: '#FF5722',
    textTransform: 'capitalize',
  },
});

interface RdfCertificateSummaryItemProps {
  title: ReactNode | string | number;
  result: ReactNode;
  icon?: ReactNode;
  resultColor?: { color: string };
}

const PDFSummaryItem: FC<RdfCertificateSummaryItemProps> = ({ title, result, icon, resultColor }) => {
  return (
    <View style={PDFStyles.layout}>
      {icon}
      <Text style={PDFStyles.title}>{title}:</Text>

      <View style={{ marginLeft: 'auto' }}>
        {typeof result === 'string' || typeof result === 'number' ? (
          <Text style={{ ...PDFStyles.result, ...resultColor }}>{result}</Text>
        ) : (
          result
        )}
      </View>
    </View>
  );
};

export default PDFSummaryItem;
