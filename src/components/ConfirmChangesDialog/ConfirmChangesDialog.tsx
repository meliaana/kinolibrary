import { Button } from '../Button';
import { PrimitiveDialog } from '../PrimitiveDialog';

const ConfirmChangesDialog = ({
  open,
  onOpenChange,
  onDiscard,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onDiscard: () => void;
}) => {
  if (!open) return null;

  return (
    <PrimitiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Unsaved Changes"
      description="You have unsaved changes. Do you want to discard or save them?"
    >
      <>
        <Button onClick={onDiscard}>Discard</Button>
        <Button type="submit" variant="colored" onClick={onConfirm}>
          Save changes
        </Button>
      </>
    </PrimitiveDialog>
  );
};

export default ConfirmChangesDialog;
