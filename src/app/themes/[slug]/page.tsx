import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import TopicCard from "@/components/TopicCard";
import ToolCard from "@/components/ToolCard";
import { getThemeBySlug } from "@/lib/content/queries";
import { recordThemeView } from "@/lib/engagement/actions";
import { getSavedToolIds, getTopicStates } from "@/lib/engagement/queries";
import { getUser, supabaseConfigured } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function ThemePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const connected = supabaseConfigured();

  if (connected) {
    const user = await getUser();
    if (!user) redirect("/login");
  }

  const { slug } = await params;
  const theme = await getThemeBySlug(slug);
  if (!theme) notFound();

  const topicIds = theme.topics.map((t) => t.id).filter(Boolean) as string[];
  const toolIds = theme.tools.map((t) => t.id).filter(Boolean) as string[];

  const [states, savedTools] = await Promise.all([
    getTopicStates(topicIds),
    getSavedToolIds(toolIds),
  ]);

  if (connected && theme.id) {
    await recordThemeView(theme.id);
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <Link
        href="/themes"
        className="text-sm text-ink-muted transition hover:text-forest"
      >
        ← Back to all themes
      </Link>

      <h1 className="display mt-8 text-4xl sm:text-5xl">{theme.title}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
        {theme.strapline}
      </p>

      {theme.topics.length > 0 && (
        <section className="mt-16">
          <p className="eyebrow">Topics</p>
          <div className="mt-6 space-y-4">
            {theme.topics.map((topic, i) => {
              const state = topic.id ? states[topic.id] : undefined;
              return (
                <TopicCard
                  key={topic.id ?? topic.title}
                  index={i + 1}
                  topicId={topic.id}
                  title={topic.title}
                  summary={topic.summary}
                  isSaved={state?.is_saved ?? false}
                  isRead={state?.is_read ?? false}
                  reflection={state?.reflection ?? ""}
                  interactive={connected}
                />
              );
            })}
          </div>
        </section>
      )}

      {theme.tools.length > 0 && (
        <section className="mt-16">
          <p className="eyebrow">Practical tools</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {theme.tools.map((tool) => (
              <ToolCard
                key={tool.id ?? tool.title}
                toolId={tool.id}
                title={tool.title}
                summary={tool.summary}
                isSaved={tool.id ? savedTools.has(tool.id) : false}
                interactive={connected}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
