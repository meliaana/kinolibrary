import {
  calculateEstimatedSeconds,
  formatEstimatedSeconds,
} from '@/helpers/estimatedSeconds';
import clsx from 'clsx';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { OrderClip } from '../OrderDetails/OrderDetailsItem';
import { PrimitiveButton } from '../PrimitiveButton';
import { PrimitiveInput } from '../PrimitiveInput';
import PrimitiveTooltip from '../PrimitiveTooltip/PrimitiveTooltip';
import styles from './OrderDetailsItemsItem.module.css';

type Props = {
  clipItemData: OrderClip;
  isOpen: boolean;
  onClick: (orderId: number) => void;
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

const OrderDetailsItemsItem = ({ clipItemData, isOpen, onClick }: Props) => {
  const handleClick = () => {
    onClick(clipItemData.orderItemId);
  };

  return (
    <Formik
      initialValues={{
        clipRef: clipItemData.clipRef ?? '',
        timecodeIn: clipItemData.timecodeIn ?? '',
        timecodeOut: clipItemData.timecodeOut ?? '',
      }}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={() => {}}
    >
      {({ values }) => {
        const displayEstimatedSeconds = formatEstimatedSeconds(
          calculateEstimatedSeconds(values.timecodeIn, values.timecodeOut),
        );

        return (
          <Form /* no visible submit button, we just use Formik for validation/state */
          >
            <PrimitiveButton
              className={styles.item}
              onClick={handleClick}
              type="button"
              data-active={isOpen}
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

              {/* Estimated seconds – uses Formik values, updates live */}
              <div className={styles.estimatedSeconds}>
                <p>Estimated Seconds {displayEstimatedSeconds}</p>
              </div>
            </PrimitiveButton>
          </Form>
        );
      }}
    </Formik>
  );
};

export default OrderDetailsItemsItem;
