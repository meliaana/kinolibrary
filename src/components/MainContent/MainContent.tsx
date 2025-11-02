import { PropsWithChildren } from 'react';
import { Breadcrumbs } from '../Breadcrumbs';
import styles from './MainContent.module.css';

const MainContent = ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <Breadcrumbs />
      </div>
      <div className={styles.mainContent}> {children} </div>
    </div>
  );
};

export default MainContent;
