"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";

export function useRedirectIfAuthenticated(redirectTo: string = "/") {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          logger.error("Error checking auth status", {
            error: error.message,
          });
          throw new Error(error.message);
        }

        if (data.user) {
          router.push(redirectTo);
          return;
        }
      } catch (error: unknown) {
        logger.error("Auth check failed in public route", {
          error:
            error instanceof Error ? error.message : `Unknown error: ${error}`,
        });
      } finally {
        setLoading(false);
      }
    }

    checkUser();
  }, [router, redirectTo]);

  return { loading };
}
