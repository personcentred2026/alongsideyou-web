"use client";

import { useState, useTransition } from "react";
import { toggleToolSaved } from "@/lib/engagement/actions";

type Props = {
  toolId?: string;
  title: string;
  summary: string;
  isSaved: boolean;
  interactive: boolean;
};

export default function ToolCard({
  toolId,
  title,
  summary,
  isSaved,
  interactive,
}: Props) {
  const [saved, setSaved] = useState(isSaved);
  const [, startTransition] = useTransition();

  function onToggle() {
    if (!toolId) return;
    const next = !saved;
    setSaved(next);
    startTransition(() => {
      void toggleToolSaved(toolId, next);
    });
  }

  return (
    <div className="flex flex-col rounded-card bg-mist p-7">
      <h3 className="font-display text-xl leading-snug text-forest">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
        {summary}
      </p>
      {interactive && toolId && (
        <button
          type="button"
          onClick={onToggle}
          className={`mt-6 self-start rounded-full border px-5 py-2 text-xs font-medium transition ${
            saved
              ? "border-forest bg-forest text-cream"
              : "border-forest/20 bg-white text-forest hover:bg-white/70"
          }`}
        >
          {saved ? "Saved" : "Save"}
        </button>
      )}
    </div>
  );
}
