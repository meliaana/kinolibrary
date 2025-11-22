import {
  calculateEstimatedSeconds,
  formatEstimatedSeconds,
} from '@/helpers/estimatedSeconds';
import clsx from 'clsx';
import { ErrorMessage, Field, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { ConfirmChangesDialog } from '../ConfirmChangesDialog';
import { FormInput } from '../FormInput';
import { OrderClip } from '../OrderDetails/OrderDetailsItem';
import { OrderDetailsItemsDesc } from '../OrderDetailsItemsDesc';
import { PrimitiveButton } from '../PrimitiveButton';
import PrimitiveTooltip from '../PrimitiveTooltip/PrimitiveTooltip';
import { SearchableDropdown } from '../SearchableDropdown';
import { validationSchema } from './OrderDetailsItemsItem.helpers';
import styles from './OrderDetailsItemsItem.module.css';

type Props = {
  orderId: string;
  clipItemData: OrderClip;
  isOpen: boolean;
  setOpenedOrderId: (orderId: number) => void;
  onClick: (orderId: number) => void;
  portalRef: React.RefObject<HTMLDivElement>;
  onItemDelete: (orderItemId: number) => void;
};

type ClipFormValues = {
  clipRef: string;
  timecodeIn: string;
  timecodeOut: string;
  orderItemId: number | '';
  sourceUrl: string;
  description: string;
};

const OrderDetailsItemsItem = ({
  orderId,
  clipItemData,
  isOpen,
  setOpenedOrderId,
  onClick,
  portalRef,
  onItemDelete,
}: Props) => {
  const handleClick = () => {
    onClick(clipItemData.orderItemId ?? 0);
  };
  const [showUnsavedChanges, setShowUnsavedChanges] = useState(false);
  const [title, setTitle] = useState<string>('');

  const initialValues: ClipFormValues = {
    clipRef: clipItemData.clipRef ?? '',
    timecodeIn: clipItemData.timecodeIn ?? '',
    timecodeOut: clipItemData.timecodeOut ?? '',
    orderItemId: clipItemData.orderItemId ?? '',
    sourceUrl: clipItemData.sourceUrl ?? '',
    description: clipItemData.description ?? '',
  };

  const formik = useFormik<ClipFormValues>({
    initialValues,
    validationSchema,
    onSubmit: () => {
      console.log('submit');
      setShowUnsavedChanges(false);
    },
  });
  const { values, dirty, resetForm } = formik;

  const displayEstimatedSeconds = formatEstimatedSeconds(
    calculateEstimatedSeconds(values.timecodeIn, values.timecodeOut),
  );

  useEffect(() => {
    if (!showUnsavedChanges && dirty) {
      setOpenedOrderId(clipItemData.orderItemId ?? 0);
    }
  }, [showUnsavedChanges, dirty]);

  useEffect(() => {
    if (!isOpen && dirty) {
      setShowUnsavedChanges(true);
    }
  }, [isOpen, dirty]);

  const handleDiscardUnsavedChanges = () => {
    setShowUnsavedChanges(false);
    resetForm();
  };

  return (
    <>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <PrimitiveButton
            className={styles.item}
            onClick={handleClick}
            type="button"
            data-active={isOpen}
            data-dirty={dirty}
          >
            {/* Clip Ref */}
            <div className={clsx(styles.itemContent, styles.clipRefContent)}>
              <PrimitiveTooltip content="Clip Reference">
                <span className={styles.clipRef}>Clip Reference</span>
              </PrimitiveTooltip>

              <Field name="clipRef">
                {({ field, form }: any) => (
                  <SearchableDropdown
                    value={field.value}
                    onChange={(val) => {
                      form.setFieldValue(field.name, val);
                    }}
                    placeholder="Clip Reference"
                    onSubmitSelected={(val) => {
                      form.setFieldValue(field.name, val.name);
                    }}
                    isActive={isOpen}
                  />
                )}
              </Field>

              <ErrorMessage name="clipRef">
                {(msg) => <span className={styles.error}>{msg}</span>}
              </ErrorMessage>
            </div>

            {/* Timecode In */}
            <div className={styles.itemContent}>
              <span className={styles.timecodeIn}>Timecode In</span>

              <Field name="timecodeIn">
                {({ field, meta, form }: any) => (
                  <FormInput
                    {...field} // gives name, value, onChange, onBlur
                    placeholder="hh:mm:ss:fps"
                    type="text"
                  />
                )}
              </Field>

              <ErrorMessage name="timecodeIn">
                {(msg) => <span className={styles.error}>{msg}</span>}
              </ErrorMessage>
            </div>

            {/* Timecode Out */}
            <div className={styles.itemContent}>
              <span className={styles.timecodeOut}>Timecode Out</span>

              <Field name="timecodeOut">
                {({ field, form }: any) => (
                  <FormInput
                    {...field}
                    type="text"
                    placeholder="hh:mm:ss:fps"
                  />
                )}
              </Field>

              <ErrorMessage name="timecodeOut">
                {(msg) => <span className={styles.error}>{msg}</span>}
              </ErrorMessage>
            </div>

            {/* Estimated seconds */}
            <div className={styles.estimatedSeconds}>
              <p>Estimated Seconds {displayEstimatedSeconds}</p>
            </div>
          </PrimitiveButton>

          {isOpen && (
            <OrderDetailsItemsDesc
              onSave={formik.handleSubmit}
              onDelete={onItemDelete}
              portalRef={portalRef}
              clipItemData={clipItemData}
              orderId={orderId}
              title={title}
            />
          )}
        </form>
      </FormikProvider>
      <ConfirmChangesDialog
        open={showUnsavedChanges}
        onOpenChange={setShowUnsavedChanges}
        onConfirm={formik.handleSubmit}
        onDiscard={handleDiscardUnsavedChanges}
      />
    </>
  );
};

export default OrderDetailsItemsItem;
