"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";

export default function Hero(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wordmarkRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wordmark = wordmarkRef.current;
    const desc = descRef.current;
    const eyebrow = eyebrowRef.current;
    if (!wordmark || !desc || !eyebrow) return;

    if (prefersReducedMotion) {
      gsap.set([wordmark, desc, eyebrow], { opacity: 1, y: 0 });
      return;
    }

    const splitWord = new SplitType(wordmark, { types: "chars", tagName: "span" });
    const chars = splitWord.chars ?? [];

    const ctx = gsap.context(() => {
      gsap.set(chars, { yPercent: 110, opacity: 0 });
      gsap.set(eyebrow, { opacity: 0, y: 16 });
      gsap.set(desc, { opacity: 0, y: 24 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.9 })
        .to(
          chars,
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.4,
            stagger: 0.05,
          },
          "-=0.6"
        )
        .to(desc, { opacity: 1, y: 0, duration: 1.0 }, "-=0.7");
    }, sectionRef);

    return () => {
      ctx.revert();
      splitWord.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-surfaceTint"
    >
      <div className="absolute left-1/2 top-8 -translate-x-1/2 text-center">
        <span
          ref={eyebrowRef}
          className="font-body inline-block text-xs uppercase tracking-[0.4em] text-mutedInk"
        >
          Odds — Independent studio · est. 2024
        </span>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center px-6">
        <h1
          ref={wordmarkRef}
          className="font-display select-none text-[12vw] leading-[0.85] text-ink"
          style={{ letterSpacing: "-0.06em" }}
        >
          Odds
        </h1>

        <div
          ref={descRef}
          className="absolute bottom-[12vh] right-[6vw] max-w-[280px] text-right md:bottom-[14vh] md:right-[8vw] md:max-w-[320px]"
        >
          <p className="font-body text-sm leading-relaxed text-mutedInk md:text-base">
            A creative &amp; strategic studio engineering brands,
            <br />
            products and experiences for{" "}
            <span className="text-ink">what&apos;s next</span>.
          </p>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.4em] text-mutedInk">
        Scroll
      </div>
    </section>
  );
}
