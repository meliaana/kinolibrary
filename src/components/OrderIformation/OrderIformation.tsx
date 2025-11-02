import { useState } from 'react';
import { LabelInputPair } from '../LabelInputPair';

const OrderIformation = ({
  propertyItems,
  isReadOnly = false,
}: {
  propertyItems: {
    label: string;
    value: string;
    placeholder?: string;
  }[];
  isReadOnly?: boolean;
}) => {
  const [values, setValues] = useState(
    propertyItems.map((propertyItem) => propertyItem.value),
  );

  return (
    <>
      {propertyItems.map((propertyItem, index) => (
        <LabelInputPair
          placeholder={propertyItem?.placeholder}
          key={propertyItem.label}
          label={propertyItem.label}
          value={values[index]}
          setValue={(value) =>
            setValues((prev) => {
              const updated = [...prev];
              updated[index] = value;
              return updated;
            })
          }
          isReadOnly={isReadOnly}
        />
      ))}
    </>
  );
};

export default OrderIformation;
