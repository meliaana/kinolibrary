import clsx from 'clsx';
import { ReactNode } from 'react';
import PrimitiveButton from '../PrimitiveButton/PrimitiveButton';
import { getVisiblePages } from './PrimitivePagination.helpers';
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

  const renderPageItem = (page: number | string, index: number) => {
    console.log(page);
    if (page === '…') {
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

      {getVisiblePages(currentPage, totalPages).map(renderPageItem)}

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
