import Link from "next/link";
import { getUser } from "@/lib/supabase/server";
import { signOut } from "@/app/(auth)/actions";

export default async function AppHeader() {
  const user = await getUser();

  return (
    <header className="sticky top-0 z-30 border-b border-forest/8 bg-cream/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="h-3.5 w-3.5 rounded-full bg-terracotta" />
          <span className="text-lg font-semibold tracking-tight text-forest">
            AlongsideYou
          </span>
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          {user && (
            <Link
              href="/dashboard"
              className="text-ink-muted transition hover:text-forest"
            >
              Your space
            </Link>
          )}
          <Link
            href="/themes"
            className="text-ink-muted transition hover:text-forest"
          >
            Companion Themes
          </Link>
          {user ? (
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-full border border-forest/20 px-5 py-2 text-forest transition hover:bg-forest/5"
              >
                Sign out
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-forest px-6 py-2.5 font-medium text-cream transition hover:bg-forest-deep"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
