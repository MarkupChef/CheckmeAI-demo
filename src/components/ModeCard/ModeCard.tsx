import { Card } from 'flowbite-react';
import { FC, ReactNode } from 'react';
import styles from './modeCard.module.scss';

interface ModeCardProps {
  name?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
}

const ModeCard: FC<ModeCardProps> = ({ name, title, subtitle, description, content, footer }) => {
  return (
    <Card className={styles.root}>
      {name && <header className={styles.header}>{name}</header>}

      {title && <div className={styles.title}>{title}</div>}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {description && <p className={styles.des}>{description}</p>}

      <div className={styles.content}>{content}</div>

      {footer && <footer>{footer}</footer>}
    </Card>
  );
};

export default ModeCard;
