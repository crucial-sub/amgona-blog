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
      className={`relative p-2 desktop:mr-9 mobile:mr-6 text-base font-semibold hover:text-white transition-all duration-300 ${
        isSelected ? 'text-white' : 'text-lightGray'
      }`}
      disabled={isSelected}
      onClick={() => onClick(title)}
    >
      {title}
      <span
        className={`absolute left-1/2 -translate-x-1/2 bottom-0 h-[3px] bg-yellow ${
          isSelected && 'animate-stretch w-full'
        }`}
      />
    </button>
  )
}

export default CategoryButton
