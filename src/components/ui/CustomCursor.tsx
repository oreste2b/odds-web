"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor(): React.JSX.Element | null {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const node = cursorRef.current;
    if (!node) return;

    gsap.set(node, { xPercent: -50, yPercent: -50, opacity: 0 });

    const xTo = gsap.quickTo(node, "x", { duration: prefersReducedMotion ? 0 : 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(node, "y", { duration: prefersReducedMotion ? 0 : 0.6, ease: "power3.out" });

    let visible = false;

    const handleMove = (event: PointerEvent): void => {
      if (!visible) {
        gsap.to(node, { opacity: 1, duration: 0.3, overwrite: true });
        visible = true;
      }
      xTo(event.clientX);
      yTo(event.clientY);
    };

    const handleLeave = (): void => {
      gsap.to(node, { opacity: 0, duration: 0.2, overwrite: true });
      visible = false;
    };

    const handleDown = (): void => {
      gsap.to(node, { scale: 2.2, duration: 0.25, ease: "power3.out", overwrite: true });
    };

    const handleUp = (): void => {
      gsap.to(node, { scale: 1, duration: 0.4, ease: "power3.out", overwrite: true });
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerleave", handleLeave);
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="custom-cursor pointer-events-none fixed left-0 top-0 z-[9999] h-1 w-1 rounded-full"
      style={{ backgroundColor: "var(--color-primary-accent)" }}
    />
  );
}
