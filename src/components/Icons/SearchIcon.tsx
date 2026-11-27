import { SVGProps } from 'react';
const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M15 15L12.1111 12.1111M12.1111 7.05556C12.1111 8.39637 11.5785 9.68227 10.6304 10.6304C9.68227 11.5785 8.39637 12.1111 7.05556 12.1111C5.71474 12.1111 4.42884 11.5785 3.48074 10.6304C2.53264 9.68227 2 8.39637 2 7.05556C2 5.71474 2.53264 4.42884 3.48074 3.48074C4.42884 2.53264 5.71474 2 7.05556 2C8.39637 2 9.68227 2.53264 10.6304 3.48074C11.5785 4.42884 12.1111 5.71474 12.1111 7.05556Z"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SearchIcon;
