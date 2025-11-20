import * as Dialog from '@radix-ui/react-dialog';
import { PropsWithChildren } from 'react';
import { Button } from '../Button';
import { PrimitiveButton } from '../PrimitiveButton';
import { XIcon } from '../XIcon';
import styles from './PrimitiveDialog.module.css';

const PrimitiveDialog = ({
  title,
  description,
  children,
  trigger,
  open,
  onOpenChange,
}: PropsWithChildren<{
  title: string;
  description: string;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}>) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
    <Dialog.Portal>
      <Dialog.Overlay className={styles.dialogOverlay} />
      <Dialog.Content className={styles.dialogContent}>
        <Dialog.Title className={styles.dialogTitle}>{title}</Dialog.Title>
        <Dialog.Description className={styles.dialogDescription}>
          {description}
        </Dialog.Description>
        <div
          style={{
            display: 'flex',
            marginTop: 25,
            justifyContent: 'flex-end',
            gap: 10,
          }}
        >
          <Dialog.Close asChild>
            <Button className={styles.cancelButton}>Close</Button>
          </Dialog.Close>

          {children}
        </div>
        <Dialog.Close asChild>
          <PrimitiveButton className={styles.closeButton} aria-label="Close">
            <XIcon />
          </PrimitiveButton>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default PrimitiveDialog;
