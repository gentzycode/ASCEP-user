import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";

interface ALertProps {
  isOpen: boolean;
  message: string;
  description?: string;
  action: () => void;
  close: () => void;
  loadingAction?: boolean;
}

const ALert: React.FC<ALertProps> = ({
  isOpen,
  message,
  description,
  action,
  close,
  loadingAction,
}) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-text">{message}</AlertDialogTitle>
          <AlertDialogDescription className="text-subtitle_text">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-4 items-center">
          <Button
            onClick={close}
            className="w-full max-w-[150px]"
            disabled={loadingAction}
          >
            Cancel
          </Button>
          <Button
            onClick={action}
            isLoading={loadingAction}
            className="w-full max-w-[150px]"
            disabled={loadingAction}
          >
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ALert;
