import { FC, ReactNode } from 'react';

interface MobileNavItemProps {
  title: string;
  icon: ReactNode;
}

const MobileNavItem: FC<MobileNavItemProps> = ({ title, icon }) => {
  return (
    <div className={'flex flex-col items-center gap-1 text-center'}>
      <div className={'text-[1.75rem]'}>{icon}</div>
      <span className={'whitespace-nowrap text-xs font-medium'}>{title}</span>
    </div>
  );
};

export default MobileNavItem;
