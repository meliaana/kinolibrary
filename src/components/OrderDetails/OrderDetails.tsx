import { MainContent } from '../MainContent';
import styles from './OrderDetails.module.css';

const OrderDetails = () => {
  return (
    <MainContent title="Order Details">
      <div className={styles.profileContainer}>
        <h3 className={styles.profileTitle}>Profile</h3>
      </div>
    </MainContent>
  );
};

export default OrderDetails;
