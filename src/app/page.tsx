import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { getPublishedThemeTitles } from "@/lib/content/public";

export const dynamic = "force-dynamic";

const steps = [
  {
    n: "01",
    title: "Start where you are",
    text: "Open the theme that matches the week you are having, not a course you have to work through in order.",
  },
  {
    n: "02",
    title: "Think it through",
    text: "Topics that name the difficulty honestly, and practical tools you can take straight into the work.",
  },
  {
    n: "03",
    title: "Take the next step",
    text: "Save what helps, note what you want to come back to, and leave with something you can actually try.",
  },
];

const roles = [
  {
    initials: "CC",
    title: "Care Coordinators",
    text: "Untangle complex situations, prepare for conversations, and keep the person at the centre across services.",
    tint: "bg-mist",
    badge: "bg-forest text-cream",
  },
  {
    initials: "SP",
    title: "Social Prescribers",
    text: "Explore what matters, navigate uncertainty, and connect people with meaningful community support.",
    tint: "bg-terracotta-pale",
    badge: "bg-terracotta text-cream",
  },
  {
    initials: "HW",
    title: "Health and Wellbeing Coaches",
    text: "Shape focused conversations that help people build confidence, capability, and momentum.",
    tint: "bg-sand",
    badge: "bg-[#8C7A45] text-cream",
  },
];

const boundaries = [
  { text: "Encourages reflective, person-centred practice", included: true },
  { text: "Helps turn uncertainty into practical next steps", included: true },
  { text: "Works alongside supervision and local guidance", included: true },
  {
    text: "Never replaces safeguarding, clinical judgement, or policy",
    included: false,
  },
];

export default async function Home() {
  const themes = await getPublishedThemeTitles();

  return (
    <div className="bg-cream">
      <SiteNav />

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-14 px-6 pb-20 pt-16 lg:grid-cols-2 lg:pt-24">
        <div>
          <p className="eyebrow flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-terracotta" />
            A digital companion for personalised care teams
          </p>

          <h1 className="display mt-7 text-5xl sm:text-6xl lg:text-[4.25rem]">
            When the work gets complex, you don&apos;t have to work it out
            alone.
          </h1>

          <p className="mt-7 max-w-lg text-lg leading-relaxed text-ink-muted">
            Practical, thoughtful support for the real situations Care
            Coordinators, Social Prescribers, and Health and Wellbeing Coaches
            face every day.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link href="/signup" className="btn-primary">
              Create your free account
              <span aria-hidden>↗</span>
            </Link>
            <a
              href="#how-it-helps"
              className="border-b border-forest/25 pb-1 text-sm font-medium text-forest transition hover:border-forest"
            >
              See how it helps ↓
            </a>
          </div>

          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-muted">
            {[
              "Built for neighbourhood health",
              "Practical, never prescriptive",
              "Available when you need it",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Product glimpse */}
        <div className="relative">
          <div className="absolute -inset-6 rounded-[3rem] border border-forest/5" />
          <div className="relative rounded-card border border-forest/10 bg-white p-7 shadow-[0_24px_60px_-30px_rgba(43,58,46,0.35)]">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-forest">Your space</span>
              <span className="flex items-center gap-2 rounded-full bg-mist px-3 py-1 text-xs text-forest-light">
                <span className="h-1.5 w-1.5 rounded-full bg-forest-light" />
                This week
              </span>
            </div>

            <div className="mt-5 rounded-2xl bg-mist p-5">
              <p className="eyebrow text-forest-light">This week</p>
              <p className="mt-3 font-display text-xl leading-snug text-forest">
                Think of a conversation this week that stayed with you. What was
                the person actually asking for, underneath what they said?
              </p>
            </div>

            <div className="mt-5 space-y-3">
              {[
                { t: "When the person does not fit the criteria", tag: "Saved" },
                { t: "Staying steady under pressure", tag: "Read" },
                { t: "De-escalation phrase bank", tag: "Tool" },
              ].map((row) => (
                <div
                  key={row.t}
                  className="flex items-center justify-between gap-4 rounded-xl border border-forest/10 px-4 py-3"
                >
                  <span className="text-sm text-forest">{row.t}</span>
                  <span className="shrink-0 rounded-full bg-cream-deep px-2.5 py-1 text-xs text-ink-muted">
                    {row.tag}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex gap-2 text-xs">
              {["Reflect", "Prepare", "Move forward"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-forest/15 px-3 py-1.5 uppercase tracking-eyebrow text-ink-muted"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Banner */}
      <div className="bg-forest px-6 py-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-xs font-semibold uppercase tracking-eyebrow text-cream">
          {[
            "Person-centred thinking",
            "Real-world situations",
            "Neighbourhood teams",
            "Reflective practice",
          ].map((item, i) => (
            <span key={item} className="flex items-center gap-8">
              {i > 0 && (
                <span className="h-1 w-1 rounded-full bg-terracotta" aria-hidden />
              )}
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* How it helps */}
      <section id="how-it-helps" className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <p className="eyebrow lg:col-span-3">
            Support for the work as it really is
          </p>
          <h2 className="display text-4xl sm:text-5xl lg:col-span-6">
            Bring the situation. Find a way forward.
          </h2>
          <p className="text-base leading-relaxed text-ink-muted lg:col-span-3">
            AlongsideYou gives you a calm place to think before the conversation,
            during a difficult day, or when you need to see the situation
            differently.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.n}
              className={`rounded-card p-8 ${
                i === 1 ? "bg-mist" : "bg-cream-deep"
              }`}
            >
              <p className="text-xs tracking-eyebrow text-ink-muted">
                {step.n}
              </p>
              <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-lg text-terracotta">
                {i === 0 ? "“ ”" : i === 1 ? "↔" : "→"}
              </div>
              <h3 className="mt-8 text-xl text-forest">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Themes */}
      <section className="bg-forest px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-cream/50">Companion Themes</p>
            <h2 className="display mt-5 text-4xl text-cream sm:text-5xl">
              Made for the moments that don&apos;t fit neatly in a handbook.
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-cream/70">
              Start with a theme, or simply start with what is on your mind.
            </p>
            <Link
              href="/themes"
              className="mt-8 inline-block border-b border-cream/40 pb-1 text-sm font-medium text-cream transition hover:border-cream"
            >
              Explore all themes ↗
            </Link>
          </div>

          <ul className="divide-y divide-cream/15 border-t border-cream/15">
            {themes.map((theme, i) => (
              <li key={theme.slug}>
                <Link
                  href={`/themes/${theme.slug}`}
                  className="group flex items-center gap-6 py-6 transition"
                >
                  <span className="text-xs tracking-eyebrow text-cream/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-display text-xl text-cream sm:text-2xl">
                    {theme.title}
                  </span>
                  <span className="text-terracotta-light transition group-hover:translate-x-1">
                    ↗
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Roles */}
      <section id="who-its-for" className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <p className="eyebrow lg:col-span-3">Built with your role in mind</p>
          <h2 className="display text-4xl sm:text-5xl lg:col-span-6">
            Different roles. Shared purpose.
          </h2>
          <p className="text-base leading-relaxed text-ink-muted lg:col-span-3">
            One companion, shaped around the reality of personalised care in
            Integrated Neighbourhood Teams.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {roles.map((role) => (
            <div key={role.title} className={`rounded-card p-8 ${role.tint}`}>
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-full text-sm font-medium ${role.badge}`}
              >
                {role.initials}
              </div>
              <h3 className="mt-10 text-xl text-forest">{role.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {role.text}
              </p>
              <Link
                href="/signup"
                className="mt-7 inline-block border-b border-forest/30 pb-0.5 text-sm font-medium text-forest transition hover:border-forest"
              >
                Get started ↗
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Boundary */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-12 rounded-card bg-mist p-10 lg:grid-cols-2 lg:p-16">
          <div>
            <p className="eyebrow">A thoughtful boundary</p>
            <h2 className="display mt-5 text-3xl sm:text-4xl">
              Here to support your thinking, not replace your judgement.
            </h2>
          </div>
          <ul className="divide-y divide-forest/10">
            {boundaries.map((item) => (
              <li key={item.text} className="flex items-start gap-4 py-4">
                <span className="mt-0.5 text-terracotta" aria-hidden>
                  {item.included ? "✓" : "—"}
                </span>
                <span className="text-sm leading-relaxed text-ink">
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-terracotta px-6 py-28 text-center">
        <p className="eyebrow text-cream/70">Your companion is ready</p>
        <h2 className="display mx-auto mt-6 max-w-3xl text-4xl text-cream sm:text-5xl">
          Bring the situation. Think it through.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-cream/85">
          Create a free account and explore the companion at your own pace.
        </p>
        <Link
          href="/signup"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-cream px-8 py-4 text-sm font-medium text-forest transition hover:bg-white"
        >
          Create your free account
          <span aria-hidden>↗</span>
        </Link>
      </section>

      <SiteFooter />
    </div>
  );
}
