import clsx from 'clsx';
import { useId } from 'react';
import { PrimitiveInput } from '../PrimitiveInput';
import styles from './Fieldset.module.css';

const Fieldset = ({
  label,
  value,
  onChange,
  className,
  type = 'text',
  ...delegated
}: {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  className?: string;
  type?: string;
} & Omit<React.ComponentProps<'input'>, 'value' | 'onChange' | 'type'>) => {
  const id = useId();
  const required = delegated.required ?? false;

  function handleChange(value: string) {
    onChange?.(value);
  }

  return (
    <fieldset className={clsx(styles.fieldset, className)}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <PrimitiveInput
        value={value}
        onChange={handleChange}
        id={id}
        type={type}
        {...delegated}
      />
    </fieldset>
  );
};

export default Fieldset;
