import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { OrderDetailsItemsItem } from '../OrderDetailsItemsItem';
import { PrimitiveButton } from '../PrimitiveButton';
import { PrimitiveDialog } from '../PrimitiveDialog';
import { deleteClip } from './OrderDetails.helpers';
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

  const [newOrderClip, setNewOrderClip] = useState<OrderClip | null>(null);

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
    setResetSignal(true);

    if (pendingOpenId !== null) {
      setOpenedOrderId(pendingOpenId);
    }
    setShowConfirm(false);
    setPendingOpenId(null);
  };

  const handleDelete = async () => {
    if (openedOrderId == null) return;
    try {
      await deleteClip(orderId, openedOrderId);

      toast.success('Clip deleted successfully');

      if (openedOrderId === openedOrderId) {
        const remaining = orderClips.filter(
          (clip) => clip.orderItemId !== openedOrderId,
        );
        setOpenedOrderId(remaining[0]?.orderItemId ?? null);
      }
    } catch (error) {
      console.error('Error deleting clip:', error);
      toast.error('Failed to delete clip');
    }
  };

  const handleConfirmDelete = async () => {
    await handleDelete();
    setShowDelete(false);
  };

  const handleCancelDelete = () => {
    setShowDelete(false);
    setPendingOpenId(null);
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
              onRemove={() => setShowDelete(true)}
            />
          ))}

          {newOrderClip ? (
            <OrderDetailsItemsItem
              clipItemData={newOrderClip}
              isOpen={newOrderClip !== null}
              onClick={handleItemClick}
              portalRef={portalRef}
              setIsDirty={() => setIsDirty(true)}
              resetSignal={resetSignal}
              setResetSignal={setResetSignal}
              onRemove={() => {
                setNewOrderClip(null);
                setOpenedOrderId(orderClips[0]?.orderItemId ?? null);
                setIsDirty(false);
              }}
            />
          ) : (
            <PrimitiveButton
              className={styles.addItemButton}
              onClick={() => {
                setNewOrderClip({
                  orderItemId: 0,
                  clipRef: '',
                  timecodeIn: '',
                  timecodeOut: '',
                  description: '',
                  sourceUrl: '',
                });
                setOpenedOrderId(0);
              }}
            >
              + Add Item
            </PrimitiveButton>
          )}
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
        <PrimitiveDialog
          open={showDelete}
          onOpenChange={setShowDelete}
          title="Delete Clip"
          description="Are you sure you want to delete this clip?"
          onSave={handleConfirmDelete}
          onDiscard={handleCancelDelete}
          onClose={handleCancel}
        />
      </div>
    </>
  );
};

export default OrderDetailsItem;
