import { useApiFetch } from '@/hooks/useApiFetch';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { AccountIcon } from '../AccountIcon';
import { ArrowIcon } from '../ArrowIcon';
import { DarkModeIcon } from '../DarkModeIcon';
import { LightModeIcon } from '../LightModeIcon';
import { SignOutIcon } from '../SignOutIcon';
import styles from './UserMenu.module.css';

const UserMenu = () => {
  const navigate = useNavigate();
  const apiFetch = useApiFetch();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const data = useRouteLoaderData('client-root') as {
    user: { firstName: string; lastName: string; email: string };
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    apiFetch('/api/logout', {
      method: 'POST',
    });
    navigate('/login');
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={styles.triggerButton} aria-label="Open user menu">
          <div className={styles.username}>{data.user.firstName}</div>
          <ArrowIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={styles.content}
          side="bottom"
          align="end"
          sideOffset={-8}
          alignOffset={0}
        >
          <span className={styles.userInfo}>{data.user.email}</span>
          <DropdownMenu.Item
            className={styles.dropdownMenuItem}
            onSelect={() => {
              navigate('/client/account');
            }}
          >
            <AccountIcon />
            <span className={styles.dropdownMenuItemText}>Edit profile</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className={styles.dropdownMenuItem}
            onSelect={() => {
              toggleDarkMode();
            }}
          >
            {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
            <span className={styles.dropdownMenuItemText}>
              {isDarkMode ? 'Light mode' : 'Dark mode'}
            </span>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className={styles.separator} />
          <DropdownMenu.Item
            className={styles.dropdownMenuItem}
            onSelect={handleSignOut}
          >
            <SignOutIcon />
            <span className={styles.dropdownMenuItemText}>Sign out</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
export default UserMenu;
