import styles from './PrimitiveInput.module.css';

const PrimitiveInput = ({
  value,
  onChange,
  onBlur,
  isReadOnly,
  placeholder,
  type = 'text',
  ...props
}: {
  value: any;
  onChange?: (value: any) => void;
  onBlur?: (value: any) => void;
  isReadOnly?: boolean;
  placeholder?: string;
  type?: string;
} & Omit<React.ComponentProps<'input'>, 'value' | 'onChange'>) => {
  return (
    <input
      type={type}
      data-readonly={isReadOnly}
      readOnly={isReadOnly}
      className={styles.input}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default PrimitiveInput;
