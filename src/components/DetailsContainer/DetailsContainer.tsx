import { OrderDetailsDetailsItem } from '../OrderDetailsDetailsItem';
import { OrderIformation } from '../OrderIformation';
import { ProjectDetails } from '../ProjectDetails';
import { TimeDetails } from '../TimeDetails';
import styles from './DetailsContainer.module.css';

const DetailsContainer = () => {
  return (
    <div className={styles.detailsContainer}>
      <OrderDetailsDetailsItem title="Order Information">
        <OrderIformation
          propertyItems={[
            { label: 'Job Number', value: 'JOB-2024-001' },
            { label: 'Sales Person', value: 'John Smith' },
            { label: 'Your Company', value: 'Acme Corporation' },
          ]}
          isReadOnly={true}
        />
      </OrderDetailsDetailsItem>
      <OrderDetailsDetailsItem title="Project Details">
        <ProjectDetails />
      </OrderDetailsDetailsItem>
      <OrderDetailsDetailsItem title="Time Details">
        <TimeDetails />
      </OrderDetailsDetailsItem>
    </div>
  );
};

export default DetailsContainer;
