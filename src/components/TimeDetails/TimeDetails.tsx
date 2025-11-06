import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { DatePicker } from '../DatePicker';
import { Select } from '../Select';
import { addToDate, DurationUnit } from './TimeDetails.helpers';
import styles from './TimeDetails.module.css';

const durationMap = {
  1: 'day',
  2: 'week',
  3: 'month',
  4: 'year',
  5: 'perpetuity',
};

const TimeDetails = ({
  startDateInitial,
  durationInitial,
  durationSelectorInitial,
}: {
  startDateInitial: string;
  durationInitial: number;
  durationSelectorInitial: number;
}) => {
  const [startDate, setStartDate] = useState<string>(
    dayjs(startDateInitial).format('YYYY-MM-DD'),
  );
  const [duration, setDuration] = useState<number>(durationInitial);
  const [durationSelector, setDurationSelector] = useState<string>(
    durationMap[durationSelectorInitial as keyof typeof durationMap],
  );

  const endDate = useMemo(() => {
    if (durationSelector === 'Perpetuity') return '';
    return addToDate(startDate, duration, durationSelector as DurationUnit);
  }, [startDate, duration, durationSelector]);

  function handleDurationChange(e: React.ChangeEvent<HTMLInputElement>) {
    const n = e.target.value === '' ? NaN : Number(e.target.value);
    setDuration(n);
  }

  return (
    <>
      <DatePicker
        label="Start Date"
        value={startDate}
        onChange={setStartDate}
      />
      <div className={styles.durationContainer}>
        <div className={styles.durationWrapper}>
          <label className={styles.durationLabel}>Duration</label>
          <input
            type="number"
            inputMode="numeric"
            min="0"
            value={Number.isFinite(duration) ? duration : ''}
            onChange={handleDurationChange}
            placeholder="Num"
            className={styles.input}
            id="duration"
          />
        </div>

        <Select
          className={styles.durationSelector}
          label="Duration Selector"
          value={durationSelector}
          onChange={(value) => setDurationSelector(value as DurationUnit)}
          options={[
            { id: 'day', name: 'Day' },
            { id: 'week', name: 'Week' },
            { id: 'month', name: 'Month' },
            { id: 'year', name: 'Year' },
            { id: 'perpetuity', name: 'Perpetuity' },
          ]}
        />
      </div>

      {durationSelector !== 'Perpetuity' && (
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
