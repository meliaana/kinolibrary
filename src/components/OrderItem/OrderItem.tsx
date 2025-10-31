import { Button } from '../Button';
import { EditIcon } from '../EditIcon';
import styles from './OrderItem.module.css';

const OrderItem = ({ order }: { order: any }) => {
  return (
    <li key={order.id} className={styles.wrapper}>
      <Button className={styles.jobNumber}>#{order.jobRefNo}</Button>
      <span className={styles.salesPerson}>
        <span className={styles.surName}>{order.salesPerson.surName}</span>
        <span className={styles.firstName}>{order.salesPerson.firstName}</span>
      </span>
      <span className={styles.companyName}>{order.company.name}</span>
      <span>{order.orderStatus}</span>
      <span className={styles.numberOfClips}>{order.numberOfClips}</span>
      <button>
        <EditIcon />
      </button>
    </li>
  );
};

export default OrderItem;
