import clsx from 'clsx';
import { useNavigate } from 'react-router';
import { Button } from '../Button';
import { ButtonWithIcon } from '../ButtonWithIcon';
import { EditIcon } from '../EditIcon';
import styles from './OrderItem.module.css';

const OrderItem = ({ order }: { order: any }) => {
  const navigate = useNavigate();

  const handleOpenDetails = () => {
    navigate(`/client/orders/${order.id}/details`);
  };

  return (
    <li key={order.id} className={styles.wrapper}>
      <Button className={styles.jobNumber} onClick={handleOpenDetails}>
        #{order.jobRefNo}
      </Button>
      <span className={styles.salesPerson}>
        <span className={styles.surName}>{order.salesPerson.surName}</span>
        <span className={styles.firstName}>{order.salesPerson.firstName}</span>
      </span>
      <span className={styles.companyName}>{order.company.name}</span>
      <span>
        <p data-status={order.orderStatus} className={clsx(styles.orderStatus)}>
          {order.orderStatus}
        </p>
      </span>
      <span className={styles.numberOfClips}>{order.numberOfClips}</span>
      <ButtonWithIcon text="Edit" onClick={handleOpenDetails}>
        <EditIcon />
      </ButtonWithIcon>
    </li>
  );
};

export default OrderItem;
