"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Pillar = {
  label: string;
  index: string;
};

const PILLARS: ReadonlyArray<Pillar> = [
  { index: "01", label: "Strategy" },
  { index: "02", label: "Brand" },
  { index: "03", label: "Product" },
  { index: "04", label: "Growth" },
];

export default function PillarsStrip(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    if (prefersReducedMotion) {
      gsap.set(itemsRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el, idx) => {
        if (!el) return;
        const direction = idx % 2 === 0 ? -1 : 1;
        gsap.fromTo(
          el,
          { yPercent: 18 * direction, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 1.1,
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "bottom 30%",
              scrub: 0.7,
            },
            delay: idx * 0.05,
          }
        );
      });

      if (pathRef.current) {
        gsap.fromTo(
          pathRef.current,
          { strokeDashoffset: 1200 },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              end: "bottom 20%",
              scrub: 0.8,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-surfaceTint py-32 md:py-40"
      aria-label="Pillars"
    >
      <svg
        viewBox="0 0 1440 240"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 h-[120px] w-full -translate-y-1/2"
      >
        <path
          ref={pathRef}
          d="M0,180 C320,40 720,300 1080,80 C1280,-40 1440,120 1440,120"
          fill="none"
          stroke="var(--color-primary-accent)"
          strokeOpacity="0.18"
          strokeWidth="1"
          strokeDasharray="1200"
          strokeDashoffset="1200"
        />
      </svg>

      <div className="relative mx-auto flex max-w-[1400px] flex-row flex-nowrap items-center justify-between gap-8 px-6 md:px-12">
        {PILLARS.map((pillar, idx) => (
          <div
            key={pillar.index}
            ref={(el) => {
              itemsRef.current[idx] = el;
            }}
            className="flex flex-col items-start"
            style={{ transform: `translateY(${(idx % 2 === 0 ? -1 : 1) * 8}px)` }}
          >
            <span className="font-body text-xs uppercase tracking-[0.3em] text-mutedInk">
              {pillar.index}
            </span>
            <span className="font-display mt-3 text-3xl text-ink md:text-5xl">
              {pillar.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
