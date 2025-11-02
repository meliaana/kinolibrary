import clsx from "clsx";
import React from "react";
import { TabsContext } from "./Tabs";
import styles from "./TabsPanel.module.css";

interface TabsPanelPros {
  value: any;
  className?: string;
}

function TabsPanel({
  value,
  children,
  className,
}: React.PropsWithChildren<TabsPanelPros>) {
  const context = React.useContext(TabsContext);
  const active = context.value === value;
  const id = `${context.id || "tabs"}-panel-${value}`;
  const tabId = `${context.id || "tabs"}-tab-${value}`;

  if (!active) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      id={id}
      tabIndex={active ? 0 : -1}
      aria-labelledby={tabId}
      className={clsx(styles.wrapper, className)}
    >
      {children}
    </div>
  );
}

export default TabsPanel;
