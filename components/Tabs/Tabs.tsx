import React, { useMemo, useState, createContext } from 'react';
import { Tab, TabProps } from './Tab';
import { Panel, PanelProps } from './Panel';

interface TabsComposition {
  Tab: React.FC<TabProps>;
  Panel: React.FC<PanelProps>;
}

interface TabsContext {
  activeTab: any;
  setActiveTab: (label: string) => void;
}

const TabsContext = createContext<TabsContext | undefined>(undefined);

const Tabs: React.FC & TabsComposition = props => {
  const [activeTab, setActiveTab] = useState("0")

  const memoizedContextValue = useMemo(
    () => ({
      activeTab,
      setActiveTab
    }),
    [activeTab, setActiveTab],
  );

  return(
    <TabsContext.Provider value={memoizedContextValue}>
      {props.children}
    </TabsContext.Provider>
  )
}

const useTabs = (): TabsContext => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('useTabs must be used within a <Tabs> component');
  }
  return context;
}

Tabs.Tab = Tab;
Tabs.Panel = Panel;

export { Tabs, TabsContext, useTabs };