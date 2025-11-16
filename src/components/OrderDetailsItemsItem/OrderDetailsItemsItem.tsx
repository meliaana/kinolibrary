import { calculateEstimatedSeconds } from '@/helpers/estimatedSeconds';
import clsx from 'clsx';
import { OrderClip } from '../OrderDetails/OrderDetailsItem';
import { PrimitiveButton } from '../PrimitiveButton';
import { PrimitiveInput } from '../PrimitiveInput';
import PrimitiveTooltip from '../PrimitiveTooltip/PrimitiveTooltip';
import styles from './OrderDetailsItemsItem.module.css';

type Props = {
  clipItemData: OrderClip;
  isOpen: boolean;
  isDirty: boolean;
  onClick: (orderId: number) => void;
  setOrderClips: React.Dispatch<React.SetStateAction<OrderClip[]>>;
};

const OrderDetailsItemsItem = ({
  clipItemData,
  isOpen,
  isDirty,
  onClick,
  setOrderClips,
}: Props) => {
  const updateField = (
    field: keyof Pick<OrderClip, 'clipRef' | 'timecodeIn' | 'timecodeOut'>,
    value: string,
  ) => {
    setOrderClips((prev) =>
      prev.map((clip) =>
        clip.orderItemId === clipItemData.orderItemId
          ? { ...clip, [field]: value }
          : clip,
      ),
    );
  };

  const updateClipRef = (value: string) => {
    updateField('clipRef', value);
  };

  const updateTimecodeIn = (value: string) => {
    updateField('timecodeIn', value);
  };

  const updateTimecodeOut = (value: string) => {
    updateField('timecodeOut', value);
  };

  const handleClick = () => {
    onClick(clipItemData.orderItemId);
  };

  const estimatedSeconds = calculateEstimatedSeconds(
    clipItemData.timecodeIn,
    clipItemData.timecodeOut,
  );

  const displayEstimatedSeconds =
    estimatedSeconds == null || isNaN(estimatedSeconds) || estimatedSeconds < 0
      ? '-'
      : `${estimatedSeconds} sec`;

  return (
    <PrimitiveButton
      className={styles.item}
      onClick={handleClick}
      data-active={isOpen}
      data-dirty={isDirty}
    >
      <div className={clsx(styles.itemContent, styles.clipRefContent)}>
        <PrimitiveTooltip content="Clip Reference">
          <span className={styles.clipRef}>Clip Reference</span>
        </PrimitiveTooltip>
        <PrimitiveInput
          value={clipItemData.clipRef}
          onChange={updateClipRef}
          type="text"
        />
      </div>

      <div className={styles.itemContent}>
        <span className={styles.timecodeIn}>Timecode In</span>
        <PrimitiveInput
          value={clipItemData.timecodeIn}
          onChange={updateTimecodeIn}
          type="text"
          placeholder="hh:mm:ss:fps"
        />
      </div>

      <div className={styles.itemContent}>
        <span className={styles.timecodeOut}>Timecode Out</span>
        <PrimitiveInput
          value={clipItemData.timecodeOut}
          onChange={updateTimecodeOut}
          type="text"
          placeholder="hh:mm:ss:fps"
        />
      </div>

      <div className={styles.estimatedSeconds}>
        <p>Estimated Seconds {displayEstimatedSeconds}</p>
      </div>
    </PrimitiveButton>
  );
};

export default OrderDetailsItemsItem;
