// NoteDialog.tsx - Reusable dialog component for notes actions
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type NoteDialogProps = {
  triggerText: string;
  triggerIcon: React.ReactNode;
  title: string;
  content: React.ReactNode;
  variant?: "outline" | "destructive" | "ghost" | "link" | "default";
  buttonClassName?: string;
};

export function NoteDialog({
  triggerText,
  triggerIcon,
  title,
  content,
  variant = "outline",
  buttonClassName = "",
}: NoteDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant} className={buttonClassName}>
          {triggerIcon}
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md sm:max-w-[80vw] bg-zinc-900 border border-zinc-700 text-white max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}
