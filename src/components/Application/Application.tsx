import { useState } from 'react';
import { Header } from '../Header';
import Main from '../Main/Main';
import { Tabs } from '../Tabs';
import styles from './Application.module.css';

const Application = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Tabs initialValue="orders" className={styles.wrapper}>
      <Header toggleSidebar={() => setIsOpen(!isOpen)} />
      <Main isOpen={isOpen} />
    </Tabs>
  );
};

export default Application;
