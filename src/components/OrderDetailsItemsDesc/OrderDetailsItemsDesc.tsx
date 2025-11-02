import styles from './OrderDetailsItemsDesc.module.css';

const OrderDetailsItemsDesc = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.videoContainer}>
        <video className={styles.video}>
          <source src="your-video.mp4" type="video/mp4"></source>
        </video>
      </div>
      <div className={styles.descriptionContainer}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget
        sem at lacus bibendum congue...
      </div>
    </div>
  );
};

export default OrderDetailsItemsDesc;
