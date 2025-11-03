import { useMemo, useState } from 'react';
import { DatePicker } from '../DatePicker';
import { Select } from '../Select';
import { addToDate, DurationUnit } from './TimeDetails.helpers';
import styles from './TimeDetails.module.css';

const TimeDetails = () => {
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().split('T')[0],
  );
  const [duration, setDuration] = useState<number>(1);
  const [durationSelector, setDurationSelector] = useState<DurationUnit>('Day');

  const endDate = useMemo(() => {
    if (durationSelector === 'Perpetuity') return '';
    if (!startDate || isNaN(duration)) return '';
    return addToDate(startDate, duration, durationSelector);
  }, [startDate, duration, durationSelector]);

  function handleDurationChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDuration(Number(e.target.value));
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
            value={duration}
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
