"use server";

import { redirect } from "next/navigation";
import { createClient, supabaseConfigured } from "@/lib/supabase/server";

export type AuthState = { error: string | null };

const NOT_CONFIGURED =
  "Supabase is not connected yet. Add your project keys to .env.local (see README).";

export async function signIn(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  if (!supabaseConfigured()) return { error: NOT_CONFIGURED };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  });

  if (error) return { error: error.message };
  redirect("/dashboard");
}

export async function signUp(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  if (!supabaseConfigured()) return { error: NOT_CONFIGURED };

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
    options: {
      data: { full_name: String(formData.get("full_name") ?? "") },
    },
  });

  if (error) return { error: error.message };
  redirect("/dashboard");
}

export async function signOut() {
  if (supabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/");
}
