// Returns an array like: [1, '…', 6, 7, 8, '…', 20]
export function getVisiblePages(
  currentPage: number,
  totalPages: number,
  siblingCount = 1,
) {
  const clamp = (n: number, min: number, max: number) =>
    Math.max(min, Math.min(max, n));
  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const cur = clamp(currentPage, 1, Math.max(1, totalPages));
  const totalNumbers = siblingCount * 2 + 5; // first, last, current, and 2 ellipses

  if (totalPages <= totalNumbers) return range(1, totalPages);

  const leftSibling = Math.max(cur - siblingCount, 1);
  const rightSibling = Math.min(cur + siblingCount, totalPages);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  const pages: (number | string)[] = [1];

  if (showLeftEllipsis) {
    pages.push('…');
  } else {
    pages.push(...range(2, leftSibling - 1)); // will be empty if leftSibling === 2
  }

  pages.push(...range(leftSibling, rightSibling));

  if (showRightEllipsis) {
    pages.push('…');
  } else {
    pages.push(...range(rightSibling + 1, totalPages - 1)); // empty if rightSibling === totalPages - 1
  }

  pages.push(totalPages);

  // De-duplicate in case ranges touch (e.g., very small totals)
  return pages.filter((v, i, a) => i === 0 || v !== a[i - 1]);
}
