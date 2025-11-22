import { deleteClip } from '@/helpers/OrderItemsHelpers';
import * as Portal from '@radix-ui/react-portal';
import { Field } from 'formik';
import { useState } from 'react';
import { toast } from 'sonner';
import { ConfirmRemoveItemDialog } from '../ConfirmRemoveItemDialog';
import { FormInput } from '../FormInput';
import { OrderClip } from '../OrderDetails/OrderDetailsItem';
import { OrderDetailsItemsFormButtons } from '../OrderDetailsItemsFormButtons';
import PrimitiveTooltip from '../PrimitiveTooltip/PrimitiveTooltip';
import styles from './OrderDetailsItemsDesc.module.css';

type Props = {
  title: string;
  orderId: string;
  onSave: () => void;
  onDelete: (orderItemId: number) => void;
  clipItemData: OrderClip;
  portalRef: React.RefObject<HTMLDivElement>;
};

const OrderDetailsItemsDesc = ({
  title,
  onSave,
  onDelete,
  orderId,
  clipItemData,
  portalRef,
}: Props) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = async () => {
    if (!clipItemData.orderItemId) return;

    try {
      await deleteClip(orderId, clipItemData.orderItemId);
      toast.success('Clip deleted successfully');
    } catch (error) {
      toast.error('Failed to delete clip');
      throw new Error('Failed to delete clip', { cause: error });
    }
  };

  return (
    <>
      <Portal.Root
        container={portalRef.current ?? undefined}
        className={styles.portalContainer}
      >
        <OrderDetailsItemsFormButtons
          onSave={onSave}
          onDelete={() => setShowDeleteDialog(true)}
          title={title}
        />
        <div className={styles.itemDescriptionContent}>
          <PrimitiveTooltip content="Clip Name or Title">
            <span className={styles.clipRef}>Clip Name or Title</span>
          </PrimitiveTooltip>
          <Field name="orderItemId">
            {({ field, form }: any) => (
              <FormInput
                {...field}
                placeholder="Clip Name or Title"
                type="text"
              />
            )}
          </Field>
        </div>

        <div className={styles.itemDescriptionContent}>
          <PrimitiveTooltip content="Source URL">
            <span className={styles.sourceUrl}>Source URL</span>
          </PrimitiveTooltip>

          <Field name="sourceUrl">
            {({ field, form }: any) => (
              <FormInput {...field} placeholder="Source URL" type="text" />
            )}
          </Field>
        </div>

        <div className={styles.itemDescriptionContent}>
          <span className={styles.sourceUrl}>Description (optional)</span>
          <Field name="description">
            {({ field, form }: any) => (
              <FormInput
                {...field}
                placeholder="Description (optional)"
                type="text"
              />
            )}
          </Field>
        </div>
      </Portal.Root>

      <ConfirmRemoveItemDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={() => {
          handleDelete();
          onDelete(clipItemData.orderItemId ?? 0);
          setShowDeleteDialog(false);
        }}
      />
    </>
  );
};

export default OrderDetailsItemsDesc;
