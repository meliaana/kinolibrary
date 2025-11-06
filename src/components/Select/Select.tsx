import clsx from 'clsx';
import { useId } from 'react';
import styles from './Select.module.css';

const Select = ({
  label,
  options,
  value,
  onChange,
  className,
}: {
  options: { id: string; name: string }[];
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) => {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    onChange(e.target.value);
  }

  const id = useId();

  return (
    <div className={clsx(styles.wrapper, className)}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className={clsx(styles.select, className)}
        value={value}
        onChange={handleChange}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
