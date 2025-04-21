// hooks/useNotes.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, Note } from '@/lib/supabase';

export function useNotes(userId: string) {
  const queryClient = useQueryClient();

  // Fetch all notes for a user
  const notesQuery = useQuery({
    queryKey: ['notes', userId],
    queryFn: async (): Promise<Note[]> => {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!userId
  });

  // Create a new note
  const createNoteMutation = useMutation({
    mutationFn: async ({ title, content }: { title: string; content: string }) => {
      const { data, error } = await supabase
        .from('notes')
        .insert([
          {
            user_id: userId,
            title,
            content,
            updated_at: new Date().toISOString()
          }
        ])
        .select();

      if (error) throw error;
      return data?.[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', userId] });
    }
  });

  // Update an existing note
  const updateNoteMutation = useMutation({
    mutationFn: async ({ id, title, content, summary }: Partial<Note> & { id: string }) => {
      const updates: Partial<Note> = {
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
        ...(summary !== undefined && { summary }),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('notes')
        .update(updates)
        .eq('id', id)
        .eq('user_id', userId)
        .select();

      if (error) throw error;
      return data?.[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', userId] });
    }
  });

  // Delete a note
  const deleteNoteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', userId] });
    }
  });

  // Generate summary for a note
  const summarizeMutation = useMutation({
    mutationFn: async ({ id, content }: { id: string; content: string }) => {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: content })
      });

      if (!response.ok) {
        throw new Error('Failed to summarize');
      }

      const { summary } = await response.json();

      // Update note with summary
      const { data, error } = await supabase
        .from('notes')
        .update({ summary, updated_at: new Date().toISOString() })
        .eq('id', id)
        .eq('user_id', userId)
        .select();

      if (error) throw error;
      return data?.[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', userId] });
    }
  });

  return {
    notes: notesQuery.data || [],
    isLoading: notesQuery.isLoading,
    isError: notesQuery.isError,
    createNote: createNoteMutation.mutate,
    updateNote: updateNoteMutation.mutate,
    deleteNote: deleteNoteMutation.mutate,
    summarizeNote: summarizeMutation.mutate,
    summarizing: summarizeMutation.isPending
  };
}