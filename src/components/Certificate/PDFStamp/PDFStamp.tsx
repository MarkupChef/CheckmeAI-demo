import { Image, StyleSheet } from '@react-pdf/renderer';

const PDFStyles = StyleSheet.create({
  stamp: {
    position: 'absolute',
    top: 'auto',
    bottom: '40pt',
    right: '30pt',
    width: '100pt',
    height: '100pt',
    transform: 'rotate(-35deg)',
  },
});

// eslint-disable-next-line jsx-a11y/alt-text
const PDFStamp = () => <Image style={PDFStyles.stamp} src={'/Proved.png'} />;
export default PDFStamp;
