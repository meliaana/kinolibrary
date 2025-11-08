import * as RadixSelect from '@radix-ui/react-select';
import clsx from 'clsx';
import { ArrowIcon } from '../ArrowIcon';
import styles from './Select.module.css';

const Select = ({
  label,
  options,
  value,
  onChange,
  className,
}: {
  options: { id: string; name: string }[];
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) => {
  return (
    <div className={clsx(styles.wrapper, className)}>
      <label className={styles.label}>{label}</label>

      <RadixSelect.Root value={value} onValueChange={onChange}>
        <RadixSelect.Trigger className={styles.trigger} aria-label={label}>
          <RadixSelect.Value placeholder="Select an option" />
          <RadixSelect.Icon>
            <ArrowIcon />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content className={styles.content} position="popper">
            <RadixSelect.Viewport className={styles.viewport}>
              {options.map((option) => (
                <RadixSelect.Item
                  key={option.id}
                  value={option.id}
                  className={styles.item}
                >
                  <RadixSelect.ItemText>{option.name}</RadixSelect.ItemText>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </div>
  );
};

export default Select;
