import { PrimitiveInput } from '../PrimitiveInput';
import styles from './LabelInputPair.module.css';

const LabelInputPair = ({
  label,
  value,
  setValue,
  isReadOnly,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  setValue?: (value: string) => void;
  isReadOnly?: boolean;
  placeholder?: string;
  type?: string;
}) => {
  return (
    <div className={styles.propertyItem}>
      <span className={styles.propertyItemLabel}>{label}</span>
      <PrimitiveInput
        value={value}
        onChange={setValue}
        isReadOnly={isReadOnly}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
};

export default LabelInputPair;
