import { useEffect, useRef, useState } from 'react';
import { OrderDetailsItemsItem } from '../OrderDetailsItemsItem';
import { PrimitiveButton } from '../PrimitiveButton';
import { PrimitiveDialog } from '../PrimitiveDialog';
import styles from './OrderDetails.module.css';

export type OrderClip = {
  orderItemId: number;
  clipRef: string;
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
  const [openedOrderId, setOpenedOrderId] = useState<number | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const portalRef = useRef<HTMLDivElement>(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [pendingOpenId, setPendingOpenId] = useState<number | null>(null);
  const [resetSignal, setResetSignal] = useState(false);

  if (!orderClips) return null;

  useEffect(() => {
    setOpenedOrderId(orderClips[0]?.orderItemId ?? null);
  }, [orderClips]);

  const handleItemClick = (orderItemId: number) => {
    if (isDirty && openedOrderId !== orderItemId) {
      setPendingOpenId(orderItemId);
      setShowConfirm(true);
      return;
    }

    setOpenedOrderId(orderItemId);
  };

  const handleConfirm = () => {
    if (pendingOpenId !== null) {
      setOpenedOrderId(pendingOpenId);
    }
    setShowConfirm(false);
    setPendingOpenId(null);
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setPendingOpenId(null);
  };

  const handleDiscard = () => {
    setShowConfirm(false);
    setPendingOpenId(null);
    setResetSignal(true);
  };

  return (
    <>
      <div className={styles.orderDetailsItemsContainer}>
        <div className={styles.orderDetailsItemsList}>
          {orderClips.map((orderClip) => (
            <OrderDetailsItemsItem
              key={orderClip.orderItemId}
              clipItemData={orderClip}
              isOpen={openedOrderId === orderClip.orderItemId}
              onClick={handleItemClick}
              portalRef={portalRef}
              setIsDirty={setIsDirty}
              resetSignal={resetSignal}
              setResetSignal={setResetSignal}
            />
          ))}

          <PrimitiveButton className={styles.addItemButton} onClick={() => {}}>
            + Add Item
          </PrimitiveButton>
        </div>
        <div ref={portalRef} className={styles.portalContainer}></div>
        <PrimitiveDialog
          open={showConfirm}
          onOpenChange={setShowConfirm}
          title="Unsaved Changes"
          description="You have unsaved changes. Do you want to discard or save them?"
          onSave={handleConfirm}
          onDiscard={handleDiscard}
          onClose={handleCancel}
        />
      </div>
    </>
  );
};

export default OrderDetailsItem;
