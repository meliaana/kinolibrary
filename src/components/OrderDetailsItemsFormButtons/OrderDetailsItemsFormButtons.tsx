import { Button } from '../Button';
import { DeleteIcon } from '../DeleteIcon';
import styles from './OrderDetailsItemsFormButtons.module.css';

const OrderDetailsItemsFormButtons = ({
  onSave,
  onDelete,
}: {
  onSave: () => void;
  onDelete: () => void;
}) => {
  return (
    <div className={styles.buttonsContainer}>
      <Button
        className={styles.saveChangesButton}
        variant="colored"
        onClick={onSave}
      >
        Save Changes
      </Button>
      <Button className={styles.deleteItemButton} onClick={onDelete}>
        <DeleteIcon />
      </Button>
    </div>
  );
};

export default OrderDetailsItemsFormButtons;
