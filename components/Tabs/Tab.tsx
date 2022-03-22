import React from 'react'
import { useTabs } from "./Tabs";
import clsx from 'clsx';

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
      className={clsx(
        "text-xl transition-colors dark:hover:text-gray-200 hover:text-gray-700",
        activeTab === props.value ? "text-black dark:text-white" : "text-gray-400 dark:text-gray-500")}
      onClick={() => setActiveTab(props.value)}
    >
      {props.label}
    </button>
  )
}