import { JSX, SVGAttributes } from 'react';

const JuniorIcon = (props: SVGAttributes<any>): JSX.Element => (
  <svg width={56} height={77} viewBox="0 0 56 77" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#clip0_1141_203)">
      <path d="M12.2617 44.9167H43.9284V77.0001L28.0951 67.6099L12.2617 77.0001V44.9167Z" fill="#007277" />
      <path
        d="M54.6905 27.9584C54.6905 42.8594 42.7711 54.9167 28.0952 54.9167C13.4194 54.9167 1.5 42.8594 1.5 27.9584C1.5 13.0573 13.4194 1 28.0952 1C42.7711 1 54.6905 13.0573 54.6905 27.9584Z"
        fill="#007277"
        stroke="#FAFAFA"
        strokeWidth={2}
      />
      <ellipse cx={28.5} cy={28.3686} rx={14} ry={14.1842} fill="#FAFAFA" />
    </g>
    <defs>
      <clipPath id="clip0_1141_203">
        <rect width={55} height={77} fill="white" transform="translate(0.5)" />
      </clipPath>
    </defs>
  </svg>
);

export default JuniorIcon;
