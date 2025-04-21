// components/notes/CreateNoteButton.tsx
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

type CreateNoteButtonProps = {
  onClick: () => void;
};

export function CreateNoteButton({ onClick }: CreateNoteButtonProps) {
  return (
    <Button onClick={onClick}>
      <PlusCircle className="mr-2 h-4 w-4" />
      New Note
    </Button>
  );
}