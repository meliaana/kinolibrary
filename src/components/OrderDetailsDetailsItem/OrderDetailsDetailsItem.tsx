import { PropsWithChildren } from 'react';
import styles from './OrderDetailsDetailsItem.module.css';

const OrderDetailsDetailsItem = ({
  title,
  children,
  isReadOnly = false,
}: PropsWithChildren<{
  title: string;
  isReadOnly?: boolean;
}>) => {
  return (
    <div className={styles.wrapper} data-readonly={isReadOnly}>
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.propertyItems}>{children}</div>
    </div>
  );
};

export default OrderDetailsDetailsItem;
