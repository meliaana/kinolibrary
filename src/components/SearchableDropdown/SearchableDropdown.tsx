import { throttle } from '@/helpers/throttle';
import { useApiFetch } from '@/hooks/useApiFetch';
import * as Popover from '@radix-ui/react-popover';
import { useEffect, useState } from 'react';
import { FormInput } from '../FormInput';
import { PrimitiveButton } from '../PrimitiveButton';
import styles from './SearchableDropdown.module.css';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmitSelected: (value: {
    clipId: string | null;
    masterClipId: string | null;
    name: string;
  }) => void;
  placeholder?: string;
  isActive?: boolean;
};

export const SearchableDropdown = ({
  value,
  onChange,
  onSubmitSelected,
  placeholder,
  isActive = false,
}: Props) => {
  const apiFetch = useApiFetch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [options, setOptions] = useState<
    {
      clipId: string | null;
      masterClipId: string | null;
      name: string;
    }[]
  >([]);

  useEffect(() => {
    if (!isActive) {
      setIsDropdownOpen(false);
      return;
    }

    getClipData(value);
  }, [isActive]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
    getClipData(e.target.value);
  }

  const getClipData = throttle(async (clipRef: string) => {
    try {
      const fetchData = await apiFetch(
        `/api/Clips/autocomplete?term=${encodeURIComponent(clipRef)}`,
        { method: 'GET' },
      );

      if (!fetchData.ok) {
        console.error('Failed to fetch clip:', fetchData.status);
        return;
      }

      const data = await fetchData.json();
      setOptions(data);
    } catch (error) {
      console.error('Error fetching clip data:', error);
    }
  }, 200);

  return (
    <Popover.Root open={isDropdownOpen}>
      <Popover.Anchor asChild>
        <FormInput
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={() => setIsDropdownOpen(true)}
          onBlur={() => setIsDropdownOpen(false)}
        />
      </Popover.Anchor>
      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={4}
          className={styles.popoverContent}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <ul className={styles.optionsList}>
            {options.length > 0 ? (
              options.map((opt) => (
                <PrimitiveButton
                  className={styles.optionButton}
                  key={opt.clipId || opt.masterClipId}
                  onMouseDown={() => {
                    onSubmitSelected(opt);
                  }}
                >
                  {opt.name}
                </PrimitiveButton>
              ))
            ) : (
              <p className={styles.noOptionsFound}>No options found</p>
            )}
          </ul>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default SearchableDropdown;
