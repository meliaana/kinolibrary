import { UpdateInfoDialog } from '../UpdateInfoDialog';
import styles from './AdreesInfoDialog.module.css';

const AdreesInfoDialog = () => (
  <UpdateInfoDialog>
    <fieldset className={styles.fieldset}>
      <label className={styles.label} htmlFor="name">
        Country
      </label>
      <input className={styles.input} id="name" defaultValue="United States" />
    </fieldset>
    <fieldset className={styles.fieldset}>
      <label className={styles.label} htmlFor="city">
        City/State
      </label>
      <input
        className={styles.input}
        id="city"
        defaultValue="Phoenix, United States"
      />
    </fieldset>
    <fieldset className={styles.fieldset}>
      <label className={styles.label} htmlFor="postalCode">
        Postal Code
      </label>
      <input
        type="number"
        className={styles.input}
        id="postalCode"
        defaultValue="ERT 2489"
      />
    </fieldset>
  </UpdateInfoDialog>
);

export default AdreesInfoDialog;
