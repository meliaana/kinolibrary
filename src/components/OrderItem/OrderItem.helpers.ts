export function orderStatus(status: string) {
  switch (status) {
    case 'Not Prepared':
      return 'pending';
    case 'Completed':
      return 'success';
    case 'Waiting Details':
      return 'pending';
    case 'Completed':
      return 'success';
    default:
      return 'Unknown';
  }
}
