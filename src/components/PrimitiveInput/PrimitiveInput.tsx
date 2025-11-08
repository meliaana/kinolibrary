import styles from './PrimitiveInput.module.css';

const PrimitiveInput = ({
  value,
  onChange,
  isReadOnly,
  placeholder,
  type = 'text',
  ...props
}: {
  value: any;
  onChange?: (value: any) => void;
  isReadOnly?: boolean;
  placeholder?: string;
  type?: string;
} & Omit<React.ComponentProps<'input'>, 'value' | 'onChange'>) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(e.target.value);
  }
  return (
    <input
      type={type}
      data-readonly={isReadOnly}
      readOnly={isReadOnly}
      className={styles.input}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default PrimitiveInput;
