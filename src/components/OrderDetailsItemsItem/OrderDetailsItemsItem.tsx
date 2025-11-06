import clsx from 'clsx';
import styles from './OrderDetailsItemsItem.module.css';

type OrderDetailsItemsItemProps = {
  orderItemId: number;
  clipRef: string;
  timecodeIn: string;
  timecodeOut: string;
};

const OrderDetailsItemsItem = ({ orderClips }: { orderClips: any }) => {
  if (!orderClips) return null;

  const updateClipRef = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const updateTimecodeIn = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const updateTimecodeOut = (e: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <div className={styles.wrapper}>
      {orderClips.map((orderClip: any) => (
        <div key={orderClip.orderItemId} className={styles.item}>
          <div className={clsx(styles.itemContent, styles.clipRefContent)}>
            <span className={styles.clipRef}>Ref no</span>
            <input
              type="text"
              className={clsx(styles.input)}
              value={orderClip.clipRef}
              onChange={updateClipRef}
            />
          </div>

          <div className={styles.itemContent}>
            <span className={styles.timecodeIn}>Timecode In</span>
            <input
              type="text"
              className={styles.input}
              value={orderClip.timecodeIn}
              onChange={updateTimecodeIn}
            />
          </div>
          <div className={styles.itemContent}>
            <span className={styles.timecodeOut}>Timecode Out</span>
            <input
              type="text"
              className={styles.input}
              value={orderClip.timecodeOut}
              onChange={updateTimecodeOut}
            />
          </div>
          <div className={styles.itemContent}>
            <span className={styles.timecodeOut}>Estimated Seconds</span>
            <input type="text" className={styles.input} value={0} readOnly />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderDetailsItemsItem;
