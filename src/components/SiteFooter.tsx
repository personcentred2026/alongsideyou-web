import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-forest-deep px-6 py-16 text-cream/70">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="h-3.5 w-3.5 rounded-full bg-terracotta" />
            <span className="text-lg font-semibold text-cream">
              AlongsideYou
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Supporting the workforce delivering neighbourhood health. Part of the
            Person Centred Academy.
          </p>
        </div>

        <div>
          <p className="eyebrow text-cream/45">Explore</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href="#how-it-helps" className="transition hover:text-cream">
                How it helps
              </a>
            </li>
            <li>
              <a href="#who-its-for" className="transition hover:text-cream">
                Who it&apos;s for
              </a>
            </li>
            <li>
              <Link href="/themes" className="transition hover:text-cream">
                Companion Themes
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-cream/45">Account</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/login" className="transition hover:text-cream">
                Sign in
              </Link>
            </li>
            <li>
              <Link href="/signup" className="transition hover:text-cream">
                Create account
              </Link>
            </li>
            <li>
              <a
                href="mailto:hello@alongsideyou.care"
                className="transition hover:text-cream"
              >
                hello@alongsideyou.care
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-6xl border-t border-cream/10 pt-6 text-xs text-cream/45">
        AlongsideYou is owned by the Person Centred Academy.
      </div>
    </footer>
  );
}
