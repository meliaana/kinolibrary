import styles from './PropetyItem.module.css';

const PropetyItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className={styles.propetyItem}>
      <dt className={styles.propetyItemKey}>{label}</dt>
      <dd className={styles.propetyItemValue}>{value}</dd>
    </div>
  );
};

export default PropetyItem;
