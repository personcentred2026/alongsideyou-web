// Content access layer.
//
// When Supabase is configured, all theme content comes from the database, so
// Tom and Natalie edit content in Supabase rather than in code.
//
// When Supabase is not configured (local preview with no .env.local), it falls
// back to the static content in themes.ts so the app still runs.

import { createClient, supabaseConfigured } from "@/lib/supabase/server";
import { themes as staticThemes, getTheme as getStaticTheme, type Theme } from "./themes";

type Item = {
  id: string;
  title: string;
  summary: string | null;
  sort_order: number;
};

type Row = {
  id: string;
  slug: string;
  title: string;
  strapline: string | null;
  sort_order: number;
  topics: Item[] | null;
  tools: Item[] | null;
};

const SELECT =
  "id, slug, title, strapline, sort_order, topics (id, title, summary, sort_order), tools (id, title, summary, sort_order)";

function bySortOrder<T extends { sort_order: number }>(items: T[] | null): T[] {
  return [...(items ?? [])].sort((a, b) => a.sort_order - b.sort_order);
}

function toTheme(row: Row): Theme {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    strapline: row.strapline ?? "",
    topics: bySortOrder(row.topics).map((t) => ({
      id: t.id,
      title: t.title,
      summary: t.summary ?? "",
    })),
    tools: bySortOrder(row.tools).map((t) => ({
      id: t.id,
      title: t.title,
      summary: t.summary ?? "",
    })),
  };
}

/** All themes the current user is allowed to see. Only published themes are
 *  returned once Supabase is connected, enforced by row level security. */
export async function getThemes(): Promise<Theme[]> {
  if (!supabaseConfigured()) return staticThemes;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("themes")
    .select(SELECT)
    .order("sort_order");

  if (error) {
    console.error("Failed to load themes:", error.message);
    return [];
  }

  return ((data ?? []) as Row[]).map(toTheme);
}

/** A single theme by slug, or null if it does not exist or is unpublished. */
export async function getThemeBySlug(slug: string): Promise<Theme | null> {
  if (!supabaseConfigured()) return getStaticTheme(slug) ?? null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("themes")
    .select(SELECT)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Failed to load theme:", error.message);
    return null;
  }

  return data ? toTheme(data as Row) : null;
}
