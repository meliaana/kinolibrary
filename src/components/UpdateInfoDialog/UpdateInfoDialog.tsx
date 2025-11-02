import * as Dialog from '@radix-ui/react-dialog';
import { PropsWithChildren } from 'react';
import { Button } from '../Button';
import { EditIcon } from '../EditIcon';
import { XIcon } from '../XIcon';
import styles from './UpdateInfoDialog.module.css';

const UpdateInfoDialog = ({
  title,
  description,
  children,
}: PropsWithChildren<{ title: string; description: string }>) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className={styles.editButton}>
        <span className={styles.editIcon}>Edit</span>
        <EditIcon />
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.dialogOverlay} />
      <Dialog.Content className={styles.dialogContent}>
        <Dialog.Title className={styles.dialogTitle}>{title}</Dialog.Title>
        <Dialog.Description className={styles.dialogDescription}>
          {description}
        </Dialog.Description>
        {children}
        <div
          style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}
        >
          <Dialog.Close asChild>
            <Button className={styles.cancelButton}>Cancel</Button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <Button className={styles.saveButton}>Save changes</Button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <Button className={styles.closeButton} aria-label="Close">
            <XIcon />
          </Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default UpdateInfoDialog;
