import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountIcon } from '../AccountIcon';
import { ArrowIcon } from '../ArrowIcon';
import { DarkModeIcon } from '../DarkModeIcon';
import { LightModeIcon } from '../LightModeIcon';
import { SignOutIcon } from '../SignOutIcon';
import styles from './UserMenu.module.css';

const UserMenu = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={styles.triggerButton}
          aria-label="@TODO: Add aria-label"
        >
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
          <span className={styles.userInfo}>developer@kinolibrary.com</span>
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
            <span className={styles.dropdownMenuItemText}>Dark mode</span>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className={styles.separator} />
          <DropdownMenu.Item className={styles.dropdownMenuItem}>
            <SignOutIcon />
            <span className={styles.dropdownMenuItemText}>Sign out</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
export default UserMenu;
