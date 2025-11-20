import { forwardRef } from 'react';
import styles from './FormInput.module.css';

type Props = {
  value: any;
  onChange?: (value: any) => void;
  onBlur?: (value: any) => void;
  onFocus?: (value: any) => void;
  isReadOnly?: boolean;
  placeholder?: string;
  type?: string;
} & Omit<React.ComponentProps<'input'>, 'value' | 'onChange'>;

const FormInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      value,
      onChange,
      onBlur,
      onFocus,
      isReadOnly,
      placeholder,
      type = 'text',
      ...props
    },
    ref,
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        data-readonly={isReadOnly}
        readOnly={isReadOnly}
        className={styles.input}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        {...props}
      />
    );
  },
);

FormInput.displayName = 'FormInput';

export default FormInput;
