import { useApiFetch } from '@/hooks/useApiFetch';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { ConfirmChangesDialog } from '../ConfirmChangesDialog';
import { ConfirmRemoveItemDialog } from '../ConfirmRemoveItemDialog';
import { OrderDetailsItemsItem } from '../OrderDetailsItemsItem';
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
  const [localOrderClips, setLocalOrderClips] =
    useState<OrderClip[]>(orderClips);

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
    setLocalOrderClips(orderClips);
  }, [orderClips]);

  useEffect(() => {
    setOpenedOrderId(localOrderClips[0]?.orderItemId ?? null);
  }, [localOrderClips]);

  useEffect(() => {
    const fetchClipData = async () => {
      const clip = localOrderClips.find(
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
  }, [openedOrderId, localOrderClips]);

  const handleItemClick = (orderItemId: number) => {
    if (isDirty && openedOrderId !== orderItemId) {
      setPendingOpenId(orderItemId);
      setShowConfirm(true);
      return;
    }

    setOpenedOrderId(orderItemId);
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
        const remaining = localOrderClips.filter(
          (clip) => clip.orderItemId !== openedOrderId,
        );
        setLocalOrderClips(remaining);
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

  const handleConfirmSaveChanges = () => {
    console.log('handleConfirmSaveChanges');
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
              portalRef={portalRef}
              setIsDirty={setIsDirty}
              resetSignal={resetSignal}
              setResetSignal={setResetSignal}
              onRemove={() => setShowDelete(true)}
              title={title}
            />
          ))}
        </div>
        <div ref={portalRef} className={styles.portalContainer}></div>
        <ConfirmChangesDialog
          open={showConfirm}
          onOpenChange={setShowConfirm}
          onConfirm={handleConfirmSaveChanges}
          onDiscard={handleDiscard}
        />
        <ConfirmRemoveItemDialog
          open={showDelete}
          onOpenChange={setShowDelete}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </>
  );
};

export default OrderDetailsItem;
