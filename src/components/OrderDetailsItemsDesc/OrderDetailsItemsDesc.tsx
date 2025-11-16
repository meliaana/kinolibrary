import clsx from 'clsx';
import { Button } from '../Button';
import { DeleteIcon } from '../DeleteIcon';
import { updateField } from '../OrderDetails/OrderDetails.helpers';
import { OrderClip } from '../OrderDetails/OrderDetailsItem';
import { PrimitiveInput } from '../PrimitiveInput';
import { PrimitiveTooltip } from '../PrimitiveTooltip';
import styles from './OrderDetailsItemsDesc.module.css';

const OrderDetailsItemsDesc = ({
  onSave,
  onDelete,
  orderClip,
  setOrderClips,
}: {
  orderClip: OrderClip | undefined;
  setOrderClips: React.Dispatch<React.SetStateAction<OrderClip[]>>;
  onSave: () => void;
  onDelete: () => void;
}) => {
  if (!orderClip) return null;

  const updateClipRef = (value: string) => {
    updateField('clipRef', value, setOrderClips, orderClip);
  };

  const updateSourceUrl = (value: string) => {
    updateField('sourceUrl', value, setOrderClips, orderClip);
  };

  const updateDescription = (value: string) => {
    updateField('description', value, setOrderClips, orderClip);
  };

  return (
    <div className={styles.wrapper}>
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
      <div className={clsx(styles.itemContent, styles.clipRefContent)}>
        <PrimitiveTooltip content="Clip Name or Title">
          <span className={styles.clipRef}>Clip Name or Title</span>
        </PrimitiveTooltip>
        <PrimitiveInput
          value={orderClip.orderItemId}
          onChange={(value) => {
            updateClipRef(value);
          }}
          type="text"
        />
      </div>

      <div className={styles.itemContent}>
        <PrimitiveTooltip content="Source URL">
          <span className={styles.sourceUrl}>Source URL</span>
        </PrimitiveTooltip>

        <PrimitiveInput
          value={orderClip.sourceUrl}
          onChange={(value) => {
            updateSourceUrl(value);
          }}
          type="text"
        />
      </div>

      <div className={styles.itemContent}>
        <span className={styles.sourceUrl}>Description (optional)</span>
        <PrimitiveInput
          value={orderClip.description}
          onChange={(value) => {
            updateDescription(value);
          }}
          type="text"
        />
      </div>
    </div>
  );
};

export default OrderDetailsItemsDesc;
