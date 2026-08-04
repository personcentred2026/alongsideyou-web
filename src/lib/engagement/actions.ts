"use server";

import { revalidatePath } from "next/cache";
import { createClient, supabaseConfigured } from "@/lib/supabase/server";

async function currentUser() {
  if (!supabaseConfigured()) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/** Save or unsave a topic. */
export async function toggleTopicSaved(topicId: string, next: boolean) {
  const user = await currentUser();
  if (!user) return;

  const supabase = await createClient();
  await supabase.from("user_topic_state").upsert(
    {
      user_id: user.id,
      topic_id: topicId,
      is_saved: next,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,topic_id" }
  );

  revalidatePath("/dashboard");
  revalidatePath("/themes", "layout");
}

/** Mark a topic read or unread. */
export async function toggleTopicRead(topicId: string, next: boolean) {
  const user = await currentUser();
  if (!user) return;

  const supabase = await createClient();
  await supabase.from("user_topic_state").upsert(
    {
      user_id: user.id,
      topic_id: topicId,
      is_read: next,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,topic_id" }
  );

  revalidatePath("/dashboard");
  revalidatePath("/themes", "layout");
}

/** Write a private reflection against a topic. Empty text clears it. */
export async function saveReflection(topicId: string, text: string) {
  const user = await currentUser();
  if (!user) return;

  const trimmed = text.trim();
  const supabase = await createClient();
  await supabase.from("user_topic_state").upsert(
    {
      user_id: user.id,
      topic_id: topicId,
      reflection: trimmed.length > 0 ? trimmed : null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,topic_id" }
  );

  revalidatePath("/dashboard");
  revalidatePath("/themes", "layout");
}

/** Save or unsave a tool. */
export async function toggleToolSaved(toolId: string, next: boolean) {
  const user = await currentUser();
  if (!user) return;

  const supabase = await createClient();
  await supabase.from("user_tool_state").upsert(
    {
      user_id: user.id,
      tool_id: toolId,
      is_saved: next,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,tool_id" }
  );

  revalidatePath("/dashboard");
  revalidatePath("/themes", "layout");
}

/** Record that the user opened a theme, for "continue where you left off". */
export async function recordThemeView(themeId: string) {
  const user = await currentUser();
  if (!user) return;

  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("user_theme_activity")
    .select("view_count")
    .eq("user_id", user.id)
    .eq("theme_id", themeId)
    .maybeSingle();

  await supabase.from("user_theme_activity").upsert(
    {
      user_id: user.id,
      theme_id: themeId,
      last_viewed_at: new Date().toISOString(),
      view_count: (existing?.view_count ?? 0) + 1,
    },
    { onConflict: "user_id,theme_id" }
  );
}
