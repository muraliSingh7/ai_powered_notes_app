// components/auth/SignupForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { logger } from "@/lib/logger";
import { motion } from "framer-motion";

export function SignupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) {
        toast.error("Sign up failed", {
          description: error.message,
        });
        return;
      }

      toast.success("Verification email sent", {
        description: "Please check your email to verify your account.",
      });

      if (typeof window !== "undefined") {
        router.push("/auth/login");
      }
    } catch (error) {
      logger.error("Signup failed", {
        error:
          error instanceof Error ? error.message : `Unknown error: ${error}`,
      });

      toast.error("Sign up failed", {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function signUpWithGoogle() {
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast.error("Sign up failed", {
          description: error.message,
        });
      }
    } catch (error) {
      logger.error("Google Sign up failed", {
        error:
          error instanceof Error ? error.message : `Unknown error: ${error}`,
      });
      toast.error("Sign up failed", {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden flex items-center justify-center bg-black">
      {/* Dramatic background gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-violet-950/40 via-black to-indigo-950/30 z-0"></div>

      {/* Floating orbs/light sources */}
      <div className="fixed top-1/4 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
      <div className="fixed -bottom-32 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
      <div className="fixed top-3/4 right-1/3 w-64 h-64 bg-indigo-600/15 rounded-full blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="z-10 w-full max-w-md px-4 py-6"
      >
        <Card className="bg-zinc-900/80 border border-zinc-800 backdrop-blur-lg relative overflow-hidden">
          {/* Card glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-50 rounded-xl"></div>
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-600/30 rounded-full blur-3xl"></div>
          
          <CardHeader className="relative z-10">
            <CardTitle className="text-2xl font-bold text-white">Create an account</CardTitle>
            <CardDescription className="text-zinc-300">
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-zinc-200">Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-zinc-900/80 border-zinc-800 text-white placeholder:text-zinc-400 focus:!border-purple-500 focus:ring-2 focus:!ring-purple-500/20 transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-200">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-zinc-900/80 border-zinc-800 text-white placeholder:text-zinc-400 focus:!border-purple-500 focus:ring-2 focus:!ring-purple-500/20 transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-zinc-200">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-zinc-900/80 border-zinc-800 text-white placeholder:text-zinc-400 focus:!border-purple-500 focus:ring-2 focus:!ring-purple-500/20 transition-all duration-300"
                />
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all duration-300 border-0 text-white font-medium" 
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </motion.div>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-zinc-900 text-zinc-400">
                  Or continue with
                </span>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                type="button"
                className="w-full border-zinc-700 text-black hover:bg-zinc-800 transition-all duration-300"
                onClick={signUpWithGoogle}
                disabled={isLoading}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign up with Google
              </Button>
            </motion.div>
          </CardContent>
          <CardFooter className="flex justify-center relative z-10">
            <p className="text-sm text-zinc-400">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-purple-400 hover:text-purple-300 hover:underline transition-colors">
                Log in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}