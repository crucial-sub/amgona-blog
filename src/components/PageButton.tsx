import React from 'react'

interface PageButtonProps {
  pageNumber: number
  isSelected: boolean
  paginate: (pageNumber: number) => void
}

const PageButton = ({ pageNumber, isSelected, paginate }: PageButtonProps) => {
  return (
    <li key={pageNumber} className={`flex justify-center items-center`}>
      <button
        className={`tablet:w-10 tablet:h-10 mobile:w-7 mobile:h-7 rounded-full transition-all duration-200  ${
          isSelected
            ? 'text-white bg-lightNavy'
            : 'text-gray hover:bg-lightNavy hover:text-white'
        }`}
        onClick={() => paginate(pageNumber)}
        disabled={isSelected}
      >
        {pageNumber}
      </button>
    </li>
  )
}

export default PageButton
