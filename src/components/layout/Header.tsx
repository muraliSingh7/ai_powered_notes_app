// components/layout/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { StickyNote, LogOut, User as UserIcon } from "lucide-react";

export function Header() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    }

    loadUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    if (typeof window !== "undefined") {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-transparent">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        <Link
          href={user ? "/dashboard" : "/"}
          className="flex items-center space-x-2 group"
        >
          <div className="p-1.5 rounded-md bg-gradient-to-br from-blue-600 to-purple-600 shadow-[0_0_10px_rgba(139,92,246,0.5)] group-hover:shadow-[0_0_15px_rgba(139,92,246,0.7)] transition-all duration-300">
            <StickyNote className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">AI Notes</span>
        </Link>

        <div className="flex items-center gap-2">
          {!loading &&
            (user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={user.user_metadata.avatar_url || UserIcon}
                        alt={user.user_metadata.name || user.email || ""}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {user.user_metadata.name
                          ? user.user_metadata.name.charAt(0).toUpperCase()
                          : user.email
                          ? user.email.charAt(0).toUpperCase()
                          : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-zinc-900/90 backdrop-blur-lg border border-white/10" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-white">
                        {user.user_metadata.name || "User"}
                      </p>
                      <p className="text-xs leading-none text-zinc-400">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem 
                    onClick={handleSignOut}
                    className="text-zinc-200 hover:bg-white/10 cursor-pointer focus:bg-white/10"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  asChild
                  className="text-zinc-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <Link href="/auth/login">Log In</Link>
                </Button>
                <Button 
                  asChild
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-[0_0_10px_rgba(139,92,246,0.3)] hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] border-0 transition-all duration-300"
                >
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            ))}
        </div>
      </div>
    </header>
  );
}