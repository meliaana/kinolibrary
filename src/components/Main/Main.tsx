import clsx from 'clsx';
import { AccountContent } from '../AccountContent';
import { AccountIcon } from '../AccountIcon';
import { OdersIcon } from '../OdersIcon';
import { OrdersContent } from '../OrdersContent';
import { TabsList, TabsPanel, TabsTab } from '../Tabs';
import styles from './Main.module.css';

const Main = ({ isOpen }: { isOpen: boolean }) => {
  const tabsList = [
    {
      value: 'orders',
      label: 'Orders',
      icon: <OdersIcon />,
      content: <OrdersContent />,
    },
    {
      value: 'account',
      label: 'Account',
      icon: <AccountIcon />,
      content: <AccountContent />,
    },
  ];

  return (
    <div className={styles.mainContainer}>
      <TabsList
        aria-label="Tabs"
        className={clsx(styles.sidebar, { [styles.open!]: isOpen })}
      >
        {tabsList.map((tab) => (
          <TabsTab
            key={tab.value}
            value={tab.value}
            className={styles.sidebarTab}
          >
            <div
              className={clsx(styles.sidebarButton, { [styles.open!]: isOpen })}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </div>
          </TabsTab>
        ))}
      </TabsList>
      {tabsList.map((tab) => (
        <TabsPanel
          key={tab.value}
          value={tab.value}
          className={styles.mainContent}
        >
          {tab.content}
        </TabsPanel>
      ))}
    </div>
  );
};

export default Main;
