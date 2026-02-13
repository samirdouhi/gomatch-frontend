"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export function FloatingAssistantButton() {
  return (
    <Link
      href="/assistant"
      aria-label="Ouvrir l’assistant"
      className="
        fixed bottom-5 right-5 z-[60]
        h-14 w-14 rounded-full
        bg-red-600
        border border-white/20
        shadow-[0_18px_60px_rgba(0,0,0,0.45)]
        flex items-center justify-center

        hover:bg-white
        hover:text-red-600
        hover:shadow-[0_18px_60px_rgba(220,38,38,0.45)]

        active:scale-95
        transition-all duration-200
      "
    >
      <Sparkles className="h-6 w-6 text-white transition-colors duration-200 group-hover:text-red-600" />

      {/* anneau subtil */}
      <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/25" />
    </Link>
  );
}

