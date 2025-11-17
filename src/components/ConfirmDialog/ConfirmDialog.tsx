// ConfirmDialog.tsx
import { PrimitiveButton } from '../PrimitiveButton';
import styles from './ConfirmDialog.module.css';

function ConfirmDialog({
  open,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;

  return (
    <div className={styles.backdrop}>
      <div className={styles.dialog}>
        <p>You have unsaved changes. Continue?</p>

        <div className={styles.actions}>
          <PrimitiveButton onClick={onConfirm}>Continue</PrimitiveButton>
          <PrimitiveButton onClick={onCancel}>Cancel</PrimitiveButton>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
