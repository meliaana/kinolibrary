export const deleteClip = async (orderId: string, orderItemId: number) => {
  const res = await fetch(`/api/orders/${orderId}/clips/${orderItemId}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error(`Delete failed with status ${res.status}`);
  }

  return true;
};

export const fetchTitle = async ({
  apiFetch,
  clipId,
  masterClipId,
}: {
  apiFetch: any;
  clipId: string | null;
  masterClipId: string | null;
}) => {
  try {
    if (masterClipId) {
      const masterClipResponse = await apiFetch(
        `/api/Clips/masterclip/${masterClipId}`,
        {
          method: 'GET',
        },
      );
      if (!masterClipResponse.ok) {
        console.error(
          'Failed to fetch master clip:',
          masterClipResponse.status,
        );
        return;
      }

      const masterClipData = await masterClipResponse.json();
      return masterClipData.name;
    } else if (clipId) {
      const clipResponse = await apiFetch(`/api/Clips/clip/${clipId}`, {
        method: 'GET',
      });

      if (!clipResponse.ok) {
        console.error('Failed to fetch clip:', clipResponse.status);
        return;
      }

      const clipData = await clipResponse.json();
      return clipData.name;
    }
  } catch (error) {
    console.error('Error fetching clip data:', error);
  }
};
