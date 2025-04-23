// app/auth/signup/page.tsx
"use client";
import { SignupForm } from "@/components/auth/SignupForm";
import { useRedirectIfAuthenticated } from "@/hooks/useRedirectIfAuthenticated";

export default function SignupPage() {
  const { loading } = useRedirectIfAuthenticated("/dashboard");

  if (loading) return null;

  return <SignupForm />;
}
