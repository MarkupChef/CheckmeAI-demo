import { SVGProps } from 'react';
const LevelStepsLine = (props: SVGProps<SVGSVGElement>) => (
  <svg width={30} height={380} viewBox="0 0 41 524" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M34.9296 20.8667C34.9296 28.7452 28.5428 35.132 20.6643 35.132C12.7858 35.132 6.39902 28.7452 6.39902 20.8667C6.39902 12.9882 12.7858 6.60142 20.6643 6.60142C28.5428 6.60142 34.9296 12.9882 34.9296 20.8667Z"
      stroke="#FCFFFF"
      strokeWidth={12.0129}
    />
    <circle cx={20.6643} cy={261.875} r={14.2653} stroke="#FCFFFF" strokeWidth={12.0129} />
    <path
      d="M20.6641 59.158L20.6641 130.863L20.6641 223.584"
      stroke="#FCFFFF"
      strokeWidth={3.75403}
      strokeLinecap="round"
      strokeDasharray="7.51 7.51"
    />
    <path
      d="M20.6641 300.167L20.6641 371.871L20.6641 464.593"
      stroke="#FCFFFF"
      strokeWidth={3.75403}
      strokeLinecap="round"
      strokeDasharray="7.51 7.51"
    />
    <circle cx={20.6643} cy={502.884} r={14.2653} stroke="#FCFFFF" strokeWidth={12.0129} />
  </svg>
);
export default LevelStepsLine;
