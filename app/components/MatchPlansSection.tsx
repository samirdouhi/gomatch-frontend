"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import {
  Clock,
  Coffee,
  Utensils,
  ShoppingBag,
  Music,
  MapPin,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type PlanKey = "30" | "60" | "night";

export function MatchPlansSection() {
  const [selected, setSelected] = useState<PlanKey>("30");

  const plans = useMemo(
    () => ({
      "30": {
        title: "30 minutes",
        subtitle: "Rapide & efficace",
        icon: Coffee,
        items: [
          "Café proche du stade",
          "Snack local",
          "Souvenirs express",
        ],
        tip: "Parfait si tu es pressé avant ou après le match.",
      },
      "60": {
        title: "1 heure",
        subtitle: "Découvrir sans stress",
        icon: Utensils,
        items: [
          "Restaurant recommandé",
          "Balade culturelle courte",
          "Pause détente",
        ],
        tip: "Le bon équilibre entre match et découverte locale.",
      },
      night: {
        title: "Soirée complète",
        subtitle: "Vivre l’expérience locale",
        icon: Music,
        items: [
          "Dîner typique marocain",
          "Ambiance & fan zones",
          "Artisanat et marchés",
        ],
        tip: "L’expérience complète autour du stade.",
      },
    }),
    []
  );

  const current = plans[selected];
  const Icon = current.icon;

  return (
    <section
      id="match-plans"
      className="relative overflow-hidden py-16 sm:py-20"
    >
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
        backgroundImage: "url('/matchplans-rabat.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/85" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_55%,rgba(0,0,0,0.92)_100%)]" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1 text-sm text-white/80 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-red-500" />
            Avant & Après match • Rabat
          </div>

          <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Des plans simples autour du stade
          </h2>

          <p className="mt-4 text-base text-white/75 sm:text-lg">
            Choisis ton temps disponible et découvre quoi faire avant ou après le
            match, sans perdre de temps.
          </p>
        </motion.div>

        {/* Main card */}
        <div className="mx-auto mt-10 max-w-5xl">
          <div className="rounded-[28px] border border-white/15 bg-black/45 p-5 backdrop-blur-md shadow-[0_40px_120px_rgba(0,0,0,0.45)] sm:p-7">
            {/* Tabs */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <Clock className="h-4 w-4 text-emerald-400" />
                Ton temps disponible
              </div>

              <div className="flex w-full gap-2 sm:w-auto">
                {[
                  { key: "30", label: "30 min" },
                  { key: "60", label: "1h" },
                  { key: "night", label: "Soirée" },
                ].map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setSelected(t.key as PlanKey)}
                    className={`h-11 flex-1 rounded-2xl border px-4 text-sm transition sm:flex-none ${
                      selected === t.key
                        ? "border-red-500/40 bg-red-600/25 text-white"
                        : "border-white/15 bg-white/5 text-white/80 hover:bg-white/10"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="mt-6 grid gap-4 lg:grid-cols-2 lg:gap-6">
              <div className="rounded-3xl border border-white/10 bg-black/35 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                    <Icon className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-white">
                      {current.title}
                    </div>
                    <div className="text-sm text-white/65">
                      {current.subtitle}
                    </div>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.ul
                    key={selected}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="mt-5 space-y-2 text-sm text-white/75"
                  >
                    {current.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </motion.ul>
                </AnimatePresence>

                <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                  <div className="flex items-center gap-2 font-semibold text-white/85">
                    <MapPin className="h-4 w-4 text-emerald-400" />
                    Astuce
                  </div>
                  <div className="mt-2">{current.tip}</div>
                </div>
              </div>

              {/* Right column */}
              <div className="rounded-3xl border border-white/10 bg-black/35 p-5 flex flex-col justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">
                    Autour du stade
                  </div>
                  <p className="mt-2 text-sm text-white/70">
                    Cafés, restaurants, artisans et ambiance locale à Rabat.
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {[
                      { icon: Coffee, label: "Cafés" },
                      { icon: ShoppingBag, label: "Artisans" },
                      { icon: Utensils, label: "Restaurants" },
                      { icon: Music, label: "Ambiance" },
                    ].map((c) => (
                      <div
                        key={c.label}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4"
                      >
                        <div className="flex items-center gap-2 text-white">
                          <c.icon className="h-4 w-4 text-emerald-400" />
                          <div className="text-sm font-semibold">
                            {c.label}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SINGLE CTA */}
                <div className="mt-6 text-center">
                  <Button
                    className="h-11 rounded-2xl bg-red-600 px-10 text-white hover:bg-red-700"
                    onClick={() =>
                      document
                        .getElementById("comment-ca-marche")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" })
                    }
                  >
                    Découvrir <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center text-xs text-white/55">
            Section plans — Rabat uniquement • prête pour la connexion backend
          </div>
        </div>
      </div>
    </section>
  );
}
