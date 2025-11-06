import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../Button';
import styles from './JobName.module.css';

const JobName = ({
  orderId,
  jobName,
  setJobName,
}: {
  orderId: string;
  jobName: string;
  setJobName: (jobName: string) => void;
}) => {
  const [innerValue, setInnerValue] = useState(jobName);

  useEffect(() => {
    setInnerValue(jobName);
  }, [jobName]);

  async function handleSave() {
    const res = await fetch(`/api/orders/${orderId}/project-name`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projectName: innerValue,
      }),
    });
    if (!res.ok) throw new Error(`Failed to save job name: ${res.status}`);
    const data = await res.json();
    toast.success('Job name updated');
    setJobName(innerValue);
  }

  const hasChanged = innerValue !== jobName;

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        className={styles.input}
        value={innerValue ?? ''}
        onChange={(e) => setInnerValue(e.target.value)}
      />
      {hasChanged && (
        <Button className={styles.saveButton} onClick={handleSave}>
          Save
        </Button>
      )}
    </div>
  );
};

export default JobName;
