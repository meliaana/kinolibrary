import { PropsWithChildren } from 'react';
import styles from './IconButton.module.css';

const IconButton = ({
  icon,
  children,
}: PropsWithChildren<{ icon: React.ReactNode }>) => {
  return (
    <button className={styles.wrapper}>
      {/* <Icon icon={icon} /> */}
      {icon}
      {children}
    </button>
  );
};

export default IconButton;
