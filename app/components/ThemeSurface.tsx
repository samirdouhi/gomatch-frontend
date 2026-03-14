"use client";

import React from "react";

export function ThemeSurface({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#020202] text-zinc-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* BACKGROUND ultra léger (0 animation, 0 blur, 0 images externes) */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          // Isoler le coût de rendu du background (utile sur certains navigateurs)
          contain: "paint", // https://developer.mozilla.org/en-US/docs/Web/CSS/contain

          // 1) Deux glows en radial-gradient (équivalent visuel "blur", mais sans filter blur)
          // 2) Une vignette
          backgroundImage: `
            radial-gradient(900px 700px at 15% 10%, rgba(245,158,11,0.12), transparent 60%),
            radial-gradient(900px 700px at 90% 85%, rgba(185,28,28,0.10), transparent 60%),
            radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.55) 100%)
          `,
        }}
      >
        {/* Grille légère (pas de maskImage) */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(245,158,11,0.55) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,158,11,0.55) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex min-h-screen flex-col">{children}</div>
    </div>
  );
}