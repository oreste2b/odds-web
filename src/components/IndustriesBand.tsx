"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Industry = {
  index: string;
  name: string;
  focus: string;
};

const INDUSTRIES: ReadonlyArray<Industry> = [
  { index: "01", name: "Finance & Fintech", focus: "Trust at speed" },
  { index: "02", name: "Consumer Tech", focus: "Products people defend" },
  { index: "03", name: "Hospitality", focus: "Atmosphere as a system" },
  { index: "04", name: "Health & Wellness", focus: "Calm authority" },
  { index: "05", name: "Media & Culture", focus: "Stories that move markets" },
  { index: "06", name: "Real Estate", focus: "Place-making" },
  { index: "07", name: "Sports & Entertainment", focus: "Energy with edge" },
];

export default function IndustriesBand(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    gsap.registerPlugin(ScrollTrigger);

    if (prefersReducedMotion) {
      gsap.set(track, { x: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const computeAmount = (): number => track.scrollWidth - window.innerWidth;
      let amount = computeAmount();

      const tween = gsap.to(track, {
        x: () => -amount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${amount}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const handleResize = (): void => {
        amount = computeAmount();
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        window.removeEventListener("resize", handleResize);
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-surfaceTint"
      aria-label="Industries"
    >
      <div className="absolute left-6 top-6 z-10 text-xs uppercase tracking-[0.3em] text-mutedInk md:left-12 md:top-12">
        Industries — 004
      </div>
      <div className="absolute right-6 top-6 z-10 text-right text-xs uppercase tracking-[0.3em] text-mutedInk md:right-12 md:top-12">
        Scroll →
      </div>

      <div className="flex h-full items-center">
        <div
          ref={trackRef}
          className="flex h-[60vh] flex-row flex-nowrap items-center gap-8 px-[10vw] will-change-transform"
        >
          {INDUSTRIES.map((industry) => (
            <article
              key={industry.index}
              className="flex h-full w-[70vw] flex-shrink-0 flex-col justify-between rounded-2xl border border-ink/10 bg-white/30 p-8 backdrop-blur-sm md:w-[42vw] lg:w-[32vw]"
            >
              <header className="flex items-baseline justify-between">
                <span className="font-body text-xs uppercase tracking-[0.3em] text-mutedInk">
                  {industry.index}
                </span>
                <span
                  className="font-body text-[11px] uppercase tracking-[0.3em]"
                  style={{ color: "var(--color-primary-accent)" }}
                >
                  {industry.focus}
                </span>
              </header>

              <div>
                <h3 className="font-display text-4xl leading-[1.05] text-ink md:text-5xl">
                  {industry.name}
                </h3>
              </div>

              <footer className="font-body flex items-center justify-between text-xs uppercase tracking-[0.3em] text-mutedInk">
                <span>Selected work</span>
                <span aria-hidden="true">→</span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
