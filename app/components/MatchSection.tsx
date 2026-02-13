"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  type Variants,
} from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  Ticket,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Match = {
  id: string;
  title: string;
  dateLabel: string;
  isoDate: string;
  time: string;
  venue: string;
  tag: string;
};

function daysUntilFromNow(targetISO: string, nowMs: number) {
  const targetMs = new Date(targetISO).getTime();
  const diffMs = targetMs - nowMs;
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export function MatchSection() {
  const matches: Match[] = useMemo(
    () => [
      {
        id: "rabat-01",
        title: "Maroc vs TBD",
        dateLabel: "12 juin 2030",
        isoDate: "2030-06-12T20:00:00+01:00",
        time: "20:00",
        venue: "Stade de Rabat",
        tag: "Ouverture",
      },
      {
        id: "rabat-02",
        title: "TBD vs TBD",
        dateLabel: "16 juin 2030",
        isoDate: "2030-06-16T18:00:00+01:00",
        time: "18:00",
        venue: "Stade de Rabat",
        tag: "Groupes",
      },
      {
        id: "rabat-03",
        title: "TBD vs TBD",
        dateLabel: "20 juin 2030",
        isoDate: "2030-06-20T21:00:00+01:00",
        time: "21:00",
        venue: "Stade de Rabat",
        tag: "Groupes",
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const current = matches[index];

  const [nowMs, setNowMs] = useState<number>(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNowMs(Date.now()), 60_000);
    return () => clearInterval(t);
  }, []);

  const jMinus = useMemo(
    () => daysUntilFromNow(current.isoDate, nowMs),
    [current.isoDate, nowMs]
  );

  const jText =
    jMinus > 0 ? `J-${jMinus}` : jMinus === 0 ? "Aujourd’hui" : "Terminé";

  // Parallax
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 1200], [0, 120]);
  const bgScale = useTransform(scrollY, [0, 1200], [1.05, 1.12]);

  const prev = () => setIndex((i) => (i - 1 + matches.length) % matches.length);
  const next = () => setIndex((i) => (i + 1) % matches.length);

  // ✅ Scroll reveal (sans any)
  const revealRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(revealRef, { amount: 0.25, once: true });

  const wrap: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.08 },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.65, ease: "easeOut" },
    },
  };

  const fadeRight: Variants = {
    hidden: { opacity: 0, x: 22, filter: "blur(8px)" },
    show: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.65, ease: "easeOut" },
    },
  };

  return (
    <section
      id="matches"
      className="relative min-h-[100svh] overflow-hidden bg-black"
    >
      {/* Parallax background */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          y: bgY,
          scale: bgScale,
          backgroundImage: "url('/MatchSectionPhoto.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          willChange: "transform",
        }}
      />

      {/* Cinematic overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/85" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_55%,rgba(0,0,0,0.92)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-70 blur-2xl bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0)_40%,rgba(0,0,0,0.75)_90%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:54px_54px]" />

      <div className="relative z-10 container mx-auto px-4 py-16 sm:py-20">
        {/* ✅ Ref typé sans any */}
        <div ref={revealRef}>
          <motion.div
            variants={wrap}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12"
          >
            {/* LEFT */}
            <motion.div variants={fadeUp} className="max-w-2xl">
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm text-white"
              >
                <Ticket className="h-4 w-4 text-red-500" />
                Rabat • Coupe du Monde 2030
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
              >
                Matchs à <span className="text-red-500">Rabat</span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-xl text-lg text-white/80"
              >
                Suivez les matchs à Rabat, puis découvrez quoi faire avant /
                après le match autour du stade : cafés, restaurants, artisans et
                expériences locales.
              </motion.p>

              {/* Countdown pill */}
              <motion.div
                variants={fadeUp}
                className="mt-7 inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-black/45 px-4 py-3 backdrop-blur-md"
              >
                <div className="text-xs text-white/65">Prochain match</div>
                <div className="h-4 w-px bg-white/15" />
                <div className="text-sm font-semibold text-white">{jText}</div>
                <div className="h-4 w-px bg-white/15" />
                <div className="text-sm text-white/80">{current.dateLabel}</div>
                <div className="text-sm text-white/60">•</div>
                <div className="text-sm text-white/80">{current.time}</div>
              </motion.div>

              {/* Actions */}
              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <Button
                  className="h-11 w-full rounded-2xl bg-red-600 px-6 text-white hover:bg-red-700 sm:w-auto"
                  onClick={() =>
                    document
                      .getElementById("comment-ca-marche")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                >
                  Planifier ma journée <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  className="h-11 w-full rounded-2xl border-white/30 bg-transparent px-6 text-white hover:bg-white/10 sm:w-auto"
                  onClick={() =>
                    document
                      .getElementById("comment-ca-marche")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                >
                  Comment ça marche ?
                </Button>
              </motion.div>

              <motion.p variants={fadeUp} className="mt-4 text-xs text-white/55">
                *Les équipes et dates exactes seront mises à jour dès
                publication du calendrier officiel.
              </motion.p>
            </motion.div>

            {/* RIGHT */}
            <motion.div variants={fadeRight} className="w-full">
              <motion.div
                variants={fadeRight}
                className="rounded-3xl border border-white/15 bg-black/45 p-5 backdrop-blur-md sm:p-6 shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-white">
                      Calendrier Rabat
                    </div>
                    <div className="text-xs text-white/60">
                      Faites défiler les matchs
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={prev}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-white hover:bg-white/10"
                      aria-label="Match précédent"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={next}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-white hover:bg-white/10"
                      aria-label="Match suivant"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/35">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.id}
                      initial={{ opacity: 0, x: 24, filter: "blur(10px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, x: -24, filter: "blur(10px)" }}
                      transition={{ duration: 0.38, ease: "easeOut" }}
                      className="p-5 sm:p-6"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
                          <Ticket className="h-4 w-4 text-emerald-400" />
                          {current.tag}
                        </div>
                        <div className="text-xs font-semibold text-white/80">
                          {jText}
                        </div>
                      </div>

                      <div className="mt-4 text-xl font-semibold text-white">
                        {current.title}
                      </div>

                      <div className="mt-4 space-y-2 text-sm text-white/75">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-red-500" />
                          {current.dateLabel}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-emerald-400" />
                          {current.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-emerald-400" />
                          {current.venue}
                        </div>
                      </div>

                      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                        <Button
                          className="h-10 w-full rounded-2xl bg-white/10 text-white hover:bg-white/15 sm:w-auto"
                          onClick={() =>
                            document
                              .getElementById("comment-ca-marche")
                              ?.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                              })
                          }
                        >
                          Avant / Après match
                        </Button>

                        <Button
                          variant="outline"
                          className="h-10 w-full rounded-2xl border-white/20 bg-transparent text-white hover:bg-white/10 sm:w-auto"
                          onClick={() =>
                            document
                              .getElementById("devenir-partenaire")
                              ?.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                              })
                          }
                        >
                          Voir commerces à Rabat
                        </Button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-4 flex items-center justify-center gap-2">
                  {matches.map((m, i) => (
                    <button
                      key={m.id}
                      onClick={() => setIndex(i)}
                      className={`h-2.5 w-2.5 rounded-full border transition ${
                        i === index
                          ? "bg-red-500 border-red-500"
                          : "bg-white/10 border-white/20 hover:bg-white/20"
                      }`}
                      aria-label={`Aller au match ${i + 1}`}
                    />
                  ))}
                </div>
              </motion.div>

              <motion.div className="mt-4 text-center text-xs text-white/55">
                Rabat only • Slider prêt à être connecté à ton backend plus tard
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}




