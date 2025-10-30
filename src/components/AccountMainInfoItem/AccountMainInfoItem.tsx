import styles from './AccountMainInfoItem.module.css';

const AccountMainInfoItem = () => {
  return (
    <div className={styles.accountItem}>
      <h4 contentEditable="true" className={styles.accountItemTitle}>
        Musharof Chowdhury
      </h4>
      <div className={styles.accountDescription}>
        <span>Team Manager</span> | <span>Arizona, United States</span>
      </div>
    </div>
  );
};

export default AccountMainInfoItem;
