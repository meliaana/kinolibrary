import clsx from 'clsx';
import { PrimitiveButton } from '../PrimitiveButton';
import { PrimitiveInput } from '../PrimitiveInput';
import PrimitiveTooltip from '../PrimitiveTooltip/PrimitiveTooltip';
import styles from './OrderDetailsItemsItem.module.css';

type OrderDetailsItemsItemProps = {
  orderItemId: number;
  clipRef: string;
  timecodeIn: string;
  timecodeOut: string;
};

const OrderDetailsItemsItem = ({
  openedOrderId,
  setOpenedOrderId,
  orderClips,
}: {
  openedOrderId: any;
  setOpenedOrderId: (order: any) => void;
  orderClips: any;
}) => {
  if (!orderClips) return null;

  const updateClipRef = (value: string) => {};
  const updateTimecodeIn = (value: string) => {};
  const updateTimecodeOut = (value: string) => {};

  return (
    <div className={styles.wrapper}>
      {orderClips.map((orderClip: any) => (
        <PrimitiveButton
          key={orderClip.orderItemId}
          className={styles.item}
          onClick={() => setOpenedOrderId(orderClip.orderItemId)}
          data-active={openedOrderId === orderClip.orderItemId}
        >
          <div className={clsx(styles.itemContent, styles.clipRefContent)}>
            <PrimitiveTooltip content="Clip Reference">
              <span className={styles.clipRef}>Clip Reference</span>
            </PrimitiveTooltip>
            <PrimitiveInput
              value={orderClip.clipRef}
              onChange={updateClipRef}
              type="text"
            />
          </div>

          <div className={styles.itemContent}>
            <span className={styles.timecodeIn}>Timecode In</span>
            <PrimitiveInput
              value={orderClip.timecodeIn}
              onChange={updateTimecodeIn}
              type="text"
            />
          </div>
          <div className={styles.itemContent}>
            <span className={styles.timecodeOut}>Timecode Out</span>
            <PrimitiveInput
              value={orderClip.timecodeOut}
              onChange={updateTimecodeOut}
              type="text"
            />
          </div>
          <div className={styles.itemContent}>
            <PrimitiveTooltip content="Estimated Seconds">
              <span className={styles.timecodeOut}>Estimated Seconds</span>
            </PrimitiveTooltip>
            <PrimitiveInput type="text" value={0} isReadOnly={true} />
          </div>
        </PrimitiveButton>
      ))}
    </div>
  );
};

export default OrderDetailsItemsItem;
