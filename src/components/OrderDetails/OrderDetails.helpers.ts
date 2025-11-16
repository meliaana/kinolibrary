import { OrderClip } from './OrderDetailsItem';

export const deleteClip = async (orderId: string, orderItemId: number) => {
  const res = await fetch(`/api/orders/${orderId}/clips/${orderItemId}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error(`Delete failed with status ${res.status}`);
  }

  return true;
};

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

export type OrderDetailsPayload = {
  transmission: string;
  territoryId: number;
  platformId: number;
  startDate: string; // ISO string
  duration: number;
  durationType: number;
};
