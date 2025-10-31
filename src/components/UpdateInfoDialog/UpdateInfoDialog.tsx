import * as Dialog from '@radix-ui/react-dialog';
import { PropsWithChildren } from 'react';
import { ButtonWithIcon } from '../ButtonWithIcon';
import { EditIcon } from '../EditIcon';
import styles from './UpdateInfoDialog.module.css';

const UpdateInfoDialog = ({ children }: PropsWithChildren) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <ButtonWithIcon text="edit">
        <EditIcon />
      </ButtonWithIcon>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.dialogOverlay} />
      <Dialog.Content className={styles.dialogContent}>
        <Dialog.Title className={styles.dialogTitle}>
          Edit Personal Information
        </Dialog.Title>
        <Dialog.Description className={styles.dialogDescription}>
          Update your details to keep your profile up-to-date.
        </Dialog.Description>
        {children}
        <div
          style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}
        >
          <Dialog.Close asChild>
            <button className={styles.button}>Save changes</button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button className={styles.iconButton} aria-label="Close"></button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default UpdateInfoDialog;
