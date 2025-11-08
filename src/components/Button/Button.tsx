import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import { PrimitiveButton } from '../PrimitiveButton';
import { VisuallyHidden } from '../VisuallyHidden';
import styles from './Button.module.css';

interface ButtonProps
  extends React.ComponentPropsWithRef<typeof PrimitiveButton> {
  ariaLabel?: string;
  variant?: 'colored' | 'outlined';
}

function Button({
  ariaLabel,
  children,
  className,
  variant = 'outlined',
  ...delegated
}: PropsWithChildren<ButtonProps>) {
  return (
    <PrimitiveButton
      className={clsx(styles.wrapper, className, {
        [styles.colored!]: variant === 'colored',
      })}
      {...delegated}
    >
      <span aria-hidden={!!ariaLabel}>{children}</span>
      {ariaLabel && <VisuallyHidden>{ariaLabel}</VisuallyHidden>}
    </PrimitiveButton>
  );
}

export default Button;
