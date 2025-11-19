import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { OrderDetailsItemsDesc } from '../OrderDetailsItemsDesc';
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
  const [localOrderClips, setLocalOrderClips] = useState<OrderClip[]>(
    orderClips ?? [],
  );
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [pendingOpenId, setPendingOpenId] = useState<number | null>(null);

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
      original.timecodeOut !== clip.timecodeOut ||
      original.sourceUrl !== clip.sourceUrl ||
      original.description !== clip.description
    );
  };

  const dirtyItem = localOrderClips.find(isClipDirty);
  const dirtyItemId = dirtyItem?.orderItemId ?? null;

  const handleItemClick = (orderItemId: number) => {
    if (dirtyItemId && dirtyItemId !== orderItemId) {
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
    // revert only the dirty (active) item
    if (dirtyItemId !== null) {
      const original = orderClips.find((c) => c.orderItemId === dirtyItemId);
      if (original) {
        setLocalOrderClips((prev) =>
          prev.map((clip) =>
            clip.orderItemId === dirtyItemId ? original : clip,
          ),
        );
      }
    }

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

      setLocalOrderClips((prev) =>
        prev.filter((clip) => clip.orderItemId !== openedOrderId),
      );

      if (openedOrderId === openedOrderId) {
        const remaining = localOrderClips.filter(
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
  };

  const handleSaveDetails = async () => {
    if (!openedOrderId) return;
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
              onClick={handleItemClick}
            />
          ))}

          <PrimitiveButton className={styles.addItemButton} onClick={() => {}}>
            + Add Item
          </PrimitiveButton>
        </div>
        <OrderDetailsItemsDesc
          orderClip={localOrderClips.find(
            (c) => c.orderItemId === openedOrderId,
          )}
          setOrderClips={setLocalOrderClips}
          onSave={handleSaveDetails}
          onDelete={() => setShowDelete(true)}
        />
      </div>
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
    </>
  );
};

export default OrderDetailsItem;
