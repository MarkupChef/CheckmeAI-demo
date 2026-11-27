import { PDFIconStyles } from '@components/Certificate/PDFStyles';
import { Path, Svg } from '@react-pdf/renderer';
const PDFCloseIcon = (props: any) => (
  <Svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" style={PDFIconStyles} {...props}>
    <Path
      fill-rule="evenodd"
      d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
      clip-rule="evenodd"
      fill={'#007277'}
    />
  </Svg>
);
export default PDFCloseIcon;
