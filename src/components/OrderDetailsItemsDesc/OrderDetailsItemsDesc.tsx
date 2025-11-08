import clsx from 'clsx';
import { PrimitiveInput } from '../PrimitiveInput';
import { PrimitiveTooltip } from '../PrimitiveTooltip';
import styles from './OrderDetailsItemsDesc.module.css';

const OrderDetailsItemsDesc = ({ orderItemId }: { orderItemId: any }) => {
  if (!orderItemId) return null;

  return (
    <div className={styles.wrapper}>
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
          value={'URL (optional)'}
          onChange={(value) => {}}
          type="text"
        />
      </div>

      <div className={styles.itemContent}>
        <span className={styles.sourceUrl}>Description (optional)</span>
        <PrimitiveInput
          value={'Description (optional)'}
          onChange={(value) => {}}
          type="text"
        />
      </div>
    </div>
  );
};

export default OrderDetailsItemsDesc;
