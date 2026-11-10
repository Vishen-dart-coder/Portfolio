"use client";

import { GlassIconReveal } from "@/components/ui/liquid-glass-logo-reveal";
import { useEffect, useState } from "react";

// Vishen's VS monogram: a rounded V and S drawn with one stroke weight, touching to read as one mark.
const VS_MARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112 100" fill="none" stroke="#000" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14 L32 86 L54 14"/><path d="M102 24 C97 14 84 12 76 12 C64 12 58 20 58 30 C58 42 70 46 80 49 C92 52 102 56 102 69 C102 80 94 88 80 88 C70 88 62 84 58 76"/></svg>`;

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
        logoColor={dark ? "#60a5fa" : "#1d4ed8"}
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
