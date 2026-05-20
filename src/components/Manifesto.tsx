"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

const PHRASES: ReadonlyArray<string> = [
  "We treat odds as opportunities — not constraints.",
  "We build brands that compound — not campaigns that fade.",
  "We ship products people defend — not features they tolerate.",
  "We engineer growth that lasts beyond the launch.",
];

export default function Manifesto(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const phraseRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    if (prefersReducedMotion) {
      phraseRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 1, scale: 1 });
      });
      return;
    }

    const splits: SplitType[] = [];

    const ctx = gsap.context(() => {
      phraseRefs.current.forEach((el, idx) => {
        if (!el) return;
        const split = new SplitType(el, { types: "lines", tagName: "span" });
        splits.push(split);
        gsap.set(split.lines, { opacity: 0, y: 30 });
        gsap.set(el, { opacity: 0, scale: 0.8 });
      });

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * PHRASES.length}`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
      });

      const total = PHRASES.length;
      phraseRefs.current.forEach((el, idx) => {
        if (!el) return;
        const inStart = idx / total;
        const inEnd = (idx + 0.4) / total;
        const outStart = (idx + 0.6) / total;
        const outEnd = (idx + 1) / total;

        gsap.to(el, {
          opacity: 1,
          scale: 1.0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: `top+=${inStart * window.innerHeight * total} top`,
            end: `top+=${inEnd * window.innerHeight * total} top`,
            scrub: true,
          },
        });

        gsap.fromTo(
          el,
          { scale: 0.85 },
          {
            scale: 1.15,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: `top+=${inStart * window.innerHeight * total} top`,
              end: `top+=${outEnd * window.innerHeight * total} top`,
              scrub: true,
            },
          }
        );

        const lines = (splits[idx]?.lines ?? []) as HTMLElement[];
        if (lines.length > 0) {
          gsap.to(lines, {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: `top+=${inStart * window.innerHeight * total} top`,
              end: `top+=${inEnd * window.innerHeight * total} top`,
              scrub: true,
            },
          });
        }

        gsap.to(el, {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: `top+=${outStart * window.innerHeight * total} top`,
            end: `top+=${outEnd * window.innerHeight * total} top`,
            scrub: true,
          },
        });
      });

      return () => {
        trigger.kill();
      };
    }, section);

    return () => {
      ctx.revert();
      splits.forEach((s) => s.revert());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-surfaceTint"
      aria-label="Manifesto"
    >
      <div className="absolute left-6 top-6 text-xs uppercase tracking-[0.3em] text-mutedInk md:left-12 md:top-12">
        Manifesto — 002
      </div>

      <div className="relative mx-auto flex w-full max-w-[1200px] items-center justify-center px-6">
        <div className="relative flex w-full items-center justify-center">
          {PHRASES.map((phrase, idx) => (
            <div
              key={idx}
              ref={(el) => {
                phraseRefs.current[idx] = el;
              }}
              className="font-display absolute left-1/2 top-1/2 w-full max-w-[1100px] -translate-x-1/2 -translate-y-1/2 px-4 text-center text-4xl leading-[1.05] text-ink md:text-6xl lg:text-7xl"
            >
              {phrase}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
