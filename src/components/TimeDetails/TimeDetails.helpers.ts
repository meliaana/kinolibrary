// TimeDetails.helpers.ts
import dayjs from 'dayjs';

export type DurationUnit = 'Day' | 'Week' | 'Month' | 'Year' | 'Perpetuity';

const unitMap: Record<string, 'day' | 'week' | 'month' | 'year'> = {
  // Title case (expected by type)
  Day: 'day',
  Week: 'week',
  Month: 'month',
  Year: 'year',
  // Lowercase ids (coming from <Select />)
  day: 'day',
  week: 'week',
  month: 'month',
  year: 'year',
};

export function addToDate(
  startDate: string,
  amount: number,
  unit: DurationUnit,
): string {
  // Normalize and handle perpetuity
  const normalizedUnit = String(unit);
  if (normalizedUnit.toLowerCase() === 'perpetuity') return '';
  const mappedUnit = unitMap[normalizedUnit];

  const d = dayjs(startDate);
  if (!d.isValid() || !Number.isFinite(amount) || !mappedUnit) return '';

  return d.add(amount, mappedUnit).format('YYYY-MM-DD');
}
