import { PropsWithChildren } from 'react';
import styles from './MainContent.module.css';

const MainContent = ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.ordersHeader}>
        <h2 className={styles.ordersHeaderTitle}>{title}</h2>
      </div>
      <div className={styles.mainContent}> {children} </div>
    </div>
  );
};

export default MainContent;
