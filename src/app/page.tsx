// app/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { StickyNote, Sparkles, Lock, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Smart Notes with AI Superpowers
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Create, organize, and summarize your notes with the power of artificial intelligence.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/auth/signup">
                    Get Started for Free
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/auth/login">
                    Sign In
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Features</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Everything you need to capture and organize your thoughts.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-background">
                <div className="p-2 bg-primary/10 rounded-full">
                  <StickyNote className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Simple Note Taking</h3>
                <p className="text-muted-foreground text-center">
                  Create and edit notes quickly with our intuitive interface.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-background">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">AI Summarization</h3>
                <p className="text-muted-foreground text-center">
                  Transform lengthy notes into concise summaries with a single click.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-background">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Secure & Private</h3>
                <p className="text-muted-foreground text-center">
                  Your notes are encrypted and only accessible by you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to get started?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Join thousands of users who are already saving time with AI-powered notes.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/auth/signup">
                    <Zap className="mr-2 h-4 w-4" />
                    Sign Up Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} AI Notes. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}