// TimeDetails.helpers.ts
import dayjs from 'dayjs';

export type DurationUnit = 'Day' | 'Week' | 'Month' | 'Year' | 'Perpetuity';

const unitMap = {
  Day: 'day',
  Week: 'week',
  Month: 'month',
  Year: 'year',
} as const;

export function addToDate(
  startDate: string,
  amount: number,
  unit: DurationUnit,
): string {
  if (unit === 'Perpetuity') return '';
  const d = dayjs(startDate);
  if (!d.isValid() || !Number.isFinite(amount)) return '';
  return d.add(amount, unitMap[unit]).format('YYYY-MM-DD');
}
