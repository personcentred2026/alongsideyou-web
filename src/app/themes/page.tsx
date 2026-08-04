import Link from "next/link";
import { redirect } from "next/navigation";
import { getThemes } from "@/lib/content/queries";
import { getUser, supabaseConfigured } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function ThemesPage() {
  if (supabaseConfigured()) {
    const user = await getUser();
    if (!user) redirect("/login");
  }

  const themes = await getThemes();

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <p className="eyebrow">Companion Themes</p>
      <h1 className="display mt-5 text-4xl sm:text-5xl">
        Made for the moments that don&apos;t fit neatly in a handbook.
      </h1>
      <p className="mt-6 max-w-xl leading-relaxed text-ink-muted">
        Each theme holds topics to think with and practical tools to use. Start
        wherever the week takes you.
      </p>

      {themes.length === 0 ? (
        <p className="mt-12 rounded-card border border-forest/10 bg-white p-8 text-ink-muted">
          No themes are published yet. Content appears here as it is released.
        </p>
      ) : (
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {themes.map((theme, i) => (
            <Link
              key={theme.slug}
              href={`/themes/${theme.slug}`}
              className="group rounded-card border border-forest/10 bg-white p-8 transition hover:border-forest/25 hover:shadow-[0_18px_40px_-28px_rgba(43,58,46,0.4)]"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs tracking-eyebrow text-ink-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-terracotta transition group-hover:translate-x-1">
                  ↗
                </span>
              </div>
              <h2 className="mt-6 font-display text-2xl leading-snug text-forest">
                {theme.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {theme.strapline}
              </p>
              <p className="mt-6 text-xs tracking-eyebrow text-ink-muted">
                {theme.topics.length} topic
                {theme.topics.length === 1 ? "" : "s"}
                {theme.tools.length > 0 &&
                  ` · ${theme.tools.length} tool${theme.tools.length === 1 ? "" : "s"}`}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
