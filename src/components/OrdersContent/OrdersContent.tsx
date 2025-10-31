import { useEffect, useState } from 'react';
import { MainContent } from '../MainContent';
import { OrderItem } from '../OrderItem';
import { SearchInput } from '../SearchInput';
import styles from './OrdersContent.module.css';

const OrdersContent = () => {
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    const ordersData = await import('./ordersexample.json');
    setOrders(ordersData.default);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  console.log(orders);

  return (
    <MainContent title="Orders">
      <SearchInput />
      <ul className={styles.ordersList}>
        <li className={styles.ordersListHeader}>
          <span>Job Number</span>
          <span>Sales Person</span>
          <span>Client Name</span>
          <span>Order Status</span>
          <span>Number of Clips</span>
          <span>Actions</span>
        </li>
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </ul>
    </MainContent>
  );
};

export default OrdersContent;
