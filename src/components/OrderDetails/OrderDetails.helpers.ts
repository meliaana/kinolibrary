import { OrderClip } from './OrderDetailsItem';

export const updateField = (
  field: keyof Pick<
    OrderClip,
    'clipRef' | 'timecodeIn' | 'timecodeOut' | 'sourceUrl' | 'description'
  >,
  value: string,
  setOrderClips: React.Dispatch<React.SetStateAction<OrderClip[]>>,
  orderClip: OrderClip,
) => {
  setOrderClips((prev) =>
    prev.map((clip) =>
      clip.orderItemId === orderClip.orderItemId
        ? { ...clip, [field]: value }
        : clip,
    ),
  );
};
