import clsx from "clsx";
import React from "react";
import { PrimitiveButton } from "../PrimitiveButton";
import { TabsContext } from "./Tabs";
import styles from "./TabsTab.module.css";

interface TabsTabProps
  extends Omit<React.ComponentPropsWithRef<typeof PrimitiveButton>, "onClick"> {
  value: any;
}

function TabsTab({
  children,
  value,
  className,
  disabled,
  ...delegated
}: React.PropsWithChildren<TabsTabProps>) {
  const context = React.useContext(TabsContext);
  const active = context.value === value;
  const id = `${context.id || "tabs"}-tab-${value}`;
  const panelId = `${context.id || "tabs"}-panel-${value}`;

  return (
    <PrimitiveButton
      id={id}
      data-testid={`tabs-tab-${value}`}
      data-selected={active}
      aria-selected={active}
      aria-controls={panelId}
      role="tab"
      disabled={disabled}
      tabIndex={active ? 0 : -1}
      onClick={() => context.onChange?.(value)}
      className={clsx(styles.wrapper, className, {
        [styles["wrapper--active"]]: active,
      })}
      {...delegated}
    >
      <span className={styles.name}>{children}</span>
    </PrimitiveButton>
  );
}

export default TabsTab;
