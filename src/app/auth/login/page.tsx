// app/auth/login/page.tsx
"use client";
import { LoginForm } from "@/components/auth/LoginForm";
import { useRedirectIfAuthenticated } from "@/hooks/useRedirectIfAuthenticated";

export default function LoginPage() {
  const { loading } = useRedirectIfAuthenticated("/dashboard");

  if (loading) return null;

  return <LoginForm />;
}
