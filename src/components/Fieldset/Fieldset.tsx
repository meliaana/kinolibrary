import clsx from 'clsx';
import { useId } from 'react';
import styles from './Fieldset.module.css';

const Fieldset = ({
  label,
  value,
  onChange,
  className,
}: {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  className?: string;
}) => {
  const id = useId();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(e.target.value);
  }

  return (
    <fieldset className={clsx(styles.fieldset, className)}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        value={value}
        onChange={handleChange}
        className={styles.input}
        id={id}
      />
    </fieldset>
  );
};

export default Fieldset;
