'use client';

import React from 'react';

interface EditorialPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  scrollToTop?: number;
  className?: string;
}

export default function EditorialPagination({
  currentPage,
  totalPages,
  onPageChange,
  scrollToTop = 320,
  className = '',
}: EditorialPaginationProps) {
  if (totalPages <= 1) return null;

  const handlePageClick = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: scrollToTop, behavior: 'smooth' });
    }
  };

  // Generate page numbers with clean windowing
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className={`mt-10 pt-6 border-t border-slate-200 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Page Buttons List */}
        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          {/* Previous Button (<) */}
          <button
            type="button"
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
            className={`min-w-[32px] h-8 sm:min-w-[36px] sm:h-9 px-2 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer ${
              currentPage === 1
                ? 'border border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50'
                : 'border border-slate-200 text-slate-700 bg-white hover:bg-slate-100 hover:border-slate-300'
            }`}
            aria-label="Previous page"
          >
            &lt;
          </button>

          {/* Page Numbers */}
          {getPageNumbers().map((item, idx) => {
            if (item === '...') {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-1 text-slate-400 text-xs select-none"
                >
                  …
                </span>
              );
            }

            const pageNum = Number(item);
            const isActive = pageNum === currentPage;

            return (
              <button
                key={`page-${pageNum}`}
                type="button"
                onClick={() => handlePageClick(pageNum)}
                className={`min-w-[32px] h-8 sm:min-w-[36px] sm:h-9 px-2.5 flex items-center justify-center text-xs font-black transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#DC2626] text-white border border-[#DC2626] shadow-sm'
                    : 'border border-slate-200 text-slate-800 bg-white hover:bg-slate-100 hover:border-slate-300'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {pageNum}
              </button>
            );
          })}

          {/* Next Button (>) */}
          <button
            type="button"
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`min-w-[32px] h-8 sm:min-w-[36px] sm:h-9 px-2 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer ${
              currentPage === totalPages
                ? 'border border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50'
                : 'border border-slate-200 text-slate-700 bg-white hover:bg-slate-100 hover:border-slate-300'
            }`}
            aria-label="Next page"
          >
            &gt;
          </button>
        </div>

        {/* Status Text: Page X of Y */}
        <div className="text-[11.5px] text-slate-500 font-medium font-sans">
          Page <strong className="text-slate-800 font-bold">{currentPage}</strong> of{' '}
          <strong className="text-slate-800 font-bold">{totalPages}</strong>
        </div>
      </div>
    </div>
  );
}
