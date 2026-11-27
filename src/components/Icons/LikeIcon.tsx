import { JSX, SVGAttributes } from 'react';

const LikeIcon = (props: SVGAttributes<any>): JSX.Element => (
  <svg width="62" height="60" viewBox="0 0 62 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M17.9026 52.0909V27.5455H3V57H17.9026V51.1091C21.6283 55.0364 28.0861 57 33.302 57H49.4465C52.1786 57 54.6624 55.0364 55.1591 52.0909L58.8848 30.9818C59.6299 27.3 56.6494 25.0909 53.1721 25.0909H40.2565V8.89091C40.2565 5.7 37.0276 3 33.7987 3C30.5698 3 27.8377 5.7 27.8377 8.89091C27.8377 12.8182 26.5958 16.5 24.3604 19.6909L17.9026 27.0545"
      stroke="#1DDE6A"
      strokeWidth="6"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default LikeIcon;
