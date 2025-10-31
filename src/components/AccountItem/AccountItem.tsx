import { PropsWithChildren } from 'react';
import styles from './AccountItem.module.css';

interface FormField {
  key: string;
  value: string;
}

interface AccountItemProps {
  title: string;
  dialogTrigger: React.ReactNode;
}

const AccountItem = ({
  title,
  dialogTrigger,
  children,
}: PropsWithChildren<AccountItemProps>) => {
  return (
    <section className={styles.accountItem}>
      <header className={styles.accountItemHeader}>
        <h4 className={styles.accountItemTitle}>{title}</h4>
        <div className={styles.editButton}>{dialogTrigger}</div>
      </header>

      {children}
    </section>
  );
};

export default AccountItem;
