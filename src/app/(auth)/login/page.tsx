"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signIn, type AuthState } from "../actions";

const initialState: AuthState = { error: null };

const field =
  "mt-2 w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm text-ink focus:border-forest/40 focus:outline-none";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-6 py-16">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="h-3.5 w-3.5 rounded-full bg-terracotta" />
          <span className="text-lg font-semibold tracking-tight text-forest">
            AlongsideYou
          </span>
        </Link>

        <div className="mt-8 rounded-card border border-forest/10 bg-white p-9">
          <h1 className="display text-3xl">Welcome back</h1>
          <p className="mt-3 text-sm text-ink-muted">
            Sign in to pick up where you left off.
          </p>

          <form action={formAction} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="eyebrow block">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={field}
              />
            </div>
            <div>
              <label htmlFor="password" className="eyebrow block">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={field}
              />
            </div>

            {state.error && (
              <p className="rounded-xl bg-terracotta-pale px-4 py-3 text-sm text-terracotta">
                {state.error}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-full bg-forest py-3.5 text-sm font-medium text-cream transition hover:bg-forest-deep disabled:opacity-60"
            >
              {pending ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-ink-muted">
          No account yet?{" "}
          <Link href="/signup" className="text-forest underline">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}
