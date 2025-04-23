"use client";
// components/notes/CreateNote.tsx
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogHeader } from "../ui/dialog";
import { NoteEditor } from "./NoteEditor";

type CreateNoteProps = {
  onCreate: (data: { title: string; content: string }) => void;
};

export function CreateNote({ onCreate }: CreateNoteProps) {
  const handleSave = (title: string, content: string) => {
    onCreate({ title, content });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative group">
          {/* Animated border effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl opacity-75 group-hover:opacity-100 blur-sm group-hover:blur-md transition-all duration-300"></div>

          {/* Animated running light effect */}
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-purple-400/50 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
          </div>

          <Button className="relative bg-gradient-to-r from-purple-600/90 to-blue-600/90 hover:from-purple-600 hover:to-blue-600 border-0 text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-all duration-300 h-12 px-6 rounded-xl">
            <PlusCircle className="mr-2 h-5 w-5" />
            New Note
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-md sm:max-w-[80vw] bg-zinc-900 border border-zinc-700 text-white max-h-[80vh]  overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Note</DialogTitle>
        </DialogHeader>
        <NoteEditor className="!p-0 border-0" onSave={handleSave} />
      </DialogContent>
    </Dialog>
  );
}
