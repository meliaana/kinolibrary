import clsx from 'clsx';
import { ReactNode } from 'react';
import PrimitiveButton from '../PrimitiveButton/PrimitiveButton';
import styles from './PrimitivePagination.module.css';

export interface PrimitivePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  prevLabel?: ReactNode;
  nextLabel?: ReactNode;

  ellipsisClassName?: string;
}

const PrimitivePagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
  prevLabel = '❮',
  nextLabel = '❯',
  ellipsisClassName,
}: PrimitivePaginationProps) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  const getVisiblePages = () => {
    const pages: (number | string)[] = [1];

    if (totalPages <= 5) {
      for (let i = 2; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
      pages.push(2, 3);
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push('...');
      pages.push(totalPages - 2, totalPages - 1);
      pages.push(totalPages);
    } else {
      pages.push('...');
      pages.push(currentPage);
      pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const renderPageItem = (page: number | string, index: number) => {
    if (page === '...') {
      return (
        <span key={`ellipsis-${index}`} className={clsx(ellipsisClassName)}>
          ...
        </span>
      );
    }

    const isActive = page === currentPage;
    return (
      <PrimitiveButton
        aria-label="Active Page number"
        key={`page-${page}`}
        className={styles.pageButton}
        data-active={isActive}
        onClick={() => handlePageChange(Number(page))}
      >
        {page}
      </PrimitiveButton>
    );
  };

  return (
    <div className={clsx(styles.wrapper, className)}>
      <PrimitiveButton
        className={styles.navigationButton}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        data-disabled={currentPage === 1}
        aria-label="Previous page"
      >
        {prevLabel}
      </PrimitiveButton>

      {getVisiblePages().map(renderPageItem)}

      <PrimitiveButton
        className={styles.navigationButton}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
        data-disabled={currentPage === totalPages || totalPages === 0}
        aria-label="Next page"
      >
        {nextLabel}
      </PrimitiveButton>
    </div>
  );
};

export default PrimitivePagination;
