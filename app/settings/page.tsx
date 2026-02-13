"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";

type ThemeValue = "light" | "dark" | "system";

function ThemeOption({
  value,
  label,
  icon,
  active,
  onSelect,
}: {
  value: ThemeValue;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onSelect: (v: ThemeValue) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={[
        "flex items-center gap-3 w-full rounded-xl border p-4 transition text-left",
        active ? "border-foreground bg-muted" : "border-border hover:bg-muted/50",
      ].join(" ")}
    >
      <span className="shrink-0">{icon}</span>
      <span className="font-semibold">{label}</span>
    </button>
  );
}

export default function SettingsPage() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // current est utile si tu veux afficher "thème effectif"
  const current = (theme === "system" ? resolvedTheme : theme) as "light" | "dark";

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black mb-8">Settings</h1>

        <div className="mb-12">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-xl font-bold">Appearance</h2>
            <p className="text-sm opacity-70">
              Current: <span className="font-semibold">{current}</span>
            </p>
          </div>

          <div className="space-y-4">
            {/* ✅ IMPORTANT: composant en MAJUSCULE */}
            <ThemeOption
              value="light"
              label="Light Mode"
              icon={<Sun className="h-5 w-5" />}
              active={theme === "light"}
              onSelect={(v) => setTheme(v)}
            />

            <ThemeOption
              value="dark"
              label="Dark Mode"
              icon={<Moon className="h-5 w-5" />}
              active={theme === "dark"}
              onSelect={(v) => setTheme(v)}
            />

            <ThemeOption
              value="system"
              label="System Default"
              icon={<Monitor className="h-5 w-5" />}
              active={theme === "system"}
              onSelect={(v) => setTheme(v)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

