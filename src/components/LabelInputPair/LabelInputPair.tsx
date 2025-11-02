import styles from './LabelInputPair.module.css';

const LabelInputPair = ({
  label,
  value,
  setValue,
  isReadOnly,
  placeholder,
}: {
  label: string;
  value: string;
  setValue?: (value: string) => void;
  isReadOnly?: boolean;
  placeholder?: string;
}) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue?.(e.target.value);
  }

  return (
    <div className={styles.propertyItem}>
      <span className={styles.propertyItemLabel}>{label}</span>
      <input
        data-readonly={isReadOnly}
        readOnly={isReadOnly}
        className={styles.input}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default LabelInputPair;
