import { FC, ReactNode } from 'react';

interface AboveTitleProps {
  children: ReactNode;
}

const AboveTitle: FC<AboveTitleProps> = ({ children }) => {
  return <div className="text-base font-semibold capitalize text-default/70 md:text-lg 2xl:text-xl">{children}</div>;
};

export default AboveTitle;
