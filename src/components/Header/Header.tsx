import { Logo } from '../Logo';
import { ToggleMenuButton } from '../ToggleMenuButton';
import { UserMenu } from '../UserMenu';
import styles from './Header.module.css';

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <header className={styles.wrapper}>
      <ToggleMenuButton toggleSidebar={toggleSidebar} />
      <Logo />
      <UserMenu />
    </header>
  );
};

export default Header;
