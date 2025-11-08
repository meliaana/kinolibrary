import { useEffect, useState } from 'react';
import { OrderDetailsItemsDesc } from '../OrderDetailsItemsDesc';
import { OrderDetailsItemsItem } from '../OrderDetailsItemsItem';
import styles from './OrderDetails.module.css';

const OrderDetailsItem = ({ orderClips }: { orderClips: any }) => {
  const [openedOrderId, setOpenedOrderId] = useState<any>(
    orderClips[0]?.orderItemId ?? null,
  );

  if (!orderClips) return null;

  useEffect(() => {
    setOpenedOrderId(orderClips[0]?.orderItemId ?? null);
  }, [orderClips]);

  return (
    <div className={styles.orderDetailsItemsContainer}>
      <OrderDetailsItemsItem
        openedOrderId={openedOrderId}
        setOpenedOrderId={setOpenedOrderId}
        orderClips={orderClips}
      />
      <OrderDetailsItemsDesc orderItemId={openedOrderId} />
    </div>
  );
};

export default OrderDetailsItem;
