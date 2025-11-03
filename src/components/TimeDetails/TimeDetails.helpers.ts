const formatYYYYMMDD = (d: Date) => d.toISOString().split('T')[0];
const DURATION_UNITS = ['Day', 'Week', 'Month', 'Year', 'Perpetuity'] as const;
export type DurationUnit = (typeof DURATION_UNITS)[number];

export const addToDate = (
  startISO: string,
  amount: number,
  unit: DurationUnit,
) => {
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
