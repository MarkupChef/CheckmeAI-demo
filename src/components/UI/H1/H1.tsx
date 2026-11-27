import { FC, HTMLAttributes, ReactNode } from 'react';

type H1Props = {
  children: ReactNode;
} & HTMLAttributes<HTMLHeadingElement>;

const H1: FC<H1Props> = ({ children, ...props }) => {
  return (
    <h1
      className={`mb-[0.8em] mt-0 text-center text-[2.3rem] font-bold leading-tight dark:text-white lg:text-5xl`}
      {...props}
    >
      {children}
    </h1>
  );
};

export default H1;
