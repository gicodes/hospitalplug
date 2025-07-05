import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from '@/app/page.module.css';

export default function Pagination({ currentPage, totalPages, onPageChange }: {
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void
}) {
  return (
    <div className={styles.pagination}>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
      >
        <FaChevronLeft />
      </button>

      <span>
        Page {currentPage}/ {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
      >
        <FaChevronRight />
      </button>
    </div>
  );
}
