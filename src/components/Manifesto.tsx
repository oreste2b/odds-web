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

const VIDEO_SRC =
  "https://videos.pexels.com/video-files/3209828/3209828-hd_1280_720_25fps.mp4";

const VIDEO_POSTER =
  "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=2000&q=80";

type VideoWithFastSeek = HTMLVideoElement & { fastSeek?: (time: number) => void };

export default function Manifesto(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const phraseRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    const video = videoRef.current as VideoWithFastSeek | null;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    if (prefersReducedMotion) {
      phraseRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 1, scale: 1 });
      });
      return;
    }

    const splits: SplitType[] = [];
    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      phraseRefs.current.forEach((el) => {
        if (!el) return;
        const split = new SplitType(el, { types: "lines", tagName: "span" });
        splits.push(split);
        gsap.set(split.lines, { opacity: 0, y: 30 });
        gsap.set(el, { opacity: 0, scale: 0.85 });
      });

      const total = PHRASES.length;
      const endDistance = window.innerHeight * 3;

      const pinTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${endDistance}`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      if (video) {
        const proxy = { t: 0 };
        let lastApplied = -1;
        let pendingFrame = 0;

        const applyTime = (): void => {
          pendingFrame = 0;
          const next = proxy.t;
          if (Math.abs(next - lastApplied) < 0.033) return;
          lastApplied = next;
          try {
            if (typeof video.fastSeek === "function") {
              video.fastSeek(next);
            } else {
              video.currentTime = next;
            }
          } catch {
            // Ignore seek errors during transitions
          }
        };

        const scheduleApply = (): void => {
          if (pendingFrame !== 0) return;
          pendingFrame = window.requestAnimationFrame(applyTime);
        };

        const videoTween = gsap.to(proxy, {
          t: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${endDistance}`,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
          onUpdate: scheduleApply,
        });

        const bindDuration = (): void => {
          if (!Number.isFinite(video.duration) || video.duration <= 0) return;
          videoTween.vars.t = Math.max(0, video.duration - 0.05);
          videoTween.invalidate();
          ScrollTrigger.refresh();
        };

        const handleReady = (): void => {
          bindDuration();
        };

        if (video.readyState >= 3) {
          handleReady();
        } else {
          video.addEventListener("canplaythrough", handleReady, { once: true });
          video.addEventListener("loadedmetadata", bindDuration, { once: true });
        }

        cleanups.push(() => {
          video.removeEventListener("canplaythrough", handleReady);
          video.removeEventListener("loadedmetadata", bindDuration);
          if (pendingFrame !== 0) window.cancelAnimationFrame(pendingFrame);
        });
      }

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
            start: `top+=${inStart * endDistance} top`,
            end: `top+=${inEnd * endDistance} top`,
            scrub: true,
          },
        });

        gsap.fromTo(
          el,
          { scale: 0.9 },
          {
            scale: 1.12,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: `top+=${inStart * endDistance} top`,
              end: `top+=${outEnd * endDistance} top`,
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
              start: `top+=${inStart * endDistance} top`,
              end: `top+=${inEnd * endDistance} top`,
              scrub: true,
            },
          });
        }

        gsap.to(el, {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: `top+=${outStart * endDistance} top`,
            end: `top+=${outEnd * endDistance} top`,
            scrub: true,
          },
        });
      });

      cleanups.push(() => pinTrigger.kill());
    }, section);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
      splits.forEach((s) => s.revert());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-ink"
      aria-label="Manifesto"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEO_SRC}
        poster={VIDEO_POSTER}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
        style={{ willChange: "transform", transform: "translateZ(0)" }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(17,19,21,0.55) 0%, rgba(17,19,21,0.35) 50%, rgba(17,19,21,0.7) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="absolute left-6 top-6 z-10 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/80 md:left-12 md:top-12">
        <span>Manifesto — 002</span>
        <span
          aria-hidden="true"
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: "var(--color-accent-hover)" }}
        />
      </div>

      <div className="absolute right-6 top-6 z-10 rounded-full border border-white/30 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/80 backdrop-blur-sm md:right-12 md:top-12">
        Scroll-controlled video · placeholder
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-white/60 md:bottom-10">
        Scroll to scrub
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] items-center justify-center px-6">
        <div className="relative flex w-full items-center justify-center">
          {PHRASES.map((phrase, idx) => (
            <div
              key={idx}
              ref={(el) => {
                phraseRefs.current[idx] = el;
              }}
              className="font-display absolute left-1/2 top-1/2 w-full max-w-[1100px] -translate-x-1/2 -translate-y-1/2 px-4 text-center text-4xl leading-[1.05] text-white md:text-6xl lg:text-7xl"
              style={{ textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}
            >
              {phrase}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
