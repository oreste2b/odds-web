"use client";

import { ArrowUpRight } from "lucide-react";
import { useSmoothScroll } from "@/context/SmoothScrollProvider";

type LinkItem = {
  label: string;
  href: string;
};

type Column = {
  title: string;
  links: ReadonlyArray<LinkItem>;
};

const COLUMNS: ReadonlyArray<Column> = [
  {
    title: "Studio",
    links: [
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Work", href: "#work" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "New business", href: "mailto:hello@odds.media" },
      { label: "Careers", href: "mailto:careers@odds.media" },
      { label: "Press", href: "mailto:press@odds.media" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "LinkedIn", href: "https://linkedin.com" },
      { label: "Are.na", href: "https://are.na" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];

export default function Footer(): React.JSX.Element {
  const { scrollTo } = useSmoothScroll();
  const year = new Date().getFullYear();

  const handleBackToTop = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    scrollTo(0, { duration: 1.4 });
  };

  return (
    <footer className="relative w-full border-t border-ink/10 bg-surfaceTint pt-20 pb-12">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12">
        <div className="flex items-start justify-between gap-8">
          <h3 className="font-display text-5xl leading-none text-ink md:text-7xl lg:text-8xl">
            Odds.
          </h3>
          <button
            type="button"
            onClick={handleBackToTop}
            className="font-body group inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-xs uppercase tracking-[0.3em] text-ink transition-colors duration-300 hover:border-[var(--color-primary-accent)] hover:text-[var(--color-primary-accent)]"
          >
            Back to top
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-10 md:grid-cols-4">
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <div className="font-body text-xs uppercase tracking-[0.3em] text-mutedInk">
                {column.title}
              </div>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-body text-base text-ink transition-colors duration-300 hover:text-[var(--color-primary-accent)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-ink/10 pt-8 md:flex-row md:items-center">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-mutedInk">
            © {year} Odds Media — All rights reserved.
          </p>
          <p className="font-body text-xs uppercase tracking-[0.3em] text-mutedInk">
            Built for what&apos;s next.
          </p>
        </div>
      </div>
    </footer>
  );
}
