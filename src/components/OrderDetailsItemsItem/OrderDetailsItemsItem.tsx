import {
  calculateEstimatedSeconds,
  formatEstimatedSeconds,
} from '@/helpers/estimatedSeconds';
import * as Portal from '@radix-ui/react-portal';
import clsx from 'clsx';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { OrderClip } from '../OrderDetails/OrderDetailsItem';
import { OrderDetailsItemsFormButtons } from '../OrderDetailsItemsFormButtons';
import { PrimitiveButton } from '../PrimitiveButton';
import { PrimitiveInput } from '../PrimitiveInput';
import PrimitiveTooltip from '../PrimitiveTooltip/PrimitiveTooltip';
import styles from './OrderDetailsItemsItem.module.css';

type Props = {
  clipItemData: OrderClip;
  isOpen: boolean;
  onClick: (orderId: number) => void;
  portalRef: React.RefObject<HTMLDivElement>;
  setIsDirty: (isDirty: boolean) => void;
  resetSignal: boolean;
  setResetSignal: (resetSignal: boolean) => void;
};

type ClipFormValues = {
  clipRef: string;
  timecodeIn: string;
  timecodeOut: string;
  orderItemId: number | '';
  sourceUrl: string;
  description: string;
};

const validationSchema = Yup.object({
  clipRef: Yup.string().required('Clip reference is required'),
  timecodeIn: Yup.string()
    .matches(/^\d{2}:\d{2}:\d{2}:\d{2}$/, 'Use hh:mm:ss:ff')
    .required('Timecode In is required'),
  timecodeOut: Yup.string()
    .matches(/^\d{2}:\d{2}:\d{2}:\d{2}$/, 'Use hh:mm:ss:ff')
    .required('Timecode Out is required'),
});

const OrderDetailsItemsItem = ({
  clipItemData,
  isOpen,
  onClick,
  portalRef,
  setIsDirty,
  resetSignal,
  setResetSignal,
}: Props) => {
  const handleClick = () => {
    onClick(clipItemData.orderItemId);
  };

  const initialValues: ClipFormValues = {
    clipRef: clipItemData.clipRef ?? '',
    timecodeIn: clipItemData.timecodeIn ?? '',
    timecodeOut: clipItemData.timecodeOut ?? '',
    orderItemId: clipItemData.orderItemId ?? '',
    sourceUrl: clipItemData.sourceUrl ?? '',
    description: clipItemData.description ?? '',
  };

  return (
    <Formik<ClipFormValues>
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={() => {}}
    >
      {({ values, dirty, resetForm }) => {
        const displayEstimatedSeconds = formatEstimatedSeconds(
          calculateEstimatedSeconds(values.timecodeIn, values.timecodeOut),
        );

        useEffect(() => {
          setIsDirty(dirty);
        }, [dirty]);

        useEffect(() => {
          console.log('resetSignal', resetSignal);
          if (resetSignal) {
            resetForm();
            setResetSignal(false);
          }
        }, [resetSignal]);

        return (
          <Form>
            {/* Row button */}
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
                    <PrimitiveInput
                      value={field.value}
                      onChange={(value: string) => {
                        form.setFieldValue(field.name, value);
                      }}
                      type="text"
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
                  {({ field, form }: any) => (
                    <PrimitiveInput
                      value={field.value}
                      onChange={(value: string) => {
                        form.setFieldValue(field.name, value);
                      }}
                      type="text"
                      placeholder="hh:mm:ss:fps"
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
                    <PrimitiveInput
                      value={field.value}
                      onChange={(value: string) => {
                        form.setFieldValue(field.name, value);
                      }}
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

            <Portal.Root
              container={portalRef.current ?? undefined}
              className={styles.portalContainer}
              data-open={isOpen}
            >
              <OrderDetailsItemsFormButtons
                onSave={() => {}}
                onDelete={() => {}}
              />
              <div className={styles.itemDescriptionContent}>
                <PrimitiveTooltip content="Clip Name or Title">
                  <span className={styles.clipRef}>Clip Name or Title</span>
                </PrimitiveTooltip>
                <Field name="orderItemId">
                  {({ field, form }: any) => (
                    <PrimitiveInput
                      value={field.value}
                      onChange={(value: string) => {
                        form.setFieldValue(field.name, value);
                      }}
                      type="number"
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
                    <PrimitiveInput
                      value={field.value}
                      onChange={(value: string) => {
                        form.setFieldValue(field.name, value);
                      }}
                      type="text"
                    />
                  )}
                </Field>
              </div>

              <div className={styles.itemDescriptionContent}>
                <span className={styles.sourceUrl}>Description (optional)</span>
                <Field name="description">
                  {({ field, form }: any) => (
                    <PrimitiveInput
                      value={field.value}
                      onChange={(value: string) => {
                        form.setFieldValue(field.name, value);
                      }}
                      type="text"
                    />
                  )}
                </Field>
              </div>
            </Portal.Root>
          </Form>
        );
      }}
    </Formik>
  );
};

export default OrderDetailsItemsItem;
