import { BurgerMenuIcon } from '../BurgerMenuIcon';
import { PrimitiveButton } from '../PrimitiveButton';
import styles from './ToggleMenuButton.module.css';

const ToggleMenuButton = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <div className={styles.wrapper}>
      <PrimitiveButton className={styles.icon} onClick={toggleSidebar}>
        <BurgerMenuIcon />
      </PrimitiveButton>
    </div>
  );
};

export default ToggleMenuButton;
