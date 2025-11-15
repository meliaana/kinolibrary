import { useState } from 'react';
import { Fieldset } from '../Fieldset';
import { PrimitiveButton } from '../PrimitiveButton';
import { UpdateInfoDialog } from '../UpdateInfoDialog';
import styles from './AddNewOrderDialog.module.css';

const AddNewOrderDialog = () => {
  const [title, setTitle] = useState('');

  function handleSave() {
    console.log('save', title);
  }

  return (
    <UpdateInfoDialog
      title="Add New Order"
      description="Add a new order to your account."
      trigger={
        <PrimitiveButton className={styles.addNewOrderButton}>
          + Add Order
        </PrimitiveButton>
      }
      onSave={handleSave}
    >
      <div className={styles.wrapper}>
        <Fieldset label="Title" value={title} onChange={setTitle} />
      </div>
    </UpdateInfoDialog>
  );
};

export default AddNewOrderDialog;
