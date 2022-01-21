import React from 'react'
import clsx from 'clsx'

export interface DescProps {
  children?: React.ReactNode
  className?: string
}

export const Desc: React.FC<DescProps> = ({children, className}) => {
  return (
    <p className={clsx(
      "text-gray-800 dark:text-gray-300 leading-normal mb-6",
      className
    )}>
      {children}
    </p>
  )
}