import { Fieldset } from '../Fieldset';
import { UpdateInfoDialog } from '../UpdateInfoDialog';
import styles from './AdreesInfoDialog.module.css';

const AdreesInfoDialog = () => (
  <UpdateInfoDialog
    title="Edit Address Information"
    description="Update your address details to keep your profile up-to-date."
  >
    <div className={styles.wrapper}>
      <Fieldset label="Country" value="United States" onChange={() => {}} />
      <Fieldset
        label="City/State"
        value="Phoenix, United States"
        onChange={() => {}}
      />
      <Fieldset label="Postal Code" value="ERT 2489" onChange={() => {}} />
      <Fieldset label="TAX ID" value="AS4568384" onChange={() => {}} />
    </div>
  </UpdateInfoDialog>
);

export default AdreesInfoDialog;
