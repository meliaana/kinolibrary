import { useEffect, useRef, useState } from 'react';
import { OrderDetailsItemsItem } from '../OrderDetailsItemsItem';
import styles from './OrderDetails.module.css';

export type OrderClip = {
  orderItemId: number | null;
  clipId: string | null;
  clipRef: string;
  masterClipId: string | null;
  timecodeIn: string;
  timecodeOut: string;
  description: string;
  sourceUrl: string;
};

const OrderDetailsItem = ({
  orderClips,
  orderId,
}: {
  orderClips: OrderClip[];
  orderId: string;
}) => {
  const [localOrderClips, setLocalOrderClips] =
    useState<OrderClip[]>(orderClips);

  const [openedOrderId, setOpenedOrderId] = useState<number | null>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  if (!orderClips) return null;

  useEffect(() => {
    setLocalOrderClips(orderClips);
  }, [orderClips]);

  useEffect(() => {
    setOpenedOrderId(localOrderClips[0]?.orderItemId ?? null);
  }, [localOrderClips]);

  const handleItemClick = (orderItemId: number) => {
    setOpenedOrderId(orderItemId);
  };

  const handleItemDelete = (orderItemId: number) => {
    setLocalOrderClips(
      localOrderClips.filter((clip) => clip.orderItemId !== orderItemId),
    );
  };

  return (
    <>
      <div className={styles.orderDetailsItemsContainer}>
        <div className={styles.orderDetailsItemsList}>
          {localOrderClips.map((orderClip) => (
            <OrderDetailsItemsItem
              key={orderClip.orderItemId}
              clipItemData={orderClip}
              isOpen={openedOrderId === orderClip.orderItemId}
              setOpenedOrderId={setOpenedOrderId}
              onClick={handleItemClick}
              portalRef={portalRef}
              orderId={orderId}
              onItemDelete={handleItemDelete}
            />
          ))}
        </div>
        <div ref={portalRef} className={styles.portalContainer}></div>
      </div>
    </>
  );
};

export default OrderDetailsItem;
