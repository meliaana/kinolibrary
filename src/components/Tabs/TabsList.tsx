import clsx from "clsx";
import React, { useRef, useState } from "react";
import styles from "./TabsList.module.css";

interface TabsListProps {
  "aria-label": string;
  className?: string;
}

function TabsList({
  children,
  "aria-label": ariaLabel,
  className,
}: React.PropsWithChildren<TabsListProps>) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const tabsListRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(event.clientX - tabsListRef.current!.offsetLeft);
    setScrollLeft(tabsListRef.current!.scrollLeft);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    event.preventDefault();
    const x = event.clientX - tabsListRef.current!.offsetLeft;
    const scroll = x - startX;
    tabsListRef.current!.scrollLeft = scrollLeft - scroll;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={clsx(styles.wrapper, className)}
      ref={tabsListRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {children}
    </div>
  );
}

export default TabsList;
