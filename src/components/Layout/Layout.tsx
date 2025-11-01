// components/Layout.tsx
import clsx from 'clsx';
import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { AccountIcon } from '../AccountIcon';
import { Header } from '../Header';
import { OdersIcon } from '../OdersIcon';
import styles from './Layout.module.css';

function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = location.pathname.includes('orders') ? 'orders' : 'account';

  return (
    <div className={styles.layoutContainer}>
      <Header toggleSidebar={() => setIsOpen(!isOpen)} />
      <div className={styles.mainContainer}>
        <nav className={clsx(styles.sidebar, { [styles.open!]: isOpen })}>
          <NavLink
            to="/client/orders"
            data-active={isActive === 'orders'}
            className={clsx(styles.sidebarButton, {
              [styles.open!]: isOpen,
            })}
          >
            <OdersIcon />
            <span>Orders</span>
          </NavLink>

          <NavLink
            to="/client/account"
            data-active={isActive === 'account'}
            className={clsx(styles.sidebarButton, {
              [styles.open!]: isOpen,
            })}
          >
            <AccountIcon />
            <span>Account</span>
          </NavLink>
        </nav>

        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
