import React from 'react'

export interface HeaderProps {
  children?: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({children}) => {
  return <h4 className="font-semibold text-xl text-black dark:text-white mb-4">{children}</h4>
}
