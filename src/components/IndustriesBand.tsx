"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Industry = {
  index: string;
  name: string;
  focus: string;
  image: string;
};

const INDUSTRIES: ReadonlyArray<Industry> = [
  {
    index: "01",
    name: "Finance & Fintech",
    focus: "Trust at speed",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1400&q=80",
  },
  {
    index: "02",
    name: "Consumer Tech",
    focus: "Products people defend",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
  },
  {
    index: "03",
    name: "Hospitality",
    focus: "Atmosphere as a system",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=80",
  },
  {
    index: "04",
    name: "Health & Wellness",
    focus: "Calm authority",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    index: "05",
    name: "Media & Culture",
    focus: "Stories that move markets",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1400&q=80",
  },
  {
    index: "06",
    name: "Real Estate",
    focus: "Place-making",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    index: "07",
    name: "Sports & Entertainment",
    focus: "Energy with edge",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1400&q=80",
  },
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
          className="flex h-[70vh] flex-row flex-nowrap items-center gap-8 px-[10vw] will-change-transform"
        >
          {INDUSTRIES.map((industry) => (
            <article
              key={industry.index}
              className="group relative h-full w-[80vw] flex-shrink-0 overflow-hidden rounded-2xl md:w-[48vw] lg:w-[36vw]"
            >
              <Image
                src={industry.image}
                alt={`${industry.name} — placeholder imagery from Unsplash`}
                fill
                sizes="(min-width: 1024px) 36vw, (min-width: 768px) 48vw, 80vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />

              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(17,19,21,0.05) 0%, rgba(17,19,21,0.55) 70%, rgba(17,19,21,0.85) 100%)",
                }}
                aria-hidden="true"
              />

              <header className="absolute left-6 right-6 top-6 flex items-baseline justify-between text-white md:left-8 md:right-8 md:top-8">
                <span className="font-body text-xs uppercase tracking-[0.3em] opacity-80">
                  {industry.index}
                </span>
                <span
                  className="font-body text-[11px] uppercase tracking-[0.3em]"
                  style={{ color: "var(--color-accent-hover)" }}
                >
                  {industry.focus}
                </span>
              </header>

              <div className="absolute bottom-6 left-6 right-6 text-white md:bottom-8 md:left-8 md:right-8">
                <h3 className="font-display text-3xl leading-[1.05] md:text-5xl">
                  {industry.name}
                </h3>
                <footer className="font-body mt-6 flex items-center justify-between text-xs uppercase tracking-[0.3em] opacity-80">
                  <span>Selected work</span>
                  <span aria-hidden="true">→</span>
                </footer>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
