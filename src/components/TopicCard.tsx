"use client";

import { useState, useTransition } from "react";
import {
  saveReflection,
  toggleTopicRead,
  toggleTopicSaved,
} from "@/lib/engagement/actions";

type Props = {
  index: number;
  topicId?: string;
  title: string;
  summary: string;
  isSaved: boolean;
  isRead: boolean;
  reflection: string;
  interactive: boolean;
};

export default function TopicCard({
  index,
  topicId,
  title,
  summary,
  isSaved,
  isRead,
  reflection,
  interactive,
}: Props) {
  const [saved, setSaved] = useState(isSaved);
  const [read, setRead] = useState(isRead);
  const [text, setText] = useState(reflection);
  const [status, setStatus] = useState<"idle" | "saved">("idle");
  const [, startTransition] = useTransition();

  function onToggleSaved() {
    if (!topicId) return;
    const next = !saved;
    setSaved(next);
    startTransition(() => {
      void toggleTopicSaved(topicId, next);
    });
  }

  function onToggleRead() {
    if (!topicId) return;
    const next = !read;
    setRead(next);
    startTransition(() => {
      void toggleTopicRead(topicId, next);
    });
  }

  function onSaveReflection() {
    if (!topicId) return;
    startTransition(async () => {
      await saveReflection(topicId, text);
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2500);
    });
  }

  const chip =
    "rounded-full border px-4 py-2 text-xs font-medium transition";
  const chipOn = "border-forest bg-forest text-cream";
  const chipOff = "border-forest/20 text-forest hover:bg-forest/5";

  return (
    <details className="group rounded-card border border-forest/10 bg-white px-7 py-6 transition open:shadow-[0_18px_40px_-30px_rgba(43,58,46,0.35)]">
      <summary className="flex cursor-pointer list-none items-center gap-5">
        <span className="text-xs tracking-eyebrow text-ink-muted">
          {String(index).padStart(2, "0")}
        </span>
        <span className="flex-1 font-display text-xl leading-snug text-forest">
          {title}
        </span>
        <span className="flex shrink-0 items-center gap-2 text-xs">
          {read && (
            <span className="rounded-full bg-mist px-2.5 py-1 text-forest-light">
              Read
            </span>
          )}
          {saved && (
            <span className="rounded-full bg-terracotta-pale px-2.5 py-1 text-terracotta">
              Saved
            </span>
          )}
          <span className="text-terracotta transition group-open:rotate-90">
            →
          </span>
        </span>
      </summary>

      <div className="pl-0 sm:pl-11">
        <p className="mt-4 leading-relaxed text-ink-muted">{summary}</p>

        {interactive && topicId && (
          <>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={onToggleSaved}
                className={`${chip} ${saved ? chipOn : chipOff}`}
              >
                {saved ? "Saved" : "Save"}
              </button>
              <button
                type="button"
                onClick={onToggleRead}
                className={`${chip} ${read ? chipOn : chipOff}`}
              >
                {read ? "Marked as read" : "Mark as read"}
              </button>
            </div>

            <div className="mt-7 rounded-2xl bg-cream-deep p-6">
              <label
                htmlFor={`reflection-${topicId}`}
                className="eyebrow block"
              >
                Your reflection
              </label>
              <p className="mt-2 text-xs text-ink-muted">
                Private to you. Useful for supervision and CPD evidence.
              </p>
              <textarea
                id={`reflection-${topicId}`}
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={3}
                placeholder="How does this land against your own practice?"
                className="mt-4 w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm leading-relaxed text-ink placeholder:text-ink-muted/60 focus:border-forest/40 focus:outline-none"
              />
              <div className="mt-3 flex items-center gap-4">
                <button
                  type="button"
                  onClick={onSaveReflection}
                  className="rounded-full bg-forest px-5 py-2 text-xs font-medium text-cream transition hover:bg-forest-deep"
                >
                  Save reflection
                </button>
                {status === "saved" && (
                  <span className="text-xs text-forest-light">Saved</span>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </details>
  );
}
