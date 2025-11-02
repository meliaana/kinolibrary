import styles from './OrderDetailsItemsItem.module.css';

type OrderDetailsItemsItemProps = {
  orderItemId: number;
  clipRef: string;
  timecodeIn: string;
  timecodeOut: string;
};

const OrderDetailsItemsItem = ({
  orderItems,
}: {
  orderItems: OrderDetailsItemsItemProps[];
}) => {
  return (
    <div className={styles.wrapper}>
      {orderItems.map((orderItem) => (
        <div key={orderItem.orderItemId} className={styles.item}>
          <div className={styles.itemContent}>
            <span className={styles.clipRef}>Ref no</span>
            <input
              type="text"
              className={styles.timecodeIn}
              value={orderItem.timecodeIn}
            />
            <div className={styles.timecodeContainer}>
              <span className={styles.timecodeIn}>Timecode In</span>
              <input
                type="text"
                className={styles.timecodeOut}
                value={orderItem.timecodeOut}
              />
            </div>
            <div className={styles.timecodeContainer}>
              <span className={styles.timecodeOut}>Timecode Out</span>
              <input
                type="text"
                className={styles.timecodeOut}
                value={orderItem.timecodeOut}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderDetailsItemsItem;
