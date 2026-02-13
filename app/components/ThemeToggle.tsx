"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  // Evite le mismatch hydration Next.js
  if (!mounted) {
    return (
      <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-2 py-1">
        <button
          type="button"
          className="h-9 w-9 rounded-xl flex items-center justify-center transition text-foreground/80"
          aria-label="Toggle theme"
          title="Toggle theme"
          disabled
        >
          <Sun className="h-4 w-4 opacity-60" />
        </button>
      </div>
    );
  }

  const current = theme === "system" ? resolvedTheme : theme;
  const isDark = current === "dark";

  return (
    <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-2 py-1">
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={[
          "h-9 w-9 rounded-xl flex items-center justify-center transition",
          // Style actif (comme ton ancien style)
          isDark ? "bg-foreground text-background" : "text-foreground/80 hover:bg-muted",
        ].join(" ")}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Light mode" : "Dark mode"}
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
    </div>
  );
}



