import { LogoIcon } from '../LogoIcon';
import styles from './Logo.module.css';

const Logo = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>
        <LogoIcon />
      </div>
      <span className={styles.text}>KinoLibrary</span>
    </div>
  );
};

export default Logo;
