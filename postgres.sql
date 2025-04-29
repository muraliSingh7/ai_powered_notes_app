create table notes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  content text not null,
  summary text,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Filter by user
CREATE INDEX notes_user_id_idx ON notes (user_id);

-- Sort by recent updates per user
CREATE INDEX notes_user_updated_idx ON notes (user_id, updated_at DESC);

-- Index that includes user filtering (works best with matching query)
CREATE INDEX notes_fulltext_user_idx 
  ON notes USING GIN (
    to_tsvector('english', coalesce(title, '') || ' ' || coalesce(content, '') || ' ' || user_id::text)
);

-- Create function for auto-updating the updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Create trigger for notes table
CREATE TRIGGER update_notes_modtime
BEFORE UPDATE ON notes
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- Create enum type for log levels
CREATE TYPE log_level AS ENUM ('INFO', 'WARN', 'ERROR');

-- Create logs table
CREATE TABLE logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message TEXT NOT NULL,
  context JSONB,
  level log_level NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL,
  user_id uuid references auth.users not null,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for sorting/filtering logs by timestamp (if queries are time-based)
CREATE INDEX logs_timestamp_idx ON logs (timestamp DESC);

-- Index for filtering logs by log level (e.g., "ERROR", "INFO", etc.)
CREATE INDEX logs_level_idx ON logs (level);

-- Index for filtering logs by user_id (if you query logs by specific users)
CREATE INDEX logs_user_id_idx ON logs (user_id);

-- Composite index for user_id and timestamp (optional for time-based queries)
CREATE INDEX logs_user_timestamp_idx ON logs (user_id, timestamp DESC);

-- Composite index for user_id and level (optional for filtering by user and log level)
CREATE INDEX logs_user_level_idx ON logs (user_id, level);

-- Enable Row-Level Security
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Add deleted_at column to track when a note was deleted
ALTER TABLE notes ADD COLUMN deleted_at TIMESTAMP WITH TIME ZONE;

-- Policy for users to insert, update, and delete their own notes
CREATE POLICY user_notes_policy
  ON notes
  FOR ALL
  USING (auth.uid() = user_id)  -- Ensure users can only access their own notes
  WITH CHECK (auth.uid() = user_id);  -- Ensure users can only insert/update their own notes

-- Policy for service_role to access all notes
CREATE POLICY service_role_access_notes
  ON notes
  FOR ALL
  TO authenticated, service_role, supabase_admin
  USING (auth.jwt() ->> 'role' = 'service_role' OR auth.jwt() ->> 'role' = 'supabase_admin');

-- Enforce Row-Level Security on the notes table
ALTER TABLE notes FORCE ROW LEVEL SECURITY;

-- Enable Row-Level Security for logs
ALTER TABLE logs ENABLE ROW LEVEL SECURITY;

-- Policy to allow authenticated users to insert logs
CREATE POLICY insert_logs_policy
  ON logs
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (TRUE);  -- Any authenticated user can insert logs

-- Policy to allow service_role to access all logs
CREATE POLICY admin_access_logs_policy
  ON logs
  FOR ALL
  TO service_role
  USING (auth.jwt() ->> 'role' = 'service_role' OR auth.jwt() ->> 'role' = 'supabase_admin');

-- Enforce Row-Level Security on the logs table
ALTER TABLE logs FORCE ROW LEVEL SECURITY;

-- Alter the existing function to add SECURITY DEFINER and set search_path
-- We are using a BEFORE UPDATE trigger function like update_modified_column() to auto-update a modified_at timestamp, using SECURITY DEFINER ensures this function works even if the user has no direct permission to update that column.
ALTER FUNCTION update_modified_column() 
SET search_path = public 
SECURITY DEFINER;