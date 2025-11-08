import { useId } from 'react';
import { CheckIcon } from '../CheckIcon';
import styles from './CheckBox.module.css';

const CheckBox = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) => {
  const id = useId();

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        role="checkbox"
        aria-checked={value}
        data-state={value ? 'checked' : 'unchecked'}
        value={value ? 'on' : 'off'}
        className={styles.checkbox}
        onClick={() => onChange(!value)}
        id={id}
      >
        <span
          data-state={value ? 'checked' : 'unchecked'}
          className={styles.checkboxIcon}
        >
          <CheckIcon />
        </span>
      </button>
      <input
        type="checkbox"
        aria-hidden="true"
        tabIndex={-1}
        value={value ? 'on' : 'off'}
        className={styles.hiddenInput}
      />
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
