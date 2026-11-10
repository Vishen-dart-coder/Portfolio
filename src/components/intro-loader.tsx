"use client";

import { GlassIconReveal } from "@/components/ui/liquid-glass-logo-reveal";
import { useEffect, useState } from "react";

// Vishen's VS monogram, taken from the original portfolio favicon (background tile removed).
const VS_MARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="14 12 36 40" fill="none">
  <path d="M20 16 L32 40 L44 16" stroke="#000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M22 48 Q28 44 28 48 T34 48 Q40 44 40 48" stroke="#000" stroke-width="4" stroke-linecap="round"/>
</svg>`;

const SPEED = 1.4;
// The reveal runs 3.5s at speed 1, then the overlay fades out.
const REVEAL_MS = (3.5 / SPEED) * 1000;
const FADE_MS = 400;
const SEEN_KEY = "vs-intro-seen";

export default function IntroLoader() {
  const [state, setState] = useState<"show" | "fading" | "gone">("show");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
    if (seen) {
      setState("gone");
      return;
    }
    setDark(document.documentElement.classList.contains("dark"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fadeAt = window.setTimeout(() => setState("fading"), reduce ? 800 : REVEAL_MS);
    const goneAt = window.setTimeout(() => setState("gone"), (reduce ? 800 : REVEAL_MS) + FADE_MS);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.clearTimeout(fadeAt);
      window.clearTimeout(goneAt);
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (state === "gone") document.documentElement.style.overflow = "";
  }, [state]);

  if (state === "gone") return null;

  const background = dark ? "#121212" : "#ffffff";

  return (
    <div
      className="fixed inset-0 z-[100] transition-opacity ease-out"
      style={{
        backgroundColor: background,
        opacity: state === "fading" ? 0 : 1,
        transitionDuration: `${FADE_MS}ms`,
        pointerEvents: state === "fading" ? "none" : "auto",
      }}
      onClick={() => setState("fading")}
    >
      <GlassIconReveal
        key={dark ? "dark" : "light"}
        logo={VS_MARK}
        label="Vishen Sharma"
        look="light"
        background={background}
        logoColor={dark ? "#4ade80" : "#166534"}
        logoScale={0.6}
        finalScale={0.8}
        loop={false}
        speed={SPEED}
        tuning={{ startZoom: 2.3 }}
        className="h-full w-full"
      />
    </div>
  );
}
