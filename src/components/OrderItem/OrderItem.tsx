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

  const handleOrderStatus = (status: number) => {
    switch (status) {
      case 0:
        return 'NotPrepared';
      case 1:
        return 'WaitingDetails';
      case 2:
        return '2';
      case 3:
        return 'Completed';
    }
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
      <span
        className={clsx(
          styles.orderStatus,
          // styles[handleOrderStatus(order.orderStatus)
        )}
      >
        {handleOrderStatus(order.orderStatus)}
      </span>
      <span className={styles.numberOfClips}>{order.numberOfClips}</span>
      <ButtonWithIcon text="Edit" onClick={handleOpenDetails}>
        <EditIcon />
      </ButtonWithIcon>
    </li>
  );
};

export default OrderItem;
