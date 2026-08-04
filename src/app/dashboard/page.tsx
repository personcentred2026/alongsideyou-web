import Link from "next/link";
import { redirect } from "next/navigation";
import { getDashboard, getWeeklyPrompt } from "@/lib/engagement/queries";
import { getUser, supabaseConfigured } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

function firstName(full: string | undefined): string {
  if (!full) return "";
  return full.trim().split(" ")[0] ?? "";
}

export default async function DashboardPage() {
  if (!supabaseConfigured()) redirect("/themes");

  const user = await getUser();
  if (!user) redirect("/login");

  const [prompt, data] = await Promise.all([getWeeklyPrompt(), getDashboard()]);
  const name = firstName(user.user_metadata?.full_name as string | undefined);

  const totalTopics = data.progress.reduce((sum, t) => sum + t.total, 0);
  const totalRead = data.progress.reduce((sum, t) => sum + t.read, 0);
  const isNew =
    totalRead === 0 &&
    data.savedTopics.length === 0 &&
    data.savedTools.length === 0 &&
    !data.continueTheme;

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <p className="eyebrow">Your space</p>
      <h1 className="display mt-5 text-4xl sm:text-5xl">
        {name ? `Hello ${name}` : "Welcome back"}
      </h1>
      <p className="mt-5 text-lg text-ink-muted">
        {isNew
          ? "Everything you save, mark as read, or reflect on will gather here."
          : `${totalRead} of ${totalTopics} topics marked as read.`}
      </p>

      {prompt && (
        <section className="mt-12 rounded-card bg-forest px-10 py-12">
          <p className="eyebrow text-cream/50">This week</p>
          <p className="mt-6 max-w-3xl font-display text-2xl leading-snug text-cream sm:text-3xl">
            {prompt.body}
          </p>
          {prompt.context && (
            <p className="mt-6 text-sm text-cream/60">{prompt.context}</p>
          )}
        </section>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-card border border-forest/10 bg-white p-8">
          <h2 className="font-display text-2xl text-forest">
            {data.continueTheme ? "Pick up where you left off" : "Start here"}
          </h2>
          {data.continueTheme ? (
            <>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                You were last in {data.continueTheme.title}.
              </p>
              <Link
                href={`/themes/${data.continueTheme.slug}`}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream transition hover:bg-forest-deep"
              >
                Continue <span aria-hidden>↗</span>
              </Link>
            </>
          ) : (
            <>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Browse the Companion Themes and open whichever speaks to the week
                you are having.
              </p>
              <Link
                href="/themes"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream transition hover:bg-forest-deep"
              >
                Explore themes <span aria-hidden>↗</span>
              </Link>
            </>
          )}
        </section>

        <section className="rounded-card border border-forest/10 bg-white p-8">
          <h2 className="font-display text-2xl text-forest">Your progress</h2>
          {data.progress.length === 0 ? (
            <p className="mt-3 text-sm text-ink-muted">
              Progress appears once content is published.
            </p>
          ) : (
            <ul className="mt-6 space-y-4">
              {data.progress.map((t) => (
                <li key={t.slug}>
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <Link
                      href={`/themes/${t.slug}`}
                      className="text-forest transition hover:text-terracotta"
                    >
                      {t.title}
                    </Link>
                    <span className="shrink-0 text-xs text-ink-muted">
                      {t.read}/{t.total}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-mist">
                    <div
                      className="h-1.5 rounded-full bg-terracotta transition-all"
                      style={{
                        width: `${t.total ? (t.read / t.total) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-card bg-cream-deep p-8">
          <h2 className="font-display text-2xl text-forest">Saved</h2>
          {data.savedTopics.length === 0 && data.savedTools.length === 0 ? (
            <p className="mt-3 text-sm text-ink-muted">
              Nothing saved yet. Use Save on any topic or tool to keep it here.
            </p>
          ) : (
            <ul className="mt-6 space-y-4 text-sm">
              {data.savedTools.map((t) => (
                <li key={t.toolId}>
                  <Link
                    href={`/themes/${t.themeSlug}`}
                    className="font-medium text-forest transition hover:text-terracotta"
                  >
                    {t.title}
                  </Link>
                  <p className="mt-0.5 text-xs text-ink-muted">
                    Tool · {t.themeTitle}
                  </p>
                </li>
              ))}
              {data.savedTopics.map((t) => (
                <li key={t.topicId}>
                  <Link
                    href={`/themes/${t.themeSlug}`}
                    className="font-medium text-forest transition hover:text-terracotta"
                  >
                    {t.title}
                  </Link>
                  <p className="mt-0.5 text-xs text-ink-muted">
                    Topic · {t.themeTitle}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-card bg-terracotta-pale p-8">
          <h2 className="font-display text-2xl text-forest">
            Your reflections
          </h2>
          <p className="mt-2 text-xs text-ink-muted">
            Private to you. Nobody else can read these, including your
            organisation.
          </p>
          {data.reflections.length === 0 ? (
            <p className="mt-4 text-sm text-ink-muted">
              No reflections yet. Open a topic and write a few lines about how it
              landed.
            </p>
          ) : (
            <ul className="mt-6 space-y-5 text-sm">
              {data.reflections.slice(0, 4).map((r) => (
                <li key={r.topicId}>
                  <Link
                    href={`/themes/${r.themeSlug}`}
                    className="font-medium text-forest transition hover:text-terracotta"
                  >
                    {r.topicTitle}
                  </Link>
                  <p className="mt-1.5 line-clamp-3 leading-relaxed text-ink-muted">
                    {r.text}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
