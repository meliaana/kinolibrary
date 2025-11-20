import { Button } from '../Button';
import { PrimitiveDialog } from '../PrimitiveDialog';

const ConfirmRemoveItemDialog = ({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}) => {
  if (!open) return null;

  return (
    <PrimitiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Clip"
      description="Are you sure you want to delete this clip?"
    >
      <>
        <Button variant="colored" onClick={onConfirm}>
          Delete Clip
        </Button>
      </>
    </PrimitiveDialog>
  );
};

export default ConfirmRemoveItemDialog;
