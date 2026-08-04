import Link from "next/link";
import { getUser } from "@/lib/supabase/server";

export default async function SiteNav() {
  const user = await getUser();

  return (
    <header className="sticky top-0 z-30 border-b border-forest/5 bg-cream/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="h-3.5 w-3.5 rounded-full bg-terracotta" />
          <span className="text-lg font-semibold tracking-tight text-forest">
            AlongsideYou
          </span>
        </Link>

        <nav className="flex items-center gap-7 text-sm">
          <a
            href="#how-it-helps"
            className="hidden text-ink-muted transition hover:text-forest sm:block"
          >
            How it helps
          </a>
          <a
            href="#who-its-for"
            className="hidden text-ink-muted transition hover:text-forest sm:block"
          >
            Who it&apos;s for
          </a>
          {user ? (
            <Link
              href="/dashboard"
              className="rounded-full bg-forest px-6 py-2.5 font-medium text-cream transition hover:bg-forest-deep"
            >
              Your space
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-ink-muted transition hover:text-forest"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-forest px-6 py-2.5 font-medium text-cream transition hover:bg-forest-deep"
              >
                Create account
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
