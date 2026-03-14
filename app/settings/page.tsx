"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

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
      className={`
        relative flex items-center justify-between w-full rounded-2xl border p-5 transition-all duration-300
        ${active 
          ? "border-amber-500 bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.15)]" 
          : "border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20"}
      `}
    >
      <div className="flex items-center gap-4">
        <div className={`
          flex h-12 w-12 items-center justify-center rounded-xl transition-colors
          ${active ? "bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]" : "bg-white/5 text-zinc-400"}
        `}>
          {icon}
        </div>
        <div>
          <span className={`block font-bold tracking-tight ${active ? "text-white" : "text-zinc-400"}`}>
            {label}
          </span>
          <span className="text-[10px] uppercase tracking-widest opacity-50 font-medium">
            Interface 2030
          </span>
        </div>
      </div>

      {active && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-amber-500"
        >
          <CheckCircle2 className="h-6 w-6" />
        </motion.div>
      )}
    </button>
  );
}

export default function SettingsPage() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const current = (theme === "system" ? resolvedTheme : theme) as "light" | "dark";

  return (
    <div className="min-h-full px-6 py-12 lg:py-20">
      <div className="max-w-2xl mx-auto">
        <header className="mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-amber-500 mb-2"
          >
            <div className="h-1 w-8 bg-amber-500 rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Configuration</span>
          </motion.div>
          <h1 className="text-4xl font-black text-white tracking-tighter sm:text-5xl">
            Paramètres <span className="text-amber-500 italic">Système</span>
          </h1>
        </header>

        <section className="space-y-8">
          <div className="flex items-end justify-between border-b border-white/5 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white">Apparence</h2>
              <p className="text-sm text-zinc-500">Personnalisez votre expérience visuelle.</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest block">Actuel</span>
              <span className="text-sm font-black text-amber-500 uppercase italic">{current}</span>
            </div>
          </div>

          <motion.div 
            className="grid gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ThemeOption
              value="light"
              label="Mode Lumineux"
              icon={<Sun className="h-6 w-6" />}
              active={theme === "light"}
              onSelect={(v) => setTheme(v)}
            />

            <ThemeOption
              value="dark"
              label="Mode Sombre"
              icon={<Moon className="h-6 w-6" />}
              active={theme === "dark"}
              onSelect={(v) => setTheme(v)}
            />

            <ThemeOption
              value="system"
              label="Système"
              icon={<Monitor className="h-6 w-6" />}
              active={theme === "system"}
              onSelect={(v) => setTheme(v)}
            />
          </motion.div>
        </section>

        {/* Note de bas de page style futuriste */}
        <footer className="mt-16 pt-8 border-t border-white/5 opacity-30">
          <p className="text-[10px] font-medium tracking-[0.2em] text-center text-zinc-400">
            GOMATCH ENGINE V.2.0.30 — RABAT / CASABLANCA
          </p>
        </footer>
      </div>
    </div>
  );
}
