import clsx from 'clsx';
import { useState } from 'react';
import { Button } from '../Button';
import { DeleteIcon } from '../DeleteIcon';
import { OrderClip } from '../OrderDetails/OrderDetailsItem';
import { PrimitiveInput } from '../PrimitiveInput';
import { PrimitiveTooltip } from '../PrimitiveTooltip';
import styles from './OrderDetailsItemsDesc.module.css';

const OrderDetailsItemsDesc = ({
  orderItemId,
  onSave,
  onDelete,
  orderClip,
}: {
  orderItemId: number;
  orderClip: OrderClip;
  onSave: () => void;
  onDelete: () => void;
}) => {
  if (!orderItemId) return null;
  const [localOrderClip, setLocalOrderClip] = useState<OrderClip>(orderClip);

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
          value={orderItemId}
          onChange={(value) => {}}
          type="text"
        />
      </div>

      <div className={styles.itemContent}>
        <PrimitiveTooltip content="Source URL">
          <span className={styles.sourceUrl}>Source URL</span>
        </PrimitiveTooltip>

        <PrimitiveInput
          value={localOrderClip.sourceUrl}
          onChange={(value) => {
            setLocalOrderClip({ ...localOrderClip, sourceUrl: value });
          }}
          type="text"
        />
      </div>

      <div className={styles.itemContent}>
        <span className={styles.sourceUrl}>Description (optional)</span>
        <PrimitiveInput
          value={localOrderClip.description}
          onChange={(value) => {
            setLocalOrderClip({ ...localOrderClip, description: value });
          }}
          type="text"
        />
      </div>
    </div>
  );
};

export default OrderDetailsItemsDesc;
