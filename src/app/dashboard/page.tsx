// app/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { useNotes } from "@/hooks/useNotes";
import { NotesList } from "@/components/notes/NoteList";
import { Header } from "@/components/layout/Header";
import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";
import Footer from "@/components/layout/Footer";

// Create a client
const queryClient = new QueryClient();

function Dashboard() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      async function checkUser() {
        try {
          const { data, error } = await supabase.auth.getUser();
          if (error) {
            logger.error("Auth error in dashboard", { error: error.message });
            throw new Error(error.message);
          }

          if (!data.user) {
            logger.info("No authenticated user found, redirecting to login");
            router.push("/auth/login");
            return;
          }

          setUserId(data.user.id);
        } catch (error: unknown) {
          logger.error("Exception in dashboard checkUser", {
            error:
              error instanceof Error
                ? error.message
                : `Unknown error: ${error}`,
          });
          router.push("/auth/login");
        } finally {
          setLoading(false);
        }
      }
      checkUser();

      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event) => {
          if (event === "SIGNED_OUT") {
            router.push("/auth/login");
          }
        }
      );

      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, [router]);

  if (loading || !userId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return <DashboardContent userId={userId} />;
}

function DashboardContent({ userId }: { userId: string }) {
  const {
    notes,
    isLoading,
    isError,
    createNote,
    updateNote,
    deleteNote,
    summarizeNote,
    deleteSummary,
    useSearch,
    summarizing,
  } = useNotes(userId);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <main className="flex-1 py-8 px-4 md:p-8">
        <h1 className="text-3xl text-white font-bold">My Notes</h1>
        <NotesList
          notes={notes}
          isLoading={isLoading}
          isError={isError}
          onEdit={updateNote}
          onDelete={deleteNote}
          onCreate={createNote}
          onSummarize={summarizeNote}
          onDeleteSummary={deleteSummary}
          useSearch={useSearch}
          summarizing={summarizing}
        />
      </main>
      <Toaster />
      <Footer />
    </div>
  );
}

export default function DashboardWithProvider() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
}
