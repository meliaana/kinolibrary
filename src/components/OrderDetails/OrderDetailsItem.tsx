import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { OrderDetailsItemsDesc } from '../OrderDetailsItemsDesc';
import { OrderDetailsItemsItem } from '../OrderDetailsItemsItem';
import styles from './OrderDetails.module.css';

type OrderClip = {
  orderItemId: number;
  clipRef: string;
  timecodeIn: string;
  timecodeOut: string;
};

const OrderDetailsItem = ({ orderClips }: { orderClips: OrderClip[] }) => {
  const [openedOrderId, setOpenedOrderId] = useState<number | null>(null);

  const [localOrderClips, setLocalOrderClips] = useState<OrderClip[]>(
    orderClips ?? [],
  );

  useEffect(() => {
    setLocalOrderClips(orderClips ?? []);
  }, [orderClips]);

  if (!orderClips) return null;

  useEffect(() => {
    setOpenedOrderId(orderClips[0]?.orderItemId ?? null);
  }, [orderClips]);

  // helper: is this clip dirty compared to original?
  const isClipDirty = (clip: OrderClip) => {
    const original = orderClips.find((c) => c.orderItemId === clip.orderItemId);
    if (!original) return false;

    return (
      original.clipRef !== clip.clipRef ||
      original.timecodeIn !== clip.timecodeIn ||
      original.timecodeOut !== clip.timecodeOut
    );
  };

  const dirtyItem = localOrderClips.find(isClipDirty);
  const dirtyItemId = dirtyItem?.orderItemId ?? null;

  const handleItemClick = (orderItemId: number) => {
    if (dirtyItemId && dirtyItemId !== orderItemId) {
      toast.warning('You have unsaved changes!');
    }

    setOpenedOrderId(orderItemId);
  };

  return (
    <div className={styles.orderDetailsItemsContainer}>
      <div className={styles.orderDetailsItemsList}>
        {localOrderClips.map((orderClip) => (
          <OrderDetailsItemsItem
            key={orderClip.orderItemId}
            clipItemData={orderClip}
            isOpen={openedOrderId === orderClip.orderItemId}
            onClick={handleItemClick}
            setOrderClips={setLocalOrderClips}
            isDirty={
              orderClips.find((c) => c.orderItemId === orderClip.orderItemId)
                ?.clipRef !== orderClip.clipRef ||
              orderClips.find((c) => c.orderItemId === orderClip.orderItemId)
                ?.timecodeIn !== orderClip.timecodeIn ||
              orderClips.find((c) => c.orderItemId === orderClip.orderItemId)
                ?.timecodeOut !== orderClip.timecodeOut
            }
          />
        ))}
      </div>
      <OrderDetailsItemsDesc
        orderItemId={openedOrderId}
        isDirty={dirtyItemId === openedOrderId}
        onSave={() => {}}
        onCancel={() => {}}
      />
    </div>
  );
};

export default OrderDetailsItem;
