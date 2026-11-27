import { Font, StyleSheet } from '@react-pdf/renderer';
import { Style } from '@react-pdf/types';

const BG_CIRCLE_SIZE = 1000;

Font.register({
  family: 'Montserrat',
  fonts: [
    {
      src: '/fonts/Montserrat-Regular.ttf',
      fontWeight: 400,
    },
    {
      src: '/fonts/Montserrat-Medium.ttf',
      fontWeight: 500,
    },
    {
      src: '/fonts/Montserrat-SemiBold.ttf',
      fontWeight: 600,
    },
    {
      src: '/fonts/Montserrat-Bold.ttf',
      fontWeight: 700,
    },
  ],
});

const PDFStyles = StyleSheet.create({
  page: {
    position: 'relative',
    backgroundColor: '#ffffff',
  },
  wrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    paddingHorizontal: '64pt',
    paddingTop: '32pt',
    paddingBottom: '20pt',
  },
  bgCircle1: {
    position: 'absolute',
    bottom: '300pt',
    left: '50%',
    transform: `translateX(${-BG_CIRCLE_SIZE / 2}pt)`,
    width: `${BG_CIRCLE_SIZE}pt`,
    height: `${BG_CIRCLE_SIZE}pt`,
    borderRadius: '50%',
    backgroundColor: '#13b1b6',
  },
  bgCircle2: {
    position: 'absolute',
    bottom: '200pt',
    left: '50%',
    transform: `translateX(${-BG_CIRCLE_SIZE / 2}pt)`,
    width: `${BG_CIRCLE_SIZE}pt`,
    height: `${BG_CIRCLE_SIZE}pt`,
    borderRadius: '50%',
    backgroundColor: 'rgba(19, 177, 182, 0.5)',
  },

  layout: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '20pt',
  },

  link: {
    color: '#FF5722',
    textAlign: 'center',
  },
});

export const PDFCardStyles: Style = {
  padding: '16pt',
  backgroundColor: '#FAFAFA',
  borderRadius: '15pt',
};

export const PDFIconStyles = {
  width: '24pt',
  height: '24pt',
};

export default PDFStyles;
