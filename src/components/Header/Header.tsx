import { useRouteLoaderData } from 'react-router';
import { Logo } from '../Logo';
import { ToggleMenuButton } from '../ToggleMenuButton';
import { UserMenu } from '../UserMenu';
import styles from './Header.module.css';

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const data = useRouteLoaderData('client-root') as {
    user: { firstName: string; lastName: string; email: string };
  };

  return (
    <header className={styles.wrapper}>
      <ToggleMenuButton toggleSidebar={toggleSidebar} />
      <Logo />
      <div className={styles.userInfo}>
        {data.user.firstName} {data.user.lastName}
      </div>
      <UserMenu />
    </header>
  );
};

export default Header;
