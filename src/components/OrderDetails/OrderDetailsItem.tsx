import { useApiFetch } from '@/hooks/useApiFetch';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { OrderDetailsItemsItem } from '../OrderDetailsItemsItem';
import { PrimitiveButton } from '../PrimitiveButton';
import { PrimitiveDialog } from '../PrimitiveDialog';
import { deleteClip } from './OrderDetails.helpers';
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
  const [openedOrderId, setOpenedOrderId] = useState<number | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const portalRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState<string>('');

  const [newOrderClip, setNewOrderClip] = useState<OrderClip | null>(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [pendingOpenId, setPendingOpenId] = useState<number | null>(null);
  const [resetSignal, setResetSignal] = useState(false);

  const apiFetch = useApiFetch();

  if (!orderClips) return null;

  useEffect(() => {
    setOpenedOrderId(orderClips[0]?.orderItemId ?? null);
  }, [orderClips]);

  useEffect(() => {
    const fetchClipData = async () => {
      const clip = orderClips.find(
        (clip) => clip.orderItemId === openedOrderId,
      );
      if (!clip) return;

      try {
        if (clip.masterClipId) {
          const masterClipResponse = await apiFetch(
            `/api/Clips/masterclip/${clip.masterClipId}`,
            {
              method: 'GET',
            },
          );
          if (!masterClipResponse.ok) {
            console.error(
              'Failed to fetch master clip:',
              masterClipResponse.status,
            );
            return;
          }

          const masterClipData = await masterClipResponse.json();
          setTitle(masterClipData.name);
        } else if (clip.clipId) {
          const clipResponse = await fetch(`/api/Clips/clip/${clip.clipId}`);

          if (!clipResponse.ok) {
            console.error('Failed to fetch clip:', clipResponse.status);
            return;
          }

          const clipData = await clipResponse.json();
          setTitle(clipData.name);
        }
      } catch (error) {
        console.error('Error fetching clip data:', error);
      }
    };

    fetchClipData();
  }, [openedOrderId, orderClips]);

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
              title={title}
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
                  masterClipId: null,
                  description: '',
                  sourceUrl: '',
                  clipId: null,
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
