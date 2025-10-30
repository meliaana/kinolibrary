import { PropsWithChildren, useEffect, useState } from 'react';
import styles from './VisuallyHidden.module.css';

const VisuallyHidden = ({ children, ...delegated }: PropsWithChildren) => {
  const [forceShow, setForceShow] = useState(false);

  useEffect(() => {
    if (import.meta.env.NODE_ENV !== 'production') {
      const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.key === 'Alt') {
          setForceShow(true);
        }
      };

      const handleKeyUp = (ev: KeyboardEvent) => {
        if (ev.key === 'Alt') {
          setForceShow(false);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
      };
    }
  }, []);

  if (forceShow) {
    return children;
  }

  return (
    <span className={styles.visuallyHidden} {...delegated}>
      {children}
    </span>
  );
};

export default VisuallyHidden;
