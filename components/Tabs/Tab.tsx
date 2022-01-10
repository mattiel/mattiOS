import React from 'react'
import { useTabs } from "./Tabs";

export interface TabProps {
  /**
   * The label of the tab.
   */
  label: string;
  /**
   * The value of the tab.
   */
  value: any;
}

export const Tab: React.FC<TabProps> = props => {
  const { activeTab, setActiveTab } = useTabs();

  return (
    <button
      className={`text-xl transition-colors dark:hover:text-gray-200 hover:text-gray-700 ${activeTab === props.value ? 'dark:text-white' : 'dark:text-gray-500 '}`}
      onClick={() => setActiveTab(props.value)}
    >
      {props.label}
    </button>
  )
}