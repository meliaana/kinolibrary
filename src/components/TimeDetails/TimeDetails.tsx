import { useMemo, useState } from 'react';
import { DatePicker } from '../DatePicker';
import { LabelInputPair } from '../LabelInputPair';
import { Select } from '../Select';
import styles from './TimeDetails.module.css';

const formatYYYYMMDD = (d: Date) => d.toISOString().split('T')[0];
const DURATION_UNITS = [
  'Day',
  'Week',
  'Month',
  'Year',
  'Indefinitely',
] as const;

type DurationUnit = (typeof DURATION_UNITS)[number];

const addToDate = (startISO: string, amount: number, unit: DurationUnit) => {
  const d = new Date(startISO);
  if (Number.isNaN(d.getTime())) return '';
  switch (unit) {
    case 'Day':
      d.setDate(d.getDate() + amount);
      break;
    case 'Week':
      d.setDate(d.getDate() + amount * 7);
      break;
    case 'Month':
      d.setMonth(d.getMonth() + amount);
      break;
    case 'Year':
      d.setFullYear(d.getFullYear() + amount);
      break;
  }
  return formatYYYYMMDD(d);
};

const TimeDetails = () => {
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().split('T')[0],
  );
  const [duration, setDuration] = useState<number>(1);
  const [durationSelector, setDurationSelector] = useState<DurationUnit>('Day');

  const endDate = useMemo(() => {
    if (durationSelector === 'Indefinitely') return '';
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
        label="Duration Selector"
        value={durationSelector}
        onChange={setDurationSelector}
        placeholder="Duration Selector"
        options={['Day', 'Week', 'Month', 'Year', 'Indefinitely']}
      />

      {durationSelector !== 'Indefinitely' && (
        <LabelInputPair
          label="End date"
          value={endDate}
          setValue={() => {}}
          placeholder="End date"
          isReadOnly={true}
        />
      )}
    </>
  );
};

export default TimeDetails;
