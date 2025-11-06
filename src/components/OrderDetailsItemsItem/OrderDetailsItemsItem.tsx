import clsx from 'clsx';
import styles from './OrderDetailsItemsItem.module.css';

type OrderDetailsItemsItemProps = {
  orderItemId: number;
  clipRef: string;
  timecodeIn: string;
  timecodeOut: string;
};

function formatTimecode(input: string) {
  const digits = input.replace(/\D/g, '');
  const timeDigits = digits.slice(-8).padStart(8, '0');

  const hours = timeDigits.slice(0, 2);
  const minutes = timeDigits.slice(2, 4);
  const seconds = timeDigits.slice(4, 6);
  const frames = timeDigits.slice(6, 8);

  return `${hours}:${minutes}:${seconds}:${frames}`;
}

const OrderDetailsItemsItem = ({ orderClips }: { orderClips: any }) => {
  if (!orderClips) return null;

  return (
    <div className={styles.wrapper}>
      {orderClips.map((orderClip: any) => (
        <div key={orderClip.id} className={styles.item}>
          <div className={clsx(styles.itemContent, styles.clipRefContent)}>
            <span className={styles.clipRef}>Ref no</span>
            <input
              type="text"
              className={clsx(styles.input)}
              value={orderClip.clipRef}
            />
          </div>

          <div className={styles.itemContent}>
            <span className={styles.timecodeIn}>Timecode In</span>
            <input
              type="text"
              className={styles.input}
              value={formatTimecode(orderClip.timecodeOut)}
            />
          </div>
          <div className={styles.itemContent}>
            <span className={styles.timecodeOut}>Timecode Out</span>
            <input
              type="text"
              className={styles.input}
              value={formatTimecode(orderClip.timecodeOut)}
            />
          </div>
          <div className={styles.itemContent}>
            <span className={styles.timecodeOut}>Estimated Seconds</span>
            <input type="text" className={styles.input} value={0} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderDetailsItemsItem;
