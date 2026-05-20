"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Service = {
  id: string;
  label: string;
  title: string;
  description: string;
  deliverables: ReadonlyArray<string>;
};

const SERVICES: ReadonlyArray<Service> = [
  {
    id: "strategy",
    label: "Strategy",
    title: "Strategy & Positioning",
    description:
      "Sharpen what you stand for, who you stand against and where you win. Research, narrative architecture and category design.",
    deliverables: ["Market & audience research", "Positioning narrative", "Naming & messaging"],
  },
  {
    id: "brand",
    label: "Brand",
    title: "Brand Systems",
    description:
      "Identity systems built to scale across every surface. Logotypes, motion, sound, voice and the rules to keep them coherent.",
    deliverables: ["Visual identity", "Brand guidelines", "Motion & sound"],
  },
  {
    id: "product",
    label: "Product",
    title: "Product & Interface",
    description:
      "Web, app and platform design engineered for clarity, speed and conversion. Built with engineering, not handed off to it.",
    deliverables: ["UX architecture", "UI design systems", "Front-end build"],
  },
  {
    id: "content",
    label: "Content",
    title: "Content & Story",
    description:
      "Editorial, film and social systems that compound brand equity instead of burning through ad budget every quarter.",
    deliverables: ["Editorial direction", "Film & photography", "Social systems"],
  },
  {
    id: "growth",
    label: "Growth",
    title: "Performance & Growth",
    description:
      "Paid, organic and lifecycle engineered as one funnel. Measurement that exposes what's actually working — not what looks good in a deck.",
    deliverables: ["Paid media", "SEO & lifecycle", "Measurement stack"],
  },
  {
    id: "ai",
    label: "AI",
    title: "AI & Automation",
    description:
      "Custom agents, internal tools and ops automation that compress the distance between idea and execution.",
    deliverables: ["Internal tools", "AI agents", "Workflow automation"],
  },
];

export default function ServicesWheel(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wheelRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    const wheel = wheelRef.current;
    if (!section || !wheel) return;

    gsap.registerPlugin(ScrollTrigger);

    if (prefersReducedMotion) {
      gsap.set(wheel, { rotation: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wheel,
        { rotation: -45 },
        {
          rotation: 45,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const radius = 220;
  const center = 280;
  const activeService = SERVICES[active] ?? SERVICES[0];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-surfaceTint py-24 md:py-32"
      aria-label="Services"
    >
      <div className="absolute left-6 top-6 text-xs uppercase tracking-[0.3em] text-mutedInk md:left-12 md:top-12">
        Services — 003
      </div>

      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:px-12">
        <div className="relative flex items-center justify-center">
          <div
            ref={wheelRef}
            className="relative"
            style={{ width: center * 2, height: center * 2, maxWidth: "100%", aspectRatio: "1 / 1" }}
          >
            <svg
              viewBox={`0 0 ${center * 2} ${center * 2}`}
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="var(--color-primary-accent)"
                strokeOpacity="0.18"
                strokeWidth="1"
              />
              <circle
                cx={center}
                cy={center}
                r={radius - 40}
                fill="none"
                stroke="var(--color-primary-accent)"
                strokeOpacity="0.08"
                strokeWidth="1"
                strokeDasharray="2 8"
              />
            </svg>

            {SERVICES.map((service, idx) => {
              const angle = (360 / SERVICES.length) * idx - 90;
              const rad = (angle * Math.PI) / 180;
              const x = center + radius * Math.cos(rad);
              const y = center + radius * Math.sin(rad);
              const isActive = idx === active;

              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActive(idx)}
                  className="absolute flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-center transition-colors duration-300"
                  style={{
                    left: x,
                    top: y,
                    borderColor: isActive ? "var(--color-primary-accent)" : "rgba(17,19,21,0.15)",
                    backgroundColor: isActive ? "var(--color-primary-accent)" : "var(--color-surface-tint)",
                    color: isActive ? "var(--color-surface-tint)" : "var(--color-ink)",
                  }}
                  aria-pressed={isActive}
                  aria-label={`Show details for ${service.label}`}
                >
                  <span className="font-display text-xs uppercase tracking-[0.15em]">
                    {service.label}
                  </span>
                </button>
              );
            })}

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="font-body text-[10px] uppercase tracking-[0.4em] text-mutedInk">
                Odds
              </div>
              <div className="font-display mt-1 text-2xl text-ink">Services</div>
            </div>
          </div>
        </div>

        <div className="relative min-h-[320px]">
          <ServicePanel service={activeService} />
        </div>
      </div>
    </section>
  );
}

type ServicePanelProps = {
  service: Service;
};

function ServicePanel({ service }: ServicePanelProps): React.JSX.Element {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = panelRef.current;
    if (!node) return;
    const prefersReducedMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(node, { opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(
      node,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", overwrite: true }
    );
  }, [service.id]);

  return (
    <div ref={panelRef} className="rounded-2xl border border-ink/10 bg-white/40 p-8 backdrop-blur-sm">
      <div className="font-body text-xs uppercase tracking-[0.3em] text-primaryAccent" style={{ color: "var(--color-primary-accent)" }}>
        {service.label}
      </div>
      <h3 className="font-display mt-4 text-3xl text-ink md:text-4xl">{service.title}</h3>
      <p className="font-body mt-4 text-base leading-relaxed text-mutedInk">{service.description}</p>
      <ul className="font-body mt-6 space-y-2 text-sm text-ink">
        {service.deliverables.map((item) => (
          <li key={item} className="flex items-center gap-3">
            <span
              className="inline-block h-1 w-6"
              style={{ backgroundColor: "var(--color-primary-accent)" }}
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
