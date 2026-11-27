import { JSX, SVGAttributes } from 'react';

const SeniorIcon = (props: SVGAttributes<any>): JSX.Element => (
  <svg width={75} height={77} viewBox="0 0 75 77" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#clip0_1141_21)">
      <path
        d="M16.7139 45.3698L33.4198 55.791L25.0326 76.7623L16.8176 64.0944L0.500049 61.4588L16.7139 45.3698Z"
        fill="#007277"
      />
      <path
        d="M41.5986 55.8086L58.5656 45.2263L74.5482 61.46L59.1516 63.5199L49.6323 77.0001L41.5986 55.8086Z"
        fill="#007277"
      />
      <path
        d="M19.9748 6.60803L37.4768 1.04923L54.9788 6.60803L65.7829 21.144V39.098L54.9788 53.6339L37.4768 59.1927L19.9748 53.6339L9.17075 39.0979V21.144L19.9748 6.60803Z"
        fill="#007277"
        stroke="#FAFAFA"
        strokeWidth={2}
      />
      <path
        d="M49.9115 30.1209C49.9115 36.6987 44.4308 42.1854 37.4772 42.1854C30.5237 42.1854 25.043 36.6987 25.043 30.1209C25.043 23.5432 30.5237 18.0564 37.4772 18.0564C44.4308 18.0564 49.9115 23.5432 49.9115 30.1209Z"
        fill="#007277"
        stroke="#FAFAFA"
        strokeWidth={8}
      />
    </g>
    <defs>
      <clipPath id="clip0_1141_21">
        <rect width={74} height={77} fill="white" transform="translate(0.5)" />
      </clipPath>
    </defs>
  </svg>
);

export default SeniorIcon;
