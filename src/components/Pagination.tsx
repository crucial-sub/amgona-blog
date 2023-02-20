/* eslint-disable @next/next/no-img-element */
import React from 'react'
import PageButton from './PageButton'

interface PaginationProps {
  currentPage: number
  paginate: (pageNumber: number) => void
  lastPageNumber: number
  currentPageNumbers: number[]
}

const Pagination = ({
  currentPage,
  paginate,
  lastPageNumber,
  currentPageNumbers,
}: PaginationProps) => {
  return (
    <nav className="flex justify-center w-full desktop:mt-28 mobile:mt-16">
      <ul className="inline-flex items-center -space-x-px gap-2">
        <li>
          <button
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ${
              currentPage !== 1 && 'hover:bg-lightNavy'
            }`}
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >
            <img
              src={'/images/arrow-left-white.svg'}
              alt="arrow-left"
              width={20}
              height={20}
            />
          </button>
        </li>

        {currentPageNumbers.map(pageNumber => (
          <PageButton
            key={pageNumber}
            pageNumber={pageNumber}
            paginate={paginate}
            isSelected={currentPage === pageNumber}
          />
        ))}

        <li className={'flex items-center justify-center'}>
          <button
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ${
              currentPage !== lastPageNumber && 'hover:bg-lightNavy'
            }`}
            disabled={currentPage === lastPageNumber}
            onClick={() => paginate(currentPage + 1)}
          >
            <img
              src={'/images/arrow-right-white.svg'}
              width={20}
              height={20}
              alt="arrow-right"
            />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
