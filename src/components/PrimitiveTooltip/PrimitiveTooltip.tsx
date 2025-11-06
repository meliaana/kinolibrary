import * as Tooltip from '@radix-ui/react-tooltip';
import styles from './PrimitiveTooltip.module.css';

const PrimitiveTooltip = ({
  children,
  content,
}: {
  children: React.ReactNode;
  content: string;
}) => {
  return (
    <Tooltip.Provider delayDuration={150}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span className={styles.triggerButton}>{children}</span>
        </Tooltip.Trigger>

        <Tooltip.Portal>
          <Tooltip.Content
            className={styles.content}
            side="top"
            sideOffset={6}
            align="center"
          >
            {content}
            <Tooltip.Arrow className={styles.arrow} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default PrimitiveTooltip;
