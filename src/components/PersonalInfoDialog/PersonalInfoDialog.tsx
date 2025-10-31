import { UpdateInfoDialog } from '../UpdateInfoDialog';
import styles from './PersonalInfoDialog.module.css';

const PersonalInfoDialog = () => (
  <UpdateInfoDialog>
    <fieldset className={styles.fieldset}>
      <label className={styles.label} htmlFor="name">
        Name
      </label>
      <input
        className={styles.input}
        id="name"
        defaultValue="Musharof Chowdhury"
      />
    </fieldset>
    <fieldset className={styles.fieldset}>
      <label className={styles.label} htmlFor="email">
        Email Address
      </label>
      <input
        type="email"
        className={styles.input}
        id="email"
        defaultValue="randomuser@pimjo.com"
      />
    </fieldset>
    <fieldset className={styles.fieldset}>
      <label className={styles.label} htmlFor="phone">
        Phone
      </label>
      <input
        className={styles.input}
        id="phone"
        defaultValue="+09 363 398 46"
      />
    </fieldset>
    <fieldset className={styles.fieldset}>
      <label className={styles.label} htmlFor="bio">
        Bio
      </label>
      <input className={styles.input} id="bio" defaultValue="Team Manager" />
    </fieldset>
  </UpdateInfoDialog>
);

export default PersonalInfoDialog;
