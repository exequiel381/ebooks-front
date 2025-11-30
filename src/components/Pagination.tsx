import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    totalItems,
    itemsPerPage,
    onPageChange,
}) => {
    if (totalPages <= 1) return null;

    return (
        <>
            {/* Pagination Controls */}
            <div className="mt-8 flex justify-center items-center gap-2 flex-wrap">
                {/* Previous Button */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={!hasPrevPage}
                    className="px-4 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    aria-label="Previous page"
                >
                    Previous
                </button>

                {/* Page Numbers */}
                <div className="flex gap-1 flex-wrap justify-center">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        // Show first page, last page, current page, and pages around current
                        const showPage =
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1);

                        // Show ellipsis
                        const showEllipsisBefore = page === currentPage - 2 && currentPage > 3;
                        const showEllipsisAfter = page === currentPage + 2 && currentPage < totalPages - 2;

                        if (showEllipsisBefore || showEllipsisAfter) {
                            return (
                                <span key={page} className="px-3 py-2 text-gray-500 dark:text-gray-400">
                                    ...
                                </span>
                            );
                        }

                        if (!showPage) return null;

                        return (
                            <button
                                key={page}
                                onClick={() => onPageChange(page)}
                                className={`px-4 py-2 rounded-md transition-colors duration-200 ${currentPage === page
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                                aria-label={`Go to page ${page}`}
                                aria-current={currentPage === page ? 'page' : undefined}
                            >
                                {page}
                            </button>
                        );
                    })}
                </div>

                {/* Next Button */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={!hasNextPage}
                    className="px-4 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    aria-label="Next page"
                >
                    Next
                </button>
            </div>

            {/* Pagination Info */}
            {totalItems > 0 && (
                <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} books
                </div>
            )}
        </>
    );
};

export default Pagination;
