import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DetailsContainer } from '../DetailsContainer';
import { MainContent } from '../MainContent';
import { OrderDetailsItemsDesc } from '../OrderDetailsItemsDesc';
import { OrderDetailsItemsItem } from '../OrderDetailsItemsItem';
import { Tabs, TabsList, TabsPanel, TabsTab } from '../Tabs';
import styles from './OrderDetails.module.css';

const OrderDetails = () => {
  const [orderClips, setOrderClips] = useState<any>(null);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [jobName, setJobName] = useState<string>('');
  const location = useLocation();
  const orderId = location.pathname.split('/')[3];

  useEffect(() => {
    const fetchOrder = async () => {
      const projectResponse = await fetch(`/api/orders/${orderId}`);
      const projectData = await projectResponse.json();
      setJobName(projectData.projectName);

      const response = await fetch(`/api/orders/${orderId}/clips`);
      const data = await response.json();
      setOrderClips(data);

      const detailsResponse = await fetch(`/api/orders/${orderId}/details`);
      const detailsData = await detailsResponse.json();
      setOrderDetails(detailsData);
    };

    fetchOrder();
  }, [orderId]);

  return (
    <MainContent title="Order Details">
      <div className={styles.orderDetailsContainer}>
        <h3
          // contentEditable={true}
          onBlur={(e) => setJobName(e.target.innerText)}
          className={styles.profileTitle}
        >
          {jobName}
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
              <OrderDetailsItemsItem
                orderClips={orderClips ? orderClips.orderItems : []}
              />
              <OrderDetailsItemsDesc />
            </div>
          </TabsPanel>
          <TabsPanel value="details">
            <DetailsContainer
              orderDetails={orderDetails}
              setOrderDetails={setOrderDetails}
            />
          </TabsPanel>
        </Tabs>
      </div>
    </MainContent>
  );
};

export default OrderDetails;
