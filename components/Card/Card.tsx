import React from 'react'
import clsx from "clsx"
import { Header, HeaderProps } from './Header'
import { Desc, DescProps} from './Desc';
import { Data, DataProps} from './Data'


interface CardTypes {
  className?: string
  children?: React.ReactNode
}

export interface CardComposition {
  Header: React.FC<HeaderProps>
  Desc: React.FC<DescProps>
  Data: React.FC<DataProps>
}

const Card: React.FC<CardTypes> & CardComposition = ({ children, className }) => {
  return (
    <div className={
      clsx(
        "inline-block bg-gray-50 border border-100 dark:bg-gray-900 dark:border-gray-800 bg-gradient-to-br from-white dark:from-transparent dark:to-pink-900/20 to-pink-50/20 rounded-lg shadow-xl dark:shadow-gray-900/20 overflow-hidden gap-4 px-8 pt-8 pb-6 text-sm md:text-base not-prose sm:max-w-[30rem] max-w-[calc(320px-2rem)]",
        className
      )
    }>
      {children}
    </div>
  )
}

Card.Header = Header
Card.Desc = Desc
Card.Data = Data
export default Card