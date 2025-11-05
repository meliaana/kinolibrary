import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { DatePicker } from '../DatePicker';
import { Select } from '../Select';
import { addToDate, DurationUnit } from './TimeDetails.helpers';
import styles from './TimeDetails.module.css';

const TimeDetails = ({
  startDateInitial,
  durationInitial,
  durationSelectorInitial,
}: {
  startDateInitial: string;
  durationInitial: number;
  durationSelectorInitial: DurationUnit;
}) => {
  const [startDate, setStartDate] = useState<string>(
    dayjs(startDateInitial).format('YYYY-MM-DD'),
  );
  const [duration, setDuration] = useState<number>(durationInitial);
  const [durationSelector, setDurationSelector] = useState<DurationUnit>(
    durationSelectorInitial,
  );

  const endDate = useMemo(() => {
    if (durationSelector === 'Perpetuity') return '';
    if (!startDate || !Number.isFinite(Number(duration))) return '';
    return addToDate(startDate, Number(duration), durationSelector);
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
          options={['Day', 'Week', 'Month', 'Year', 'Perpetuity']}
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
