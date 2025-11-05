import { useSelector } from '@xstate/react';
import { useState } from 'react';
import { orderDetailsActor } from '../../machines/orders.machine';
import { DetailsContainer } from '../DetailsContainer';
import { MainContent } from '../MainContent';
import { OrderDetailsItemsDesc } from '../OrderDetailsItemsDesc';
import { Tabs, TabsList, TabsPanel, TabsTab } from '../Tabs';
import styles from './OrderDetails.module.css';

const OrderDetails = () => {
  const [order, setOrder] = useState<any>(null);
  const [jobName, setJobName] = useState<string>('');
  const projectName = useSelector(
    orderDetailsActor,
    (state) => state.context.projectName,
  );

  return (
    <MainContent title="Order Details">
      <div className={styles.orderDetailsContainer}>
        <h3
          // contentEditable={true}
          onBlur={(e) => setJobName(e.target.innerText)}
          className={styles.profileTitle}
        >
          {projectName}
        </h3>
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
            <div className={styles.orderDetailsItemsContainer}>
              {/* <OrderDetailsItemsItem orderItems={order.orderItems} /> */}
              <OrderDetailsItemsDesc />
            </div>
          </TabsPanel>
          <TabsPanel value="details">
            <DetailsContainer />
          </TabsPanel>
        </Tabs>
      </div>
    </MainContent>
  );
};

export default OrderDetails;
