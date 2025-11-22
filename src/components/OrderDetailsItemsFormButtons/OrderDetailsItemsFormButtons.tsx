import { Button } from '../Button';
import { DeleteIcon } from '../DeleteIcon';
import styles from './OrderDetailsItemsFormButtons.module.css';

const OrderDetailsItemsFormButtons = ({
  onSave,
  onDelete,
  title,
}: {
  onSave: () => void;
  onDelete: () => void;
  title: string;
}) => {
  return (
    <div className={styles.buttonsContainer}>
      <h4 className={styles.title}>{title}</h4>

      <Button
        className={styles.saveChangesButton}
        variant="colored"
        onClick={onSave}
        type="submit"
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
