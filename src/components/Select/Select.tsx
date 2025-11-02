import clsx from 'clsx';
import { useId } from 'react';
import styles from './Select.module.css';

const Select = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  className,
}: {
  options: string[];
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}) => {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    onChange(e.target.value);
  }

  const id = useId();

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className={clsx(styles.select, className)}
        value={value}
        onChange={handleChange}
        defaultValue={placeholder}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
