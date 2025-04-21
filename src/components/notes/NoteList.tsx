// components/notes/NotesList.tsx
'use client';

import { Note } from '@/lib/supabase';
import { NoteCard } from './NoteCard';
import { CreateNoteButton } from './CreateNoteButton';
import { useState } from 'react';
import { NoteEditor } from './NoteEditor';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

type NotesListProps = {
  notes: Note[];
  isLoading: boolean;
  isError: boolean;
  onEdit: (note: Partial<Note> & { id: string }) => void;
  onDelete: (id: string) => void;
  onCreate: (data: { title: string; content: string }) => void;
  onSummarize: (params: { id: string; content: string }) => void;
  summarizing: boolean;
};

export function NotesList({
  notes,
  isLoading,
  isError,
  onEdit,
  onDelete,
  onCreate,
  onSummarize,
  summarizing,
}: NotesListProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCreate = () => {
    setIsCreating(true);
  };

  const handleSave = (title: string, content: string) => {
    onCreate({ title, content });
    setIsCreating(false);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your notes...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 mb-2">Failed to load notes</p>
          <p className="text-muted-foreground">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <CreateNoteButton onClick={handleCreate} />
      </div>

      {isCreating && (
        <div className="mb-6">
          <NoteEditor
            onSave={handleSave}
            onCancel={() => setIsCreating(false)}
          />
        </div>
      )}

      {filteredNotes.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={onEdit}
              onDelete={onDelete}
              onSummarize={onSummarize}
              summarizing={summarizing}
            />
          ))}
        </div>
      ) : notes.length > 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-lg mb-2">No matching notes found</p>
            <p className="text-muted-foreground">
              Try adjusting your search term
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-lg mb-2">No notes yet</p>
            <p className="text-muted-foreground">
              Create your first note to get started
            </p>
          </div>
        </div>
      )}
    </div>
  );
}