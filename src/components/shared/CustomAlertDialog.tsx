import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type CustomDialogProp = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  OkFunction?: () => void;
  dialogTitle: string;
  dialogDescription: string;
};

const CustomAlertDialog = ({ open, setOpen, OkFunction,dialogTitle,dialogDescription }: CustomDialogProp) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="bg-background border border-primary">
        <AlertDialogHeader>
          <AlertDialogTitle>{`${dialogTitle}`}</AlertDialogTitle>
          <AlertDialogDescription className="text-black">
            {`${dialogDescription}`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-white bg-black border-none hover:bg-black/70 hover:text-white">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={OkFunction} className="bg-primary text-black ">Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomAlertDialog;