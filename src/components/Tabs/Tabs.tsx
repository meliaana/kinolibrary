import React from "react";

export const TabsContext = React.createContext<{
  value?: any;
  onChange?: (value: any) => void;
  id?: string;
}>({});

function Tabs({
  children,
  initialValue,
  className,
}: React.PropsWithChildren<{
  initialValue: any;
  className?: string;
}>) {
  const [value, setValue] = React.useState(initialValue);
  const id = React.useId();

  function handleChange(newValue: any) {
    setValue(newValue);
  }

  const memoizedContextValue = React.useMemo(
    () => ({ value, onChange: handleChange, id }),
    [value, id, handleChange]
  );

  return (
    <TabsContext.Provider value={memoizedContextValue}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export default Tabs;
