import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const MAX_PAGES_TO_SHOW = 5;

  const getPageNumbers = () => {
    if (totalPages === 1) {
      return [1];
    }

    const pageNumbers = [];

    pageNumbers.push(1);

    const startPage = Math.max(currentPage - Math.floor(MAX_PAGES_TO_SHOW / 2), 2);
    const endPage = Math.min(startPage + MAX_PAGES_TO_SHOW - 1, totalPages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      pageNumbers.push(totalPages);
    }

    if (pageNumbers[1] !== 2) {
      pageNumbers.splice(1, 0, '...');
    }
    if (pageNumbers[pageNumbers.length - 2] !== totalPages - 1) {
      pageNumbers.splice(pageNumbers.length - 1, 0, '...');
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center mt-4 bg-white py-4">
      <div className="flex items-center">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md bg-gray-200 text-gray-500 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <FaAngleLeft className="mr-1" />
          Previous
        </button>
        <span className="mx-4">
          {pageNumbers.map((pageNumber, index) => (
            <button
              key={index}
              onClick={() => onPageChange(pageNumber)}
              className={`px-3 py-1 rounded-md ${
                pageNumber === currentPage
                  ? 'bg-purple-600 text-white'
                  : pageNumber === '...'
                  ? 'bg-gray-200 text-gray-500 cursor-default'
                  : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
              } mx-1`}
              disabled={pageNumber === '...'}
            >
              {pageNumber}
            </button>
          ))}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md bg-gray-200 text-gray-500 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          Next
          <FaAngleRight className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
