import AngleLeftIcon from '@components/Icons/AngleLeftIcon';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import styles from './backLink.module.scss';

interface BackLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  beforeClick?: () => void;
  isArrow?: boolean;
}

const BackLink: FC<BackLinkProps> = ({ href, children, className, beforeClick, isArrow = true }) => {
  const classes = `${styles.root} ${className}`;
  const router = useRouter();

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (beforeClick) {
      e.preventDefault();
      await beforeClick();

      await router.push(href);
    }
  };

  return (
    <Link href={href} className={classes} onClick={handleClick}>
      {isArrow && <AngleLeftIcon className={styles.icon} />}
      {children}
    </Link>
  );
};

export default BackLink;
