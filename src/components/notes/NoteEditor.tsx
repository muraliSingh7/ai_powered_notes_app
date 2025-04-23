// components/notes/NoteEditor.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { motion } from "framer-motion";

type NoteEditorProps = {
  initialTitle?: string;
  initialContent?: string;
  onSave: (title: string, content: string) => void;
  onCancel?: () => void;
  className?: string;
};

export function NoteEditor({
  initialTitle = "",
  initialContent = "",
  onSave,
  className = "",
}: NoteEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!title.trim()) {
      alert("Please enter a title for your note");
      return;
    }

    if (!content.trim()) {
      alert("Please enter some content for your note");
      return;
    }

    onSave(title, content);
  };

  return (
    <motion.div
      className={`${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg font-medium bg-zinc-800/80 border-zinc-700 text-white placeholder:text-zinc-400 focus:!border-purple-500 focus:ring-2 focus:!ring-purple-500/20 transition-all duration-300 h-12 rounded-xl"
            required
          />
        </div>
        <div className="space-y-2">
          <Textarea
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="max-h-[50vh] resize-none bg-zinc-800/80 border-zinc-700 text-white placeholder:text-zinc-400 focus:!border-purple-500 focus:ring-2 focus:!ring-purple-500/20 transition-all duration-300 rounded-xl p-4 overflow-y-auto"
            rows={10}
          />
        </div>

        <div className="flex space-x-3 justify-end">
          <Button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all duration-300"
          >
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
