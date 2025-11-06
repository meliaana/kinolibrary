import { Toaster, useSonner } from 'sonner';
import styles from './ToastShelf.module.css';

const ToastShelf = () => {
  const { toasts } = useSonner();
  console.log(toasts);
  return (
    <div className={styles.wrapper}>
      <Toaster
        visibleToasts={4}
        offset={0}
        position="top-center"
        toastOptions={{
          classNames: {
            toast: styles.toast,
            content: styles.content,
            success: styles.success,
            error: styles.error,
            description: styles.description,
          },
        }}
      />
    </div>
  );
};

export default ToastShelf;
