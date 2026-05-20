"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const REEL_POSTER =
  "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=2000&q=80";

export default function FeaturedReel(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const captionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    const frame = frameRef.current;
    const media = mediaRef.current;
    const overlay = overlayRef.current;
    const caption = captionRef.current;
    if (!section || !frame || !media) return;

    if (prefersReducedMotion) {
      gsap.set(media, { yPercent: 0, scale: 1 });
      if (overlay) gsap.set(overlay, { opacity: 0.3 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(media, { yPercent: -15, scale: 1.05 });

      gsap.to(media, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      gsap.fromTo(
        frame,
        { scale: 0.94, borderRadius: 48 },
        {
          scale: 1,
          borderRadius: 24,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 25%",
            scrub: 0.6,
          },
        }
      );

      if (overlay) {
        gsap.fromTo(
          overlay,
          { opacity: 0.55 },
          {
            opacity: 0.2,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 30%",
              scrub: true,
            },
          }
        );
      }

      if (caption) {
        gsap.fromTo(
          caption,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              end: "top 35%",
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
      id="reel"
      className="relative w-full bg-surfaceTint py-16 md:py-24"
      aria-label="Brand reel"
    >
      <div className="absolute left-6 top-6 text-xs uppercase tracking-[0.3em] text-mutedInk md:left-12 md:top-12">
        Reel — 001
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12">
        <div
          ref={frameRef}
          className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-ink/5 will-change-transform"
        >
          <div
            ref={mediaRef}
            className="absolute inset-x-0 -top-[15%] -bottom-[15%] will-change-transform"
            style={{ height: "130%" }}
          >
            <Image
              src={REEL_POSTER}
              alt="Odds — selected work reel poster"
              fill
              priority
              sizes="(min-width: 1400px) 1400px, 100vw"
              className="object-cover"
            />
          </div>

          <div
            ref={overlayRef}
            className="absolute inset-0 bg-ink/40"
            aria-hidden="true"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              className="group relative flex h-24 w-24 items-center justify-center rounded-full border border-white/40 backdrop-blur-md transition-all duration-500 hover:h-28 hover:w-28 md:h-32 md:w-32"
              aria-label="Play reel"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundColor: "rgba(46,125,50,0.55)" }}
              />
              <span
                aria-hidden="true"
                className="absolute -inset-3 rounded-full border border-white/30 opacity-60"
              />
              <Play size={32} className="relative z-10 text-white" fill="white" />
            </button>
          </div>

          <div
            ref={captionRef}
            className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white md:bottom-10 md:left-10 md:right-10"
          >
            <div>
              <div className="font-body text-[10px] uppercase tracking-[0.4em] opacity-70">
                Brand film
              </div>
              <h2 className="font-display mt-2 text-3xl leading-[1.05] md:text-5xl">
                Selected work · 2024–2026
              </h2>
            </div>
            <div className="font-body hidden text-right text-xs uppercase tracking-[0.3em] opacity-70 md:block">
              <div>Duration</div>
              <div className="mt-1 text-white">00:36</div>
            </div>
          </div>

          <div className="absolute right-6 top-6 rounded-full border border-white/40 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white backdrop-blur-sm md:right-10 md:top-10">
            Video placeholder · replace with brand reel
          </div>
        </div>
      </div>
    </section>
  );
}
