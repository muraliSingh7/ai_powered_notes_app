// components/notes/NotesList.tsx
"use client";

import { Note } from "@/lib/supabase";
import { NoteCard } from "./NoteCard";
import { CreateNote } from "./CreateNote";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { UseQueryResult } from "@tanstack/react-query";

type NotesListProps = {
  notes: Note[];
  isLoading: boolean;
  isError: boolean;
  onEdit: (note: Partial<Note> & { id: string }) => void;
  onDelete: (id: string) => void;
  onCreate: (data: { title: string; content: string }) => void;
  onSummarize: (params: { id: string; content: string }) => void;
  onDeleteSummary: (id: string) => void;
  useSearch: (query: string) => UseQueryResult<Note[], Error>;
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
  onDeleteSummary,
  useSearch,
  summarizing,
}: NotesListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const { data: searchNotes } = useSearch(debouncedTerm);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/50 via-black to-indigo-950/30 z-0"></div>
        <motion.div
          className="text-center relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 blur-xl opacity-40 animate-pulse"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 relative"></div>
          </div>
          <p className="mt-6 text-xl font-medium text-white">
            Loading your notes...
          </p>
        </motion.div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-black to-violet-950/30 z-0"></div>
        <motion.div
          className="text-center bg-black/60 p-8 rounded-2xl border border-red-500/30 max-w-md w-full relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-red-500/20 to-purple-500/20 blur-md"></div>
          <div className="relative">
            <p className="text-red-400 text-2xl font-bold mb-3">
              Failed to load notes
            </p>
            <p className="text-zinc-400 text-lg">Please try again later</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  text-white relative overflow-hidden">
      {/* Dramatic background gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-violet-950/40 via-black to-indigo-950/30 z-0"></div>

      {/* Floating orbs/light sources */}
      <div className="fixed top-1/4 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
      <div className="fixed -bottom-32 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
      <div className="fixed top-3/4 right-1/3 w-64 h-64 bg-indigo-600/15 rounded-full blur-3xl"></div>

      <main className="mx-auto py-8 relative z-10">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="flex items-center gap-4 px-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-300 group-focus-within:text-purple-400 transition-colors duration-200" />
              <Input
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-zinc-900/80 border-zinc-800 !text-white placeholder:text-zinc-400 focus:!border-purple-500 focus:ring-2 focus:!ring-purple-500/20 transition-all duration-300 h-12 rounded-xl"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 rounded-xl blur-lg"></div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <CreateNote onCreate={onCreate} />
            </motion.div>
          </motion.div>

          {searchTerm.length > 0 ? (
            searchNotes && searchNotes.length > 0 ? (
              <motion.div
                className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {searchNotes.map((note, index) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <NoteCard
                      note={note}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      onSummarize={onSummarize}
                      onDeleteSummary={onDeleteSummary}
                      summarizing={summarizing}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <motion.div
                  className="text-center p-8 rounded-xl bg-zinc-900/90 border border-zinc-800 max-w-md relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl"></div>
                  <div className="relative">
                    <p className="text-xl font-bold text-white mb-2">
                      No matching notes found
                    </p>
                    <p className="text-zinc-400">
                      Try adjusting your search term
                    </p>
                  </div>
                </motion.div>
              </div>
            )
          ) : notes.length === 0 ? (
            <div className="flex items-center justify-center h-96">
              <motion.div
                className="text-center p-12 rounded-2xl bg-zinc-900/80 border border-zinc-800 max-w-xl w-full relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl"></div>
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/30 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-600/30 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400">
                    Get Started with AI Notes
                  </h3>
                  <p className="text-zinc-300 text-lg mb-8 max-w-md mx-auto">
                    Create your first note to experience smart organization and
                    AI-powered summarization
                  </p>
                  <motion.button
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] transition-all duration-300 font-medium text-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Create Your First Note
                  </motion.button>
                </div>
              </motion.div>
            </div>
          ) : (
            <motion.div
              className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {notes.map((note, index) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <NoteCard
                    note={note}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onSummarize={onSummarize}
                    onDeleteSummary={onDeleteSummary}
                    summarizing={summarizing}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
