import { AccountItem } from '../AccountItem';
import { AccountMainInfoItem } from '../AccountMainInfoItem';
import { AdreesInfoDialog } from '../AdreesInfoDialog';
import { MainContent } from '../MainContent';
import { PersonalInfoDialog } from '../PersonalInfoDialog';
import { PropetyItem } from '../PropetyItem';
import styles from './AccountContent.module.css';

const AccountContent = () => {
  return (
    <MainContent title="Account">
      <div className={styles.profileContainer}>
        <h3 className={styles.profileTitle}>Profile</h3>
        <AccountMainInfoItem />
        <AccountItem
          title="Personal Information"
          dialogTrigger={<PersonalInfoDialog />}
        >
          <div className={styles.itemContainer}>
            <PropetyItem label="Name" value="Musharof Chowdhury" />
            <PropetyItem label="Email Address" value="randomuser@pimjo.com" />
            <PropetyItem label="Phone" value="+09 363 398 46" />
            <PropetyItem label="Bio" value="Team Manager" />
          </div>
        </AccountItem>
        <AccountItem title="Address" dialogTrigger={<AdreesInfoDialog />}>
          <div className={styles.itemContainer}>
            <PropetyItem label="Country" value="United States" />
            <PropetyItem label="City/State" value="Phoenix, United States" />
            <PropetyItem label="Postal Code" value="ERT 2489" />
            <PropetyItem label="TAX ID" value="AS4568384" />
          </div>
        </AccountItem>
      </div>
    </MainContent>
  );
};

export default AccountContent;
