import { BurgerMenuIcon } from '../BurgerMenuIcon';
import { Button } from '../Button';
import styles from './ToggleMenuButton.module.css';

const ToggleMenuButton = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <div className={styles.wrapper}>
      <Button onClick={toggleSidebar}>
        <BurgerMenuIcon />
      </Button>
    </div>
  );
};

export default ToggleMenuButton;
