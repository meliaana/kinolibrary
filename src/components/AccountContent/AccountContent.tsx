import { AccountItem } from '../AccountItem';
import { AccountMainInfoItem } from '../AccountMainInfoItem';
import { MainContent } from '../MainContent';
import styles from './AccountContent.module.css';

const AccountContent = () => {
  return (
    <MainContent title="Account">
      <div className={styles.profileContainer}>
        <h3 className={styles.profileTitle}>Profile</h3>
        <AccountMainInfoItem />
        <AccountItem
          title="Personal Information"
          formFields={[
            {
              key: 'First Name',
              value: 'Musharof',
            },
            {
              key: 'Last Name',
              value: 'Chowdhury',
            },
            {
              key: 'Email Address',
              value: 'randomuser@pimjo.com',
            },
            {
              key: 'Phone',
              value: '+09 363 398 46',
            },
            {
              key: 'Bio',
              value: 'Team Manager',
            },
          ]}
        ></AccountItem>
        <AccountItem
          title="Address"
          formFields={[
            {
              key: 'Country',
              value: 'United States',
            },
            {
              key: 'City/State',
              value: 'Phoenix, United States',
            },
            {
              key: 'Postal Code',
              value: 'ERT 2489',
            },
            {
              key: 'TAX ID',
              value: 'AS4568384',
            },
          ]}
        ></AccountItem>
      </div>
    </MainContent>
  );
};

export default AccountContent;
