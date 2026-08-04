import { createClient, supabaseConfigured } from "@/lib/supabase/server";

export type TopicState = {
  is_saved: boolean;
  is_read: boolean;
  reflection: string | null;
};

export type SavedTopic = {
  topicId: string;
  title: string;
  themeTitle: string;
  themeSlug: string;
};

export type SavedTool = {
  toolId: string;
  title: string;
  summary: string;
  themeTitle: string;
  themeSlug: string;
};

export type ThemeProgress = {
  slug: string;
  title: string;
  total: number;
  read: number;
};

export type Reflection = {
  topicId: string;
  topicTitle: string;
  themeSlug: string;
  text: string;
  updatedAt: string;
};

export type WeeklyPrompt = {
  body: string;
  context: string | null;
};

/** ISO week number, so the prompt rotates once a week for everyone. */
function weekNumber(date = new Date()): number {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

export async function getWeeklyPrompt(): Promise<WeeklyPrompt | null> {
  if (!supabaseConfigured()) return null;

  const supabase = await createClient();
  const { data } = await supabase
    .from("prompts")
    .select("body, context")
    .order("sort_order");

  if (!data || data.length === 0) return null;
  return data[weekNumber() % data.length];
}

/** State for every topic in one theme, keyed by topic id. */
export async function getTopicStates(
  topicIds: string[]
): Promise<Record<string, TopicState>> {
  if (!supabaseConfigured() || topicIds.length === 0) return {};

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return {};

  const { data } = await supabase
    .from("user_topic_state")
    .select("topic_id, is_saved, is_read, reflection")
    .eq("user_id", user.id)
    .in("topic_id", topicIds);

  const map: Record<string, TopicState> = {};
  for (const row of data ?? []) {
    map[row.topic_id] = {
      is_saved: row.is_saved,
      is_read: row.is_read,
      reflection: row.reflection,
    };
  }
  return map;
}

/** Which tools in this theme the user has saved. */
export async function getSavedToolIds(toolIds: string[]): Promise<Set<string>> {
  if (!supabaseConfigured() || toolIds.length === 0) return new Set();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new Set();

  const { data } = await supabase
    .from("user_tool_state")
    .select("tool_id")
    .eq("user_id", user.id)
    .eq("is_saved", true)
    .in("tool_id", toolIds);

  return new Set((data ?? []).map((r) => r.tool_id));
}

type NestedTheme = { title: string; slug: string } | null;

/** Everything the dashboard needs, in one place. */
export async function getDashboard() {
  const empty = {
    continueTheme: null as { title: string; slug: string } | null,
    savedTopics: [] as SavedTopic[],
    savedTools: [] as SavedTool[],
    progress: [] as ThemeProgress[],
    reflections: [] as Reflection[],
  };

  if (!supabaseConfigured()) return empty;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return empty;

  const [activityRes, topicStateRes, toolStateRes, themesRes] =
    await Promise.all([
      supabase
        .from("user_theme_activity")
        .select("last_viewed_at, themes (title, slug)")
        .eq("user_id", user.id)
        .order("last_viewed_at", { ascending: false })
        .limit(1),
      supabase
        .from("user_topic_state")
        .select(
          "topic_id, is_saved, is_read, reflection, updated_at, topics (title, theme_id, themes (title, slug))"
        )
        .eq("user_id", user.id),
      supabase
        .from("user_tool_state")
        .select("tool_id, tools (title, summary, themes (title, slug))")
        .eq("user_id", user.id)
        .eq("is_saved", true),
      supabase.from("themes").select("id, slug, title, sort_order, topics (id)"),
    ]);

  const activityRow = activityRes.data?.[0] as
    | { themes: NestedTheme }
    | undefined;
  const continueTheme = activityRow?.themes
    ? { title: activityRow.themes.title, slug: activityRow.themes.slug }
    : null;

  type StateRow = {
    topic_id: string;
    is_saved: boolean;
    is_read: boolean;
    reflection: string | null;
    updated_at: string;
    topics: { title: string; theme_id: string; themes: NestedTheme } | null;
  };

  const states = (topicStateRes.data ?? []) as unknown as StateRow[];

  const savedTopics: SavedTopic[] = states
    .filter((r) => r.is_saved && r.topics?.themes)
    .map((r) => ({
      topicId: r.topic_id,
      title: r.topics!.title,
      themeTitle: r.topics!.themes!.title,
      themeSlug: r.topics!.themes!.slug,
    }));

  const reflections: Reflection[] = states
    .filter((r) => r.reflection && r.topics?.themes)
    .sort((a, b) => b.updated_at.localeCompare(a.updated_at))
    .map((r) => ({
      topicId: r.topic_id,
      topicTitle: r.topics!.title,
      themeSlug: r.topics!.themes!.slug,
      text: r.reflection!,
      updatedAt: r.updated_at,
    }));

  type ToolRow = {
    tool_id: string;
    tools: { title: string; summary: string | null; themes: NestedTheme } | null;
  };

  const savedTools: SavedTool[] = ((toolStateRes.data ?? []) as unknown as ToolRow[])
    .filter((r) => r.tools?.themes)
    .map((r) => ({
      toolId: r.tool_id,
      title: r.tools!.title,
      summary: r.tools!.summary ?? "",
      themeTitle: r.tools!.themes!.title,
      themeSlug: r.tools!.themes!.slug,
    }));

  const readTopicIds = new Set(
    states.filter((r) => r.is_read).map((r) => r.topic_id)
  );

  type ThemeRow = {
    id: string;
    slug: string;
    title: string;
    sort_order: number;
    topics: { id: string }[] | null;
  };

  const progress: ThemeProgress[] = ((themesRes.data ?? []) as ThemeRow[])
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((t) => ({
      slug: t.slug,
      title: t.title,
      total: t.topics?.length ?? 0,
      read: (t.topics ?? []).filter((tp) => readTopicIds.has(tp.id)).length,
    }))
    .filter((t) => t.total > 0);

  return { continueTheme, savedTopics, savedTools, progress, reflections };
}
