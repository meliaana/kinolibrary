import { Fieldset } from '../Fieldset';
import { UpdateInfoDialog } from '../UpdateInfoDialog';
import styles from './PersonalInfoDialog.module.css';

const PersonalInfoDialog = () => (
  <UpdateInfoDialog
    title="Edit Personal Information"
    description="Update your personal details to keep your profile up-to-date."
  >
    <div className={styles.wrapper}>
      <Fieldset label="Name" value="Musharof" onChange={() => {}} />
      <Fieldset label="Surname" value="Chowdhury" onChange={() => {}} />
      <Fieldset
        label="Email Address"
        value="randomuser@pimjo.com"
        onChange={() => {}}
      />
      <Fieldset label="Phone" value="+09 363 398 46" onChange={() => {}} />
      <Fieldset
        label="Bio"
        value="Team Manager"
        onChange={() => {}}
        className={styles.bioFieldset}
      />
    </div>
  </UpdateInfoDialog>
);

export default PersonalInfoDialog;
