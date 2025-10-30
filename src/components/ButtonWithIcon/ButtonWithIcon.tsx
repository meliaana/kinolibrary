import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import { PrimitiveButton } from '../PrimitiveButton';
import styles from './ButtonWithIcon.module.css';

type ButtonWithIconProps = {
  text: string;
  className?: string;
  needsTextAlign?: boolean;
} & React.ComponentPropsWithoutRef<'button'>;

function ButtonWithIcon({
  text,
  children,
  className,
  needsTextAlign,
  ...buttonProps
}: PropsWithChildren<ButtonWithIconProps>) {
  return (
    <PrimitiveButton
      className={clsx(styles.wrapper, className)}
      {...buttonProps}
    >
      <div className={styles.content}>
        <div className={styles.iconWrapper}>{children}</div>
        <span className={clsx({ [styles.textAlign!]: needsTextAlign })}>
          {text}
        </span>
      </div>
    </PrimitiveButton>
  );
}

export default ButtonWithIcon;
