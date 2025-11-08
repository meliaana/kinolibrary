import { PrimitiveInput } from '../PrimitiveInput';
import styles from './SearchInput.module.css';

const SearchInput = ({
  value,
  onChange,
  onSubmit,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
}) => {
  return (
    <div className={styles.inputWrapper}>
      <PrimitiveInput
        type="text"
        placeholder="Search"
        name="search"
        value={value}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onSubmit(value);
          }
        }}
      />
    </div>
  );
};

export default SearchInput;
