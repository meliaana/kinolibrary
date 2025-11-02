import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styles from './DropDown.module.css';

const DropDown = (items: string[]) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={styles.triggerButton}
          aria-label="@TODO: Add aria-label"
        ></button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={styles.content}
          side="bottom"
          align="center"
          sideOffset={-8}
          alignOffset={0}
        >
          {items.map((item) => (
            <DropdownMenu.Item className={styles.dropdownMenuItem}>
              {item}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropDown;
