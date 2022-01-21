import React from 'react'
import clsx from 'clsx'

export interface DataProps {
  children?: React.ReactNode
  data: Array<{ label: string, value: number }>
}

export const Data: React.FC<DataProps> = ({ data}) => {
  return (
    <div className={clsx(
      'grid gap-6',
      data.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
    )}>
      {
        data.map(item => {
          return (
            <dl className="self-start" key={item.label}>
              <dt className="text-gray-500 dark:text-gray-400 text-base text-medium">
                {item.label}
              </dt>
              <dl className="text-4xl inline-block font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-purple-600 dark:from-pink-500  dark:to-purple-800">
                {item.value}
              </dl>
            </dl>
          )
        })
      }
    </div>
  )
}
