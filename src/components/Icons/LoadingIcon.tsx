import { SVGProps } from 'react';

const LoadingIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    style={{
      margin: 'auto',
      background: 'transparent',
      display: 'block',
      shapeRendering: 'auto',
    }}
    width={props.fontSize ? '1em' : '65px'}
    height={props.fontSize ? '1em' : '65px'}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    {...props}
  >
    <g transform="translate(50,50)">
      <circle cx={0} cy={0} r={50} fill="#222831" />
      <circle cx={0} cy={-25} r={15} fill="#ffffff">
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="1s"
          repeatCount="indefinite"
          keyTimes="0;1"
          values="0 0 0;360 0 0"
        />
      </circle>
    </g>
  </svg>
);
export default LoadingIcon;
