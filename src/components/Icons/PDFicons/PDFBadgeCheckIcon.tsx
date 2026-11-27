import { PDFIconStyles } from '@components/Certificate/PDFStyles';
import { Path, Svg } from '@react-pdf/renderer';
const PDFBadgeCheckIcon = (props: any) => (
  <Svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" style={PDFIconStyles} {...props}>
    <Path
      fill-rule="evenodd"
      d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm13.7-1.3a1 1 0 0 0-1.4-1.4L11 12.6l-1.8-1.8a1 1 0 0 0-1.4 1.4l2.5 2.5c.4.4 1 .4 1.4 0l4-4Z"
      clip-rule="evenodd"
      fill={'#007277'}
    />
  </Svg>
);
export default PDFBadgeCheckIcon;
