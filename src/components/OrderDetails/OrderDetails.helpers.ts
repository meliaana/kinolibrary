export const deleteClip = async (orderId: string, orderItemId: number) => {
  const res = await fetch(`/api/orders/${orderId}/clips/${orderItemId}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error(`Delete failed with status ${res.status}`);
  }

  return true;
};
