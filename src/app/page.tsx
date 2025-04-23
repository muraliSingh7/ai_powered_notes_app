// app/page.tsx
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { StickyNote, Sparkles, Lock, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white overflow-hidden items-center">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-black to-black"></div>
        <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-[radial-gradient(circle,rgba(120,0,255,0.15)_0%,transparent_70%)]"></div>
        <div className="absolute bottom-0 left-0 w-3/4 h-3/4 bg-[radial-gradient(circle,rgba(0,220,255,0.15)_0%,transparent_70%)]"></div>
      </div>

      <Header />

      <main className="w-full">
        {/* Hero Section */}
        <section className="py-20 md:py-28 relative">
          {/* 3D Glow Effect */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-r from-purple-600/20 to-cyan-400/20 blur-[120px] rounded-full"></div>

          <div className="px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center space-y-8 text-center relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-full relative overflow-hidden">
                  <span className="relative z-10">INTRODUCING AI NOTES</span>
                  <span className="absolute inset-0 bg-white/20 animate-pulse"></span>
                </span>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                  <span className="block">Smart Notes with</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-500 to-cyan-400 animate-gradient-x">
                    AI Superpowers
                  </span>
                </h1>

                <div className="relative">
                  <p className="mx-auto max-w-[700px] mt-6 text-lg md:text-xl text-zinc-400">
                    Create, organize, and summarize your notes with the power of
                    artificial intelligence. Experience the future of
                    note-taking today.
                  </p>
                  <div className="absolute -z-10 blur-3xl opacity-30 w-2/3 h-24 -bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:shadow-[0_0_25px_rgba(139,92,246,0.7)] border-0 text-lg transition-all duration-300 px-8 py-6"
                >
                  <Link href="/auth/signup" className="flex items-center">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <button className="p-[3px] relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                  <div className="px-8 py-2  bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                    <Link href="/auth/login">Sign In</Link>
                  </div>
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section with Glassmorphism Cards */}
        <section className="w-full py-20 md:py-32 relative">
          {/* Smooth transition between sections */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-black/50"></div>

          {/* Dramatic background effects */}

          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-900/20 to-violet-900/20"></div>

          <div className="px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full relative overflow-hidden group">
                <span className="relative z-10">REVOLUTIONARY FEATURES</span>
                <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mt-4 text-white">
                Experience the Future
              </h2>
              <p className="max-w-[700px] text-zinc-400 md:text-xl">
                Discover tools designed to transform your productivity and
                creativity.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Feature 1 - Glassmorphism Card */}
              <motion.div
                className="flex flex-col items-center p-8 rounded-2xl backdrop-blur-lg relative border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-500 group overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Background glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500"></div>
                <div className="absolute inset-0.5 bg-black rounded-2xl z-10"></div>

                <div className="relative z-20 flex flex-col items-center space-y-4">
                  <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] transition-all duration-300">
                    <StickyNote className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Smart Note Taking
                  </h3>
                  <p className="text-zinc-400 text-center">
                    Create and edit notes with an AI-powered interface that
                    adapts to your style.
                  </p>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent opacity-30 my-2"></div>

                  <span className="text-sm text-blue-400 flex items-center group-hover:translate-x-2 transition-transform duration-300">
                    Learn more <ArrowRight className="ml-1 h-3 w-3" />
                  </span>
                </div>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                className="flex flex-col items-center p-8 rounded-2xl backdrop-blur-lg relative border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-500 group overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -5 }}
              >
                {/* Background glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-fuchsia-600 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500"></div>
                <div className="absolute inset-0.5 bg-black rounded-2xl z-10"></div>

                <div className="relative z-20 flex flex-col items-center space-y-4">
                  <div className="p-3 bg-gradient-to-br from-fuchsia-600 to-pink-600 rounded-xl shadow-[0_0_15px_rgba(219,39,119,0.5)] group-hover:shadow-[0_0_25px_rgba(219,39,119,0.7)] transition-all duration-300">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    AI Summarization
                  </h3>
                  <p className="text-zinc-400 text-center">
                    Transform lengthy notes into concise summaries with advanced
                    AI processing.
                  </p>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent opacity-30 my-2"></div>

                  <span className="text-sm text-pink-400 flex items-center group-hover:translate-x-2 transition-transform duration-300">
                    Learn more <ArrowRight className="ml-1 h-3 w-3" />
                  </span>
                </div>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                className="flex flex-col items-center p-8 rounded-2xl backdrop-blur-lg relative border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-500 group overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -5 }}
              >
                {/* Background glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500"></div>
                <div className="absolute inset-0.5 bg-black rounded-2xl z-10"></div>

                <div className="relative z-20 flex flex-col items-center space-y-4">
                  <div className="p-3 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl shadow-[0_0_15px_rgba(20,184,166,0.5)] group-hover:shadow-[0_0_25px_rgba(20,184,166,0.7)] transition-all duration-300">
                    <Lock className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Secure & Private
                  </h3>
                  <p className="text-zinc-400 text-center">
                    Military-grade encryption ensures your notes are always
                    protected and private.
                  </p>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent opacity-30 my-2"></div>

                  <span className="text-sm text-teal-400 flex items-center group-hover:translate-x-2 transition-transform duration-300">
                    Learn more <ArrowRight className="ml-1 h-3 w-3" />
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 md:py-32 relative overflow-hidden">
          {/* Smooth transition between sections */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-black/50"></div>

          {/* Dramatic background effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 via-indigo-900/20 to-black"></div>
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>

          <div className="px-4 md:px-6 relative z-10">
            <motion.div
              className="max-w-2xl mx-auto bg-gradient-to-r from-purple-800/30 to-blue-800/30 backdrop-blur-lg border border-white/10 p-8 md:p-12 rounded-3xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  Ready to{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                    transform
                  </span>{" "}
                  your notes?
                </h2>
                <p className="text-zinc-300 text-lg">
                  Join thousands of users who are already leveraging AI to
                  enhance their productivity and creativity.
                </p>
              </div>

              <motion.div
                className="mt-8"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:shadow-[0_0_25px_rgba(139,92,246,0.7)] border-0 text-lg transition-all duration-300 w-full md:w-auto py-6 px-8"
                >
                  <Link
                    href="/auth/signup"
                    className="flex items-center justify-center"
                  >
                    <Zap className="mr-2 h-5 w-5" />
                    Get Started
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
