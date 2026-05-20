"use client";

import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

type Review = {
  quote: string;
  name: string;
  role: string;
};

const REVIEWS: ReadonlyArray<Review> = [
  {
    quote:
      "Odds didn't just give us a brand — they gave us a thesis. Eighteen months later we're still operating from it.",
    name: "Marcela Iturra",
    role: "Founder, Norte Capital",
  },
  {
    quote:
      "The closest thing we've had to an in-house creative team without hiring one. Sharp, fast, allergic to fluff.",
    name: "David Chen",
    role: "CMO, Atlas Hospitality",
  },
  {
    quote:
      "They rebuilt the entire customer journey in eight weeks. Conversion is up 41%. Refund rate cut in half.",
    name: "Priya Shah",
    role: "Head of Product, Vela Health",
  },
  {
    quote:
      "Every deliverable felt one tier above what we asked for. We stopped briefing — we started collaborating.",
    name: "Tomás Reyes",
    role: "GM, Costa Studios",
  },
];

export default function Reviews(): React.JSX.Element {
  const swiperRef = useRef<SwiperInstance | null>(null);

  useEffect(() => {
    return () => {
      swiperRef.current = null;
    };
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden bg-surfaceTint py-28 md:py-40"
      aria-label="Client reviews"
    >
      <div className="absolute left-6 top-6 text-xs uppercase tracking-[0.3em] text-mutedInk md:left-12 md:top-12">
        Reviews — 005
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12">
        <Swiper
          modules={[EffectFade, Autoplay, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={800}
          loop
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          onSwiper={(s) => {
            swiperRef.current = s;
          }}
          className="!pb-16"
        >
          {REVIEWS.map((review) => (
            <SwiperSlide key={review.name}>
              <figure className="mx-auto max-w-[1200px] text-center">
                <blockquote className="font-display text-3xl leading-[1.1] text-ink md:text-6xl lg:text-7xl">
                  <span aria-hidden="true">“</span>
                  {review.quote}
                  <span aria-hidden="true">”</span>
                </blockquote>
                <figcaption className="font-body mt-10 text-sm uppercase tracking-[0.3em] text-mutedInk">
                  <span className="text-ink">{review.name}</span>
                  <span className="mx-3" aria-hidden="true">
                    —
                  </span>
                  <span>{review.role}</span>
                </figcaption>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .swiper-pagination-bullet {
          background: var(--color-ink);
          opacity: 0.2;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: var(--color-primary-accent);
          opacity: 1;
          transform: scale(1.3);
        }
      `}</style>
    </section>
  );
}
