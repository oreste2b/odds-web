"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Service = {
  id: string;
  index: string;
  label: string;
  title: string;
  description: string;
  deliverables: ReadonlyArray<string>;
  image: string;
};

const SERVICES: ReadonlyArray<Service> = [
  {
    id: "strategy",
    index: "01",
    label: "Strategy",
    title: "Strategy & Positioning",
    description:
      "Sharpen what you stand for, who you stand against and where you win. Research, narrative architecture and category design.",
    deliverables: ["Market & audience research", "Positioning narrative", "Naming & messaging"],
    image:
      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "brand",
    index: "02",
    label: "Brand",
    title: "Brand Systems",
    description:
      "Identity systems built to scale across every surface. Logotypes, motion, sound, voice and the rules to keep them coherent.",
    deliverables: ["Visual identity", "Brand guidelines", "Motion & sound"],
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "product",
    index: "03",
    label: "Product",
    title: "Product & Interface",
    description:
      "Web, app and platform design engineered for clarity, speed and conversion. Built with engineering, not handed off to it.",
    deliverables: ["UX architecture", "UI design systems", "Front-end build"],
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "content",
    index: "04",
    label: "Content",
    title: "Content & Story",
    description:
      "Editorial, film and social systems that compound brand equity instead of burning through ad budget every quarter.",
    deliverables: ["Editorial direction", "Film & photography", "Social systems"],
    image:
      "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "growth",
    index: "05",
    label: "Growth",
    title: "Performance & Growth",
    description:
      "Paid, organic and lifecycle engineered as one funnel. Measurement that exposes what's actually working — not what looks good in a deck.",
    deliverables: ["Paid media", "SEO & lifecycle", "Measurement stack"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ai",
    index: "06",
    label: "AI",
    title: "AI & Automation",
    description:
      "Custom agents, internal tools and ops automation that compress the distance between idea and execution.",
    deliverables: ["Internal tools", "AI agents", "Workflow automation"],
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function ServicesWheel(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const rowRefs = useRef<Array<HTMLLIElement | null>>([]);
  const indexBigRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const triggers: ScrollTrigger[] = [];

    rowRefs.current.forEach((el, idx) => {
      if (!el) return;
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 45%",
        onEnter: () => setActive(idx),
        onEnterBack: () => setActive(idx),
      });
      triggers.push(trigger);

      if (!prefersReducedMotion) {
        gsap.fromTo(
          el,
          { opacity: 0.35, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 50%",
              scrub: 0.5,
            },
          }
        );
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const targets: Array<HTMLElement | null> = [
      indexBigRef.current,
      titleRef.current,
      descRef.current,
      listRef.current,
      mediaRef.current,
    ];

    targets.forEach((node) => {
      if (!node) return;
      if (prefersReducedMotion) {
        gsap.set(node, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        node,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", overwrite: true }
      );
    });
  }, [active]);

  const activeService = SERVICES[active] ?? SERVICES[0];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full bg-surfaceTint py-28 md:py-40"
      aria-label="Services"
    >
      <div className="absolute left-6 top-6 text-xs uppercase tracking-[0.3em] text-mutedInk md:left-12 md:top-12">
        Services — 003
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12">
        <div className="mb-20 grid grid-cols-1 items-end gap-6 md:grid-cols-2">
          <h2 className="font-display text-5xl leading-[0.95] text-ink md:text-7xl">
            What we do.
          </h2>
          <p className="font-body max-w-[480px] text-base leading-relaxed text-mutedInk md:justify-self-end md:text-right">
            Six disciplines, one operating model. We plug in as a senior team
            across strategy, brand, product, content, growth and AI — and stay
            until the work is compounding.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <aside className="md:col-span-5">
            <div
              ref={stickyRef}
              className="md:sticky md:top-28"
            >
              <div
                ref={mediaRef}
                className="relative aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-2xl bg-ink/5"
              >
                <Image
                  key={activeService.id}
                  src={activeService.image}
                  alt={`${activeService.title} — placeholder visual`}
                  fill
                  sizes="(min-width: 768px) 340px, 80vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(17,19,21,0) 30%, rgba(17,19,21,0.55) 100%)",
                  }}
                  aria-hidden="true"
                />
                <div
                  ref={indexBigRef}
                  className="font-display absolute bottom-4 left-5 text-6xl leading-[0.85] text-white md:text-7xl"
                  style={{ letterSpacing: "-0.06em" }}
                >
                  {activeService.index}
                </div>
                <div className="absolute right-4 top-4 rounded-full border border-white/40 bg-black/30 px-2.5 py-1 text-[9px] uppercase tracking-[0.3em] text-white backdrop-blur-sm">
                  Image placeholder
                </div>
              </div>

              <div className="mt-6 h-px w-24" style={{ backgroundColor: "var(--color-primary-accent)" }} />

              <h3
                ref={titleRef}
                className="font-display mt-6 text-3xl text-ink md:text-5xl"
              >
                {activeService.title}
              </h3>

              <p
                ref={descRef}
                className="font-body mt-5 max-w-[420px] text-base leading-relaxed text-mutedInk"
              >
                {activeService.description}
              </p>

              <ul ref={listRef} className="mt-8 space-y-3">
                {activeService.deliverables.map((item) => (
                  <li
                    key={item}
                    className="font-body flex items-center gap-3 text-sm text-ink"
                  >
                    <span
                      aria-hidden="true"
                      className="inline-block h-px w-6"
                      style={{ backgroundColor: "var(--color-primary-accent)" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <ol className="md:col-span-7">
            {SERVICES.map((service, idx) => {
              const isActive = idx === active;
              return (
                <li
                  key={service.id}
                  ref={(el) => {
                    rowRefs.current[idx] = el;
                  }}
                  className="group relative flex min-h-[44vh] flex-col justify-center border-t border-ink/10 py-10 transition-colors duration-500"
                  style={{
                    borderTopColor: isActive
                      ? "var(--color-primary-accent)"
                      : "rgba(17,19,21,0.10)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActive(idx)}
                    className="text-left"
                    aria-pressed={isActive}
                  >
                    <div className="flex items-baseline gap-6">
                      <span
                        className="font-body text-xs uppercase tracking-[0.3em] transition-colors duration-500"
                        style={{
                          color: isActive
                            ? "var(--color-primary-accent)"
                            : "var(--color-muted-ink)",
                        }}
                      >
                        {service.index}
                      </span>
                      <h4
                        className="font-display text-4xl leading-[1.0] transition-colors duration-500 md:text-6xl"
                        style={{
                          color: isActive ? "var(--color-ink)" : "rgba(17,19,21,0.45)",
                        }}
                      >
                        {service.label}
                      </h4>
                    </div>

                    <div
                      className="font-body mt-4 max-w-[480px] overflow-hidden text-sm leading-relaxed text-mutedInk transition-all duration-500"
                      style={{
                        maxHeight: isActive ? "200px" : "0px",
                        opacity: isActive ? 1 : 0,
                      }}
                    >
                      <p className="pt-2">{service.description}</p>
                    </div>
                  </button>
                </li>
              );
            })}
            <li className="border-t border-ink/10" aria-hidden="true" />
          </ol>
        </div>
      </div>
    </section>
  );
}
