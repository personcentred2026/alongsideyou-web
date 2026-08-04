import { createClient, supabaseConfigured } from "@/lib/supabase/server";
import { themes as staticThemes } from "./themes";

export type ThemeSummary = { slug: string; title: string };

/** Published theme titles for the public landing page. */
export async function getPublishedThemeTitles(): Promise<ThemeSummary[]> {
  if (!supabaseConfigured()) {
    return staticThemes
      .filter((t) => !t.draft)
      .map((t) => ({ slug: t.slug, title: t.title }));
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("themes")
    .select("slug, title")
    .order("sort_order");

  return data ?? [];
}
