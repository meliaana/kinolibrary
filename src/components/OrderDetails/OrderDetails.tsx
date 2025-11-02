import { useEffect, useState } from 'react';
import { MainContent } from '../MainContent';
import { OrderDetailsItemsItem } from '../OrderDetailsItemsItem';
import { Tabs, TabsList, TabsPanel, TabsTab } from '../Tabs';
import styles from './OrderDetails.module.css';

const OrderDetails = () => {
  const [order, setOrder] = useState<any>(null);

  const fetchOrders = async () => {
    const ordersData = await import('./orderDetailsexample.json');
    setOrder(ordersData.default);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (!order) return null;

  return (
    <MainContent title="Order Details">
      <div className={styles.orderDetailsContainer}>
        <h3 className={styles.profileTitle}>{order.job.jobName}</h3>
        <Tabs initialValue="items">
          <TabsList className={styles.tabsList} aria-label="Tabs">
            <TabsTab value="items">
              <span>Items</span>
            </TabsTab>
            <TabsTab value="details">
              <span>Details</span>
            </TabsTab>
          </TabsList>
          <TabsPanel value="items">
            <OrderDetailsItemsItem orderItems={order.orderItems} />
          </TabsPanel>
          <TabsPanel value="details">
            <div>Details</div>
          </TabsPanel>
        </Tabs>
      </div>
    </MainContent>
  );
};

export default OrderDetails;
