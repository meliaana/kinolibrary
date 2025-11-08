import dayjs from 'dayjs';
import { useMemo } from 'react';
import { DatePicker } from '../DatePicker';
import { PrimitiveInput } from '../PrimitiveInput';
import { Select } from '../Select';
import { addToDate, DurationUnit } from './TimeDetails.helpers';
import styles from './TimeDetails.module.css';

const TimeDetails = ({
  timeDetailsState,
  setTimeDetailsState,
}: {
  timeDetailsState: {
    startDate: string;
    duration: number;
    durationType: string;
  };
  setTimeDetailsState: (state: {
    startDate: string;
    duration: number;
    durationType: string;
  }) => void;
}) => {
  const endDate = useMemo(() => {
    if (timeDetailsState.durationType === 'perpetuity') return '';
    return addToDate(
      timeDetailsState.startDate,
      timeDetailsState.duration,
      timeDetailsState.durationType as DurationUnit,
    );
  }, [
    timeDetailsState.startDate,
    timeDetailsState.duration,
    timeDetailsState.durationType,
  ]);

  function handleDurationChange(value: string) {
    const n = value === '' ? NaN : Number(value);
    setTimeDetailsState({
      ...timeDetailsState,
      duration: n,
      durationType: timeDetailsState.durationType,
    });
  }

  return (
    <>
      <DatePicker
        label="Start Date"
        value={dayjs(timeDetailsState.startDate).format('YYYY-MM-DD')}
        onChange={(value) =>
          setTimeDetailsState({ ...timeDetailsState, startDate: value })
        }
      />
      <div className={styles.durationContainer}>
        <div className={styles.durationWrapper}>
          <label className={styles.durationLabel}>Duration</label>
          <PrimitiveInput
            type="number"
            inputMode="numeric"
            min="0"
            value={
              Number.isFinite(timeDetailsState.duration)
                ? timeDetailsState.duration
                : ''
            }
            onChange={handleDurationChange}
            placeholder="Num"
            id="duration"
          />
        </div>

        <Select
          className={styles.durationSelector}
          label="Duration Selector"
          value={timeDetailsState.durationType}
          onChange={(value) =>
            setTimeDetailsState({
              ...timeDetailsState,
              durationType: value as DurationUnit,
            })
          }
          options={[
            { id: 'day', name: 'Day' },
            { id: 'week', name: 'Week' },
            { id: 'month', name: 'Month' },
            { id: 'year', name: 'Year' },
            { id: 'perpetuity', name: 'Perpetuity' },
          ]}
        />
      </div>

      {timeDetailsState.durationType !== 'perpetuity' && (
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={() => {}}
          disabled={true}
        />
      )}
    </>
  );
};

export default TimeDetails;
