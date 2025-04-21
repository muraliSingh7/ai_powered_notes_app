// components/notes/NoteCard.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Note } from "@/lib/supabase";
import { NoteEditor } from "./NoteEditor";
import { formatDistanceToNow } from "date-fns";
import { Loader2, Maximize2, Pencil, Trash, Wand2 } from "lucide-react";
import { logger } from "@/lib/logger";

type NoteCardProps = {
  note: Note;
  onEdit: (note: Partial<Note> & { id: string }) => void;
  onDelete: (id: string) => void;
  onSummarize: (params: { id: string; content: string }) => void;
  summarizing: boolean;
};

export function NoteCard({
  note,
  onEdit,
  onDelete,
  onSummarize,
  summarizing,
}: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (title: string, content: string) => {
    onEdit({ id: note.id, title, content });
    setIsEditing(false);
    toast.success("Note updated", {
      description: "Your note has been updated successfully.",
    });
  };

  const handleDelete = () => {
    onDelete(note.id);
    toast.success("Note deleted", {
      description: "Your note has been deleted successfully.",
    });
  };

  const handleSummarize = () => {
    onSummarize({ id: note.id, content: note.content });
    toast.success("Generating summary", {
      description: "We're summarizing your note using AI.",
    });
  };

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error: unknown) {
      logger.error("Failed to format date", {
        error:
          error instanceof Error ? error.message : `Unknown error: ${error}`,
      });
      return "Unknown date";
    }
  };

  const contentPreview = isExpanded
    ? note.content
    : note.content.slice(0, 150) + (note.content.length > 150 ? "..." : "");

  if (isEditing) {
    return (
      <NoteEditor
        initialTitle={note.title}
        initialContent={note.content}
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">{note.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {formatDate(note.updated_at)}
        </p>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap">{contentPreview}</p>
        </div>

        {note.content.length > 150 && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 p-0 h-auto"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Maximize2 className="mr-2 h-4 w-4" />
            {isExpanded ? "Show less" : "Show more"}
          </Button>
        )}

        {note.summary && (
          <div className="mt-4 p-3 bg-muted rounded-md">
            <p className="text-sm font-medium mb-1">AI Summary:</p>
            <p className="text-sm text-muted-foreground">{note.summary}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleEdit}>
            <Pencil className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button variant="outline" size="sm" onClick={handleDelete}>
            <Trash className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleSummarize}
          disabled={summarizing}
        >
          {summarizing ? (
            <>
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              Summarizing...
            </>
          ) : (
            <>
              <Wand2 className="h-4 w-4 mr-1" />
              Summarize
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
