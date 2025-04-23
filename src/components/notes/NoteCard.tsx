// Updated NoteCard dialog handling using reusable NoteDialog wrapper

'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Note } from '@/lib/supabase';
import { NoteEditor } from './NoteEditor';
import { formatDistanceToNow } from 'date-fns';
import { Loader2, Maximize2, Pencil, Trash, Wand2, X, BookOpen } from 'lucide-react';
import { logger } from '@/lib/logger';
import { motion } from 'framer-motion';
import { NoteDialog } from './NoteDialog';

type NoteCardProps = {
  note: Note;
  onEdit: (note: Partial<Note> & { id: string }) => void;
  onDelete: (id: string) => void;
  onSummarize: (params: { id: string; content: string }) => void;
  onDeleteSummary: (id: string) => void;
  summarizing: boolean;
};

export function NoteCard({
  note,
  onEdit,
  onDelete,
  onSummarize,
  onDeleteSummary,
  summarizing,
}: NoteCardProps) {
  const handleSave = (title: string, content: string) => {
    onEdit({ id: note.id, title, content });
    toast.success('Note updated', {
      description: 'Your note has been updated successfully.',
    });
  };

  const handleDelete = () => {
    onDelete(note.id);
    toast.success('Note deleted', {
      description: 'Your note has been deleted successfully.',
    });
  };

  const handleSummarize = () => {
    onSummarize({ id: note.id, content: note.content });
    toast.success('Generating summary', {
      description: "We're summarizing your note using AI.",
    });
  };

  const handleRemoveSummary = () => {
    onDeleteSummary(note.id);
    toast.success('Summary removed', {
      description: 'The AI summary has been removed from your note.',
    });
  };

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error: unknown) {
      logger.error('Failed to format date', {
        error: error instanceof Error ? error.message : `Unknown error: ${error}`,
      });
      return 'Unknown date';
    }
  };

  const contentPreview = note.content.slice(0, 150) + (note.content.length > 150 ? '...' : '');

  const textAnimationVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.03 },
    }),
  };

  return (
    <Card className="w-full bg-zinc-900/90 border-zinc-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-xl pointer-events-none"></div>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white">{note.title}</CardTitle>
        <p className="text-sm text-zinc-400">{formatDate(note.updated_at)}</p>
      </CardHeader>
      <CardContent className="flex flex-col items-start gap-4">
        <div className="prose max-w-none text-zinc-300">
          <p className="whitespace-pre-wrap">{contentPreview}</p>
        </div>

        {note.content.length > 150 && (
          <NoteDialog
            triggerText="Show more"
            triggerIcon={<Maximize2 className="h-4 w-4"/>}
            title={note.title}
            content={<p className="text-zinc-300 whitespace-pre-wrap">{note.content}</p>}
            variant="ghost"
            buttonClassName="gap-2 text-purple-400 hover:text-purple-300 hover:bg-transparent"
          />
        )}

        {note.is_summary_active && (
          <div className="p-3 bg-zinc-800/80 rounded-md border border-zinc-700 w-full">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Wand2 className="h-4 w-4 text-purple-400" />
                <p className="text-sm font-medium text-white">AI Summary Available</p>
              </div>
              <div className="flex sm:space-x-2">
                <NoteDialog
                  triggerText="View"
                  triggerIcon={<BookOpen className="h-4 w-4" />}
                  variant="ghost"
                  buttonClassName="h-8 !px-0 sm:p-2! gap-3 text-purple-400 hover:text-purple-300 hover:bg-zinc-800"
                  title="AI Summary"
                  content={
                    <div className="p-4 bg-zinc-800/50 rounded-md border border-zinc-700/50 overflow-y-auto max-h-[60vh]">
                      {note.summary!.split(' ').map((word, i) => (
                        <motion.span
                          key={i}
                          custom={i}
                          initial="hidden"
                          animate="visible"
                          variants={textAnimationVariants}
                          className="inline-block mr-1"
                        >
                          {word}
                        </motion.span>
                      ))}
                    </div>
                  }
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 gap-3 text-red-400 hover:text-red-300 hover:bg-zinc-800"
                  onClick={handleRemoveSummary}
                >
                  <X className="h-4 w-4" />
                  Remove
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4 sm:flex-row justify-between">
        <div className="flex space-x-4 sm:space-x-2">
          <NoteDialog
            triggerText="Edit"
            triggerIcon={<Pencil className="h-4 w-4 mr-1" />}
            title="Edit Note"
            content={<NoteEditor initialTitle={note.title} initialContent={note.content} onSave={handleSave} />}
            variant="outline"
            buttonClassName="bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          />
          <NoteDialog
            triggerText="Delete"
            triggerIcon={<Trash className="h-4 w-4 mr-1" />}
            title="Are you sure you want to delete this note?"
            content={
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button variant="destructive" onClick={handleDelete}>Delete</Button>
              </CardFooter>
            }
            variant="outline"
            buttonClassName="bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-red-400"
          />
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleSummarize}
          disabled={summarizing || note.is_summary_active}
          className={
            note.is_summary_active
              ? 'bg-purple-900/20 text-purple-400 border border-purple-500/30'
              : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
          }
        >
          {summarizing ? (
            <>
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              Summarizing...
            </>
          ) : note.is_summary_active ? (
            <>
              <Wand2 className="h-4 w-4 mr-1" />
              Summarized
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