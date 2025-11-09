import clsx from 'clsx';
import { useId } from 'react';
import { PrimitiveInput } from '../PrimitiveInput';
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

  function handleChange(value: string) {
    onChange?.(value);
  }

  return (
    <fieldset className={clsx(styles.fieldset, className)}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <PrimitiveInput value={value} onChange={handleChange} id={id} />
    </fieldset>
  );
};

export default Fieldset;
