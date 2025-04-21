// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { logger } from './logger';

// Define the database schema types
export type Note = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  summary: string | null;
  created_at: string;
  updated_at: string;
};

export type User = {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
};

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions with logging
export async function fetchUserNotes(userId: string): Promise<Note[]> {
  try {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) {
      logger.error('Failed to fetch user notes', { error, userId });
      throw error;
    }
    
    logger.info('Successfully fetched notes', { count: data?.length || 0, userId });
    return data || [];
  } catch (error: unknown) {
    logger.error('Exception in fetchUserNotes', { error: error instanceof Error ? error.message : `Unknown error: ${error}`, userId });
    throw error;
  }
}

export async function createNote(userId: string, title: string, content: string): Promise<Note | null> {
  try {
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

    if (error) {
      logger.error('Failed to create note', { error, userId });
      throw error;
    }
    
    logger.info('Successfully created note', { noteId: data?.[0]?.id, userId });
    return data?.[0] || null;
  } catch (error: unknown) {
    logger.error('Exception in createNote', { error: error instanceof Error ? error.message : `Unknown error: ${error}`, userId });
    throw error;
  }
}

export async function updateNote(
  userId: string, 
  noteId: string, 
  updates: Partial<Note>
): Promise<Note | null> {
  try {
    const updateData = {
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('notes')
      .update(updateData)
      .eq('id', noteId)
      .eq('user_id', userId)
      .select();

    if (error) {
      logger.error('Failed to update note', { error, noteId, userId });
      throw error;
    }
    
    logger.info('Successfully updated note', { noteId, userId });
    return data?.[0] || null;
  } catch (error: unknown) {
    logger.error('Exception in updateNote', { error: error instanceof Error ? error.message : `Unknown error: ${error}`, noteId, userId });
    throw error;
  }
}

export async function deleteNote(userId: string, noteId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', noteId)
      .eq('user_id', userId);

    if (error) {
      logger.error('Failed to delete note', { error, noteId, userId });
      throw error;
    }
    
    logger.info('Successfully deleted note', { noteId, userId });
  } catch (error: unknown) {
    logger.error('Exception in deleteNote', { error: error instanceof Error ? error.message : `Unknown error: ${error}`, noteId, userId });
    throw error;
  }
}

// Auth functions with logging
export async function signInWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      logger.error('Failed email sign in', { error: error instanceof Error ? error.message : `Unknown error: ${error}`, email });
      throw error;
    }
    
    logger.info('Successful email sign in', { userId: data?.user?.id });
    return { data, error: null };
  } catch (error: unknown) {
    logger.error('Exception in signInWithEmail', { error: error instanceof Error ? error.message : `Unknown error: ${error}`, });
    throw error;
  }
}

export async function signUpWithEmail(email: string, password: string, name: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) {
      logger.error('Failed email sign up', { error: error instanceof Error ? error.message : `Unknown error: ${error}`, email });
      throw error;
    }
    
    logger.info('Successful email sign up', { userId: data?.user?.id });
    return { data, error: null };
  } catch (error: unknown) {
    logger.error('Exception in signUpWithEmail', { error: error instanceof Error ? error.message : `Unknown error: ${error}`, });
    throw error;
  }
}

export async function signInWithOAuth(provider: 'google') {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      logger.error(`Failed ${provider} sign in`, { error: error instanceof Error ? error.message : `Unknown error: ${error}`, });
      throw error;
    }
    
    logger.info(`Initiated ${provider} sign in`);
    return { data, error: null };
  } catch (error: unknown) {
    logger.error(`Exception in signInWith${provider}`, { error: error instanceof Error ? error.message : `Unknown error: ${error}`, });
    throw error;
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      logger.error('Failed to sign out', { error: error instanceof Error ? error.message : `Unknown error: ${error}` });
      throw error;
    }
    
    logger.info('User signed out successfully');
    return { error: null };
  } catch (error: unknown) {
    logger.error('Exception in signOut', { error: error instanceof Error ? error.message : `Unknown error: ${error}`, });
    throw error;
  }
}