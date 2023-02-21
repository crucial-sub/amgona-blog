/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-undef */
import React from 'react'

interface BadgeProps {
  image: string
  title: string
}

const Badge = ({ image, title }: BadgeProps) => {
  return (
    <div
      className={
        'border border-gray rounded-lg px-3 py-1.5 inline-flex items-center justify-center cursor-default'
      }
    >
      <img
        className={'w-6 h-5 mr-2 -ml-1'}
        src={`${image}`}
        alt="skill-icon"
        width={35}
        height={35}
      />
      <h6 className={'text-navy text-sm font-medium'}>{title}</h6>
    </div>
  )
}

export default Badge
