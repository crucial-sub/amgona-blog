import React from 'react'

interface CategoryButtonProps {
  title: string
  onClick: (category: string) => void
  isSelected: boolean
}

const CategoryButton = ({
  title,
  onClick,
  isSelected,
}: CategoryButtonProps) => {
  return (
    <button
      className={`p-2 desktop:mr-9 mobile:mr-6 text-base font-semibold hover:text-white transition-all duration-200 ${
        isSelected
          ? 'text-white border-b-[3px] border-b-yellow'
          : 'text-lightGray border-none'
      }`}
      disabled={isSelected}
      onClick={() => onClick(title)}
    >
      {title}
    </button>
  )
}

export default CategoryButton
