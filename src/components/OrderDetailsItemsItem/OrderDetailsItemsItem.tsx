import {
  calculateEstimatedSeconds,
  formatEstimatedSeconds,
} from '@/helpers/estimatedSeconds';
import { useApiFetch } from '@/hooks/useApiFetch';
import clsx from 'clsx';
import { ErrorMessage, Field, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
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
  setOpenedOrderId: (orderId: number | null) => void;
  onClick: (orderId: number | null) => void;
  portalRef: React.RefObject<HTMLDivElement>;
  onItemDelete: (orderItemId: number) => void;
  onSave: (clipItemData: OrderClip) => void;
};

type ClipFormValues = {
  clipRef: {
    name: string;
    masterClipId: number | null;
    clipId: number | null;
  };
  timecodeIn: string;
  timecodeOut: string;
  orderNameOrTitle: string;
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
  onSave,
}: Props) => {
  const handleClick = () => {
    onClick(clipItemData.orderItemId);
  };
  const [showUnsavedChanges, setShowUnsavedChanges] = useState(false);
  const [title, setTitle] = useState<string>('');

  const apiFetch = useApiFetch();
  const fetchTitle = async ({
    clipId,
    masterClipId,
  }: {
    clipId: number | null;
    masterClipId: number | null;
  }) => {
    try {
      if (masterClipId) {
        const masterClipResponse = await apiFetch(
          `/api/Clips/masterclip/${masterClipId}`,
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
      } else if (clipId) {
        const clipResponse = await apiFetch(`/api/Clips/clip/${clipId}`, {
          method: 'GET',
        });

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

  useEffect(() => {
    if (!isOpen || !clipItemData.orderItemId) return;

    fetchTitle({
      clipId: clipItemData.clipId,
      masterClipId: clipItemData.masterClipId,
    });
  }, [isOpen]);

  const initialValues: ClipFormValues = {
    clipRef: {
      name: clipItemData.clipRef ?? '',
      masterClipId: clipItemData.masterClipId ?? null,
      clipId: clipItemData.clipId ?? null,
    },
    timecodeIn: clipItemData.timecodeIn ?? '',
    timecodeOut: clipItemData.timecodeOut ?? '',
    orderNameOrTitle: '',
    sourceUrl: clipItemData.sourceUrl ?? '',
    description: clipItemData.description ?? '',
  };

  const formik = useFormik<ClipFormValues>({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      let clipsResponse: Response;

      try {
        if (!clipItemData.orderItemId) {
          // CREATE
          clipsResponse = await apiFetch(`/api/orders/${orderId}/clips`, {
            method: 'POST',
            headers: {
              Accept: 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              masterClipId: values.clipRef.masterClipId,
              clipId: values.clipRef.clipId,
              timecodeIn: values.timecodeIn,
              timecodeOut: values.timecodeOut,
              description: values.description,
              name: values.orderNameOrTitle,
            }),
          });
        } else {
          // UPDATE
          clipsResponse = await fetch(
            `/api/orders/${orderId}/clips/${clipItemData.orderItemId}`,
            {
              method: 'PUT',
              headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                orderItemId: clipItemData.orderItemId,
                masterClipId: values.clipRef.masterClipId,
                clipId: values.clipRef.clipId,
                clipRef: values.clipRef.name,
                timecodeIn: values.timecodeIn,
                timecodeOut: values.timecodeOut,
                description: values.description,
                sourceUrl: values.sourceUrl,
              }),
            },
          );
        }

        if (!clipsResponse.ok) {
          throw new Error('Failed to submit clip');
        }

        const clipsData: OrderClip = await clipsResponse.json();

        // Send normalized data back up
        onSave(clipsData);

        // Mark form as clean (so dirty === false)
        helpers.resetForm({
          values: {
            ...values,
            clipRef: {
              name: clipsData.clipRef ?? values.clipRef.name,
              masterClipId: clipsData.masterClipId,
              clipId: clipsData.clipId,
            },
            timecodeIn: clipsData.timecodeIn,
            timecodeOut: clipsData.timecodeOut,
            sourceUrl: clipsData.sourceUrl,
            description: clipsData.description,
          },
        });

        // Close unsaved dialog
        setShowUnsavedChanges(false);

        // Ensure the saved item stays open
        if (clipsData.orderItemId != null) {
          setOpenedOrderId(clipsData.orderItemId);
        }

        toast.success('Clip submitted successfully');
      } catch (error) {
        console.error('Error submitting clip:', error);
        toast.error('Failed to submit clip');
        throw new Error('Failed to submit clip', { cause: error });
      }
    },
  });
  const { values, dirty, resetForm } = formik;

  const displayEstimatedSeconds = formatEstimatedSeconds(
    calculateEstimatedSeconds(values.timecodeIn, values.timecodeOut),
  );

  useEffect(() => {
    if (!showUnsavedChanges && dirty) {
      setOpenedOrderId(clipItemData.orderItemId);
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
                    value={field.value.name}
                    onChange={(val) => {
                      form.setFieldValue(field.name, {
                        ...field.value,
                        name: val,
                      });
                    }}
                    placeholder="Clip Reference"
                    onSubmitSelected={(val) => {
                      form.setFieldValue(field.name, {
                        ...field.value,
                        name: val.name,
                        masterClipId: val.masterClipId,
                        clipId: val.clipId,
                      });
                      fetchTitle({
                        clipId: val.clipId,
                        masterClipId: val.masterClipId,
                      });
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
