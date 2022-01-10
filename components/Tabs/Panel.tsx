import React from 'react'
import { useTabs } from "./Tabs";

export interface PanelProps {
  /**
   * Unique identifier for the panel.
   */
  value: any
}

export const Panel: React.FC<PanelProps> = ({ value, children }) => {
  const { activeTab } = useTabs();
  return activeTab === value ? <div className="w-full">{children}</div> : null
}