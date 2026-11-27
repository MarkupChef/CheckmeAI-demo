import { PDFIconStyles } from '@components/Certificate/PDFStyles';
import { Path, Svg } from '@react-pdf/renderer';

const PDFQuestionIcon = () => {
  return (
    <Svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" style={PDFIconStyles}>
      <Path
        fill-rule="evenodd"
        d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm9-3a1.5 1.5 0 0 1 2.5 1.1 1.4 1.4 0 0 1-1.5 1.5 1 1 0 0 0-1 1V14a1 1 0 1 0 2 0v-.5a3.4 3.4 0 0 0 2.5-3.3 3.5 3.5 0 0 0-7-.3 1 1 0 0 0 2 .1c0-.4.2-.7.5-1Zm1 7a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z"
        clip-rule="evenodd"
        fill="#007277"
      />
    </Svg>
  );
};

export default PDFQuestionIcon;
