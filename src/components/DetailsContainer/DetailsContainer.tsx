import { useApiFetch } from '@/hooks/useApiFetch';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../Button';
import { OrderDetailsDetailsItem } from '../OrderDetailsDetailsItem';
import { OrderIformation } from '../OrderIformation';
import { ProjectDetails } from '../ProjectDetails';
import { TimeDetails } from '../TimeDetails';
import styles from './DetailsContainer.module.css';

const durationMap = {
  1: 'day',
  2: 'week',
  3: 'month',
  4: 'year',
  5: 'perpetuity',
};

const DetailsContainer = ({
  orderDetails,
  setOrderDetails,
}: {
  orderDetails: any;
  setOrderDetails: (details: any) => void;
}) => {
  if (!orderDetails) return null;

  const apiFetch = useApiFetch();

  const baseRef = useRef({
    project: {
      transmission: orderDetails.transmission,
      territory: orderDetails.territoryId,
      platform: orderDetails.platformId,
    },
    time: {
      startDate: orderDetails.startDate,
      duration: orderDetails.duration,
      durationType:
        durationMap[orderDetails.durationType as keyof typeof durationMap],
    },
  });

  const [projectDetailsState, setProjectDetailsState] = useState(
    baseRef.current.project,
  );
  const [timeDetailsState, setTimeDetailsState] = useState(
    baseRef.current.time,
  );

  const handleCancel = () => {
    setProjectDetailsState(baseRef.current.project);
    setTimeDetailsState(baseRef.current.time);
  };

  const handleSave = async () => {
    try {
      const payload = {
        transmission: projectDetailsState.transmission,
        territoryId: projectDetailsState.territory,
        platformId: projectDetailsState.platform,
        startDate: new Date(timeDetailsState.startDate).toISOString(),
        duration: Number(timeDetailsState.duration),
        durationType: Object.keys(durationMap).find(
          (key) =>
            durationMap[key as unknown as keyof typeof durationMap] ===
            timeDetailsState.durationType,
        ),
      };

      const res = await apiFetch(
        `/api/orders/${orderDetails.orderId}/details`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      );

      const saved = await res.json();

      const nextProject = {
        transmission: saved.transmission,
        territory: saved.territoryId,
        platform: saved.platformId,
      };
      const nextTime = {
        startDate: saved.startDate,
        duration: saved.duration,
        durationType:
          durationMap[saved.durationType as keyof typeof durationMap],
      };

      setProjectDetailsState(nextProject);
      setTimeDetailsState(nextTime);
      baseRef.current = { project: nextProject, time: nextTime };
      setOrderDetails(saved);
      toast.success('Saved changes');
    } catch (error) {
      console.error(' Error saving order details:', error);
    }
  };

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
        <ProjectDetails
          projectDetailsState={projectDetailsState}
          setProjectDetailsState={setProjectDetailsState}
        />
        <TimeDetails
          timeDetailsState={timeDetailsState}
          setTimeDetailsState={setTimeDetailsState}
        />
      </OrderDetailsDetailsItem>

      <div className={styles.buttonsContainer}>
        <Button variant="colored" onClick={handleSave}>
          Save Changes
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </div>
    </div>
  );
};

export default DetailsContainer;
