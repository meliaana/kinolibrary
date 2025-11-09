import { useApiFetch } from '@/hooks/useApiFetch';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DetailsContainer } from '../DetailsContainer';
import { JobName } from '../JobName';
import { MainContent } from '../MainContent';
import { Tabs, TabsList, TabsPanel, TabsTab } from '../Tabs';
import styles from './OrderDetails.module.css';
import OrderDetailsItem from './OrderDetailsItem';

const OrderDetails = () => {
  const [orderClips, setOrderClips] = useState<any>(null);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [jobName, setJobName] = useState<string>('');
  const location = useLocation();
  const orderId = location.pathname.split('/')[3];
  const apiFetch = useApiFetch();

  useEffect(() => {
    const fetchOrder = async () => {
      const projectResponse = await apiFetch(`/api/orders/${orderId}`, {
        method: 'GET',
      });
      const projectData = await projectResponse.json();
      setJobName(projectData.projectName);

      const clipsResponse = await apiFetch(`/api/orders/${orderId}/clips`, {
        method: 'GET',
      });
      const clipsData = await clipsResponse.json();
      setOrderClips(clipsData);

      const detailsResponse = await apiFetch(`/api/orders/${orderId}/details`, {
        method: 'GET',
      });
      const detailsData = await detailsResponse.json();
      setOrderDetails(detailsData);
    };

    fetchOrder();
  }, [orderId]);

  return (
    <MainContent title="Order Details">
      <div className={styles.orderDetailsContainer}>
        <JobName
          orderId={orderId ?? ''}
          jobName={jobName}
          setJobName={setJobName}
        />
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
            <OrderDetailsItem
              orderClips={orderClips ? orderClips.orderItems : []}
            />
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
