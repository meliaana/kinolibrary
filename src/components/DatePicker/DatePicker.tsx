import clsx from 'clsx';
import React, { useId } from 'react';
import styles from './DatePicker.module.css';

type DateInputProps = {
  label?: string;
  className?: string;
  value: string;
  displayValue?: string;
  onChange?: (value: string) => void;
  min?: string;
  max?: string;
  disabled?: boolean;
};

function DatePicker({
  label,
  className,
  value,
  displayValue,
  onChange,
  min,
  max,
  disabled,
}: DateInputProps) {
  const id = useId();
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(e.target.value);
  }

  return (
    <div className={clsx(styles.wrapper, className)} data-disabled={disabled}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        type="date"
        value={value}
        onChange={handleChange}
        className={styles.input}
        id={id}
        min={min}
        max={max}
        disabled={disabled}
      />
    </div>
  );
}

export default DatePicker;
