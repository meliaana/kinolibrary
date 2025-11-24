import { useEffect, useRef, useState } from 'react';
import { OrderDetailsItemsItem } from '../OrderDetailsItemsItem';
import { PrimitiveButton } from '../PrimitiveButton';
import styles from './OrderDetails.module.css';

export type OrderClip = {
  orderItemId: number | null;
  clipId: number | null;
  clipRef: string;
  masterClipId: number | null;
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

  const [newOrderClip, setNewOrderClip] = useState<OrderClip | null>(null);

  const [openedOrderId, setOpenedOrderId] = useState<number | null>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  if (!orderClips) return null;

  useEffect(() => {
    setLocalOrderClips(orderClips);
  }, [orderClips]);

  useEffect(() => {
    setOpenedOrderId(localOrderClips[0]?.orderItemId ?? null);
  }, [localOrderClips]);

  const handleItemClick = (orderItemId: number | null) => {
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
              onSave={(clipItemData: OrderClip) => {
                const updatedClips = localOrderClips.map((clip) =>
                  clip.orderItemId === clipItemData.orderItemId
                    ? clipItemData
                    : clip,
                );
                setLocalOrderClips(updatedClips);
              }}
            />
          ))}
          {newOrderClip ? (
            <OrderDetailsItemsItem
              clipItemData={newOrderClip}
              isOpen={openedOrderId === null}
              setOpenedOrderId={setOpenedOrderId}
              onClick={handleItemClick}
              portalRef={portalRef}
              orderId={orderId}
              onItemDelete={() => {
                setNewOrderClip(null);
                setOpenedOrderId(localOrderClips[0]?.orderItemId ?? null);
              }}
              onSave={(savedClip: OrderClip) => {
                setLocalOrderClips((prev) => [...prev, savedClip]);
                setNewOrderClip(null);
                if (savedClip.orderItemId != null) {
                  setOpenedOrderId(savedClip.orderItemId);
                } else {
                  setOpenedOrderId(localOrderClips[0]?.orderItemId ?? null);
                }
              }}
            />
          ) : (
            <PrimitiveButton
              className={styles.addItemButton}
              onClick={() => {
                setNewOrderClip({
                  orderItemId: null,
                  clipId: null,
                  clipRef: '',
                  masterClipId: null,
                  timecodeIn: '',
                  timecodeOut: '',
                  description: '',
                  sourceUrl: '',
                });
                setOpenedOrderId(null);
              }}
            >
              + Add Clip
            </PrimitiveButton>
          )}
        </div>
        <div ref={portalRef} className={styles.portalContainer}></div>
      </div>
    </>
  );
};

export default OrderDetailsItem;
