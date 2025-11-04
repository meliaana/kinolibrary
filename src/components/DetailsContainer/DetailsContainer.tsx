import { useSelector } from '@xstate/react';
import { useEffect } from 'react';
import { orderDetailsActor } from '../../machines/orders.machine';
import { OrderDetailsDetailsItem } from '../OrderDetailsDetailsItem';
import { OrderIformation } from '../OrderIformation';
import { ProjectDetails } from '../ProjectDetails';
import { TimeDetails } from '../TimeDetails';
import styles from './DetailsContainer.module.css';

const DetailsContainer = () => {
  const orderDetails = useSelector(
    orderDetailsActor,
    (state) => state.context.orderDetails,
  );

  useEffect(() => {
    orderDetailsActor.send({ type: 'order.details.load' });
  }, []);

  if (!orderDetails) return null;

  console.log(orderDetails);

  return (
    <div className={styles.detailsContainer}>
      <OrderDetailsDetailsItem title="Order Information">
        <OrderIformation
          propertyItems={[
            { label: 'Job Number', value: orderDetails.jobReferenceNumber },
            {
              label: 'Sales Person',
              value:
                orderDetails.salesPerson.firstName +
                ' ' +
                orderDetails.salesPerson.surName,
            },
            { label: 'Your Company', value: orderDetails.company.name },
          ]}
          isReadOnly={true}
        />
      </OrderDetailsDetailsItem>
      <OrderDetailsDetailsItem title="Project Details">
        <ProjectDetails />
        <TimeDetails />
      </OrderDetailsDetailsItem>
    </div>
  );
};

export default DetailsContainer;
