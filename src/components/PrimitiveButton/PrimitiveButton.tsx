import clsx from "clsx";
import { forwardRef } from "react";
import styles from "./PrimitiveButton.module.css";

const PrimitiveButton = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>((props, ref) => {
  const { className, ...delegated } = props;

  return (
    <button
      ref={ref}
      {...delegated}
      className={clsx(styles.wrapper, className)}
    />
  );
});

export default PrimitiveButton;
