// app/auth/callback/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { logger } from "@/lib/logger";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      await supabase.auth.exchangeCodeForSession(code);

      // After successful authentication
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        logger.info("User authenticated via OAuth", { userId: user.id });
      } else {
        logger.warn("OAuth authentication completed but no user returned");
      }
    } catch (error: unknown) {
      logger.error("Error during OAuth callback", {
        error: error instanceof Error ? error.message : `Unknown error: ${error}`,
        code: "REDACTED",
      });

      // Redirect to login with error
      return NextResponse.redirect(
        new URL("/auth/login?error=auth_callback_error", request.url)
      );
    }
  } else {
    logger.warn("No code provided in OAuth callback");
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL("/dashboard", request.url));
}
