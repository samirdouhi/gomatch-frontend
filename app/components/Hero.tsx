"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Link from "next/link";
import { MapPin, Compass } from "lucide-react";

/* ===============================
   Content animations
================================ */
const wrap: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

/* ===============================
   Soccer ball SVG b
================================ */
function SoccerBall(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" {...props}>
      <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="6" opacity="0.9" />
      <circle cx="100" cy="100" r="86" stroke="currentColor" strokeWidth="2" opacity="0.35" />
      <path d="M100 55 L125 75 L115 105 L85 105 L75 75 Z" fill="currentColor" opacity="0.55" />
      <path
        d="M100 55 L100 25 M75 75 L45 60 M125 75 L155 60 M85 105 L70 135 M115 105 L130 135 M100 125 L100 175"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.35"
        strokeLinecap="round"
      />
      <path d="M45 60 L55 95 L70 85 Z" fill="currentColor" opacity="0.22" />
      <path d="M155 60 L145 95 L130 85 Z" fill="currentColor" opacity="0.22" />
      <path d="M70 135 L95 150 L85 175 L60 160 Z" fill="currentColor" opacity="0.22" />
      <path d="M130 135 L105 150 L115 175 L140 160 Z" fill="currentColor" opacity="0.22" />
    </svg>
  );
}

/* ===============================
   Stadium silhouette SVG
================================ */
function StadiumSilhouette(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 1200 320" fill="none" {...props}>
      {/* base haze */}
      <path
        d="M0 275 C 220 220, 440 300, 600 262 C 760 224, 980 304, 1200 262 L1200 320 L0 320 Z"
        fill="currentColor"
        opacity="0.10"
      />

      {/* stadium mass */}
      <path
        d="M60 265 C 210 165, 390 125, 600 125 C 810 125, 990 165, 1140 265
           L1140 310 L60 310 Z"
        fill="currentColor"
        opacity="0.32"
      />

      {/* inner opening */}
      <path
        d="M175 280 C 285 205, 440 180, 600 180 C 760 180, 915 205, 1025 280
           L1025 310 L175 310 Z"
        fill="currentColor"
        opacity="0.18"
      />

      {/* roof arcs */}
      <path
        d="M120 220 C 330 70, 520 40, 600 40 C 680 40, 870 70, 1080 220"
        stroke="currentColor"
        strokeWidth="4"
        opacity="0.24"
      />
      <path
        d="M165 228 C 350 100, 540 74, 600 74 C 660 74, 850 100, 1035 228"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.18"
      />

      {/* stands lines */}
      {Array.from({ length: 12 }).map((_, i) => {
        const y = 255 - i * 7;
        const op = 0.13 - i * 0.008;
        return (
          <path
            key={i}
            d={`M110 ${y} C 260 ${y - 52}, 445 ${y - 82}, 600 ${y - 82} C 755 ${
              y - 82
            }, 940 ${y - 52}, 1090 ${y}`}
            stroke="currentColor"
            strokeWidth="2"
            opacity={Math.max(0.03, op)}
          />
        );
      })}

      {/* pillars */}
      {Array.from({ length: 9 }).map((_, i) => {
        const x = 175 + i * 110;
        return (
          <path
            key={`p${i}`}
            d={`M${x} 310 L${x} 245`}
            stroke="currentColor"
            strokeWidth="3"
            opacity="0.18"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

/* ===============================
   Pitch lines SVG (World Cup vibe)
================================ */
function PitchLines(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 1200 360" fill="none" {...props}>
      <path d="M70 300 C 260 210, 430 170, 600 170 C 770 170, 940 210, 1130 300" stroke="currentColor" strokeWidth="3" opacity="0.26" />
      <path d="M40 330 C 240 230, 420 190, 600 190 C 780 190, 960 230, 1160 330" stroke="currentColor" strokeWidth="2" opacity="0.18" />
      <path d="M600 170 L600 352" stroke="currentColor" strokeWidth="2" opacity="0.16" />
      <circle cx="600" cy="262" r="42" stroke="currentColor" strokeWidth="2" opacity="0.16" />
      <path d="M240 322 C 320 250, 420 225, 505 225" stroke="currentColor" strokeWidth="2" opacity="0.14" />
      <path d="M960 322 C 880 250, 780 225, 695 225" stroke="currentColor" strokeWidth="2" opacity="0.14" />
    </svg>
  );
}

/* ===============================
   Small sparkles overlay (premium)
================================ */
function SparklesLayer() {
  return (
    <motion.div
      aria-hidden
      className="absolute inset-0"
      style={{
        backgroundImage:
          "radial-gradient(circle at 12% 18%, rgba(255,255,255,0.75) 0.8px, transparent 2px)," +
          "radial-gradient(circle at 78% 22%, rgba(255,255,255,0.55) 0.8px, transparent 2px)," +
          "radial-gradient(circle at 52% 12%, rgba(255,255,255,0.45) 0.8px, transparent 2px)," +
          "radial-gradient(circle at 20% 60%, rgba(255,255,255,0.35) 0.8px, transparent 2px)," +
          "radial-gradient(circle at 88% 66%, rgba(255,255,255,0.35) 0.8px, transparent 2px)",
        opacity: 0.22,
        mixBlendMode: "overlay",
      }}
      animate={{ opacity: [0.12, 0.26, 0.14, 0.24, 0.12] }}
      transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function Hero() {
  return (
    <section className="relative isolate min-h-screen w-full overflow-hidden bg-background text-foreground">
      {/* =========================
         WORLD CUP x MOROCCO BACKGROUND
      ========================== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Base */}
        <div className="absolute inset-0 bg-background" />

        {/* Stronger LIGHT mode + cinematic DARK mode */}
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              // Light mode needs more contrast:
              "radial-gradient(1100px 720px at 10% 18%, rgba(193,39,45,0.45) 0%, transparent 62%)," +
              "radial-gradient(980px 660px at 92% 28%, rgba(197,160,89,0.42) 0%, transparent 60%)," +
              "radial-gradient(980px 700px at 60% 112%, rgba(0,98,51,0.26) 0%, transparent 60%)," +
              "linear-gradient(120deg, rgba(193,39,45,0.16), rgba(197,160,89,0.12), rgba(0,98,51,0.08))",
            backgroundSize: "160% 160%",
          }}
          animate={{ backgroundPosition: ["0% 0%", "100% 30%", "40% 100%", "0% 0%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />

        {/* Premium sparkles */}
        <SparklesLayer />

        {/* Smoke/haze (works in light + dark) */}
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 420px at 30% 55%, rgba(255,255,255,0.22), transparent 70%)," +
              "radial-gradient(820px 380px at 70% 60%, rgba(255,255,255,0.18), transparent 70%)",
            mixBlendMode: "soft-light",
            opacity: 0.55,
          }}
          animate={{ x: [0, 34, -26, 0], y: [0, -12, 18, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Spotlights (visible in light too) */}
        <div className="absolute inset-0">
          <motion.div
            aria-hidden
            className="absolute -top-44 left-[10%] h-[1050px] w-[600px] blur-2xl"
            style={{
              background:
                "conic-gradient(from 220deg at 50% 0%, transparent 0deg, rgba(255,255,255,0.26) 18deg, transparent 44deg)",
              transformOrigin: "50% 0%",
              opacity: 0.95,
              mixBlendMode: "screen",
            }}
            animate={{ rotate: [-10, 18, -8, 14, -10] }}
            transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            aria-hidden
            className="absolute -top-48 right-[10%] h-[1050px] w-[640px] blur-2xl"
            style={{
              background:
                "conic-gradient(from 320deg at 50% 0%, transparent 0deg, rgba(255,255,255,0.22) 16deg, transparent 42deg)",
              transformOrigin: "50% 0%",
              opacity: 0.95,
              mixBlendMode: "screen",
            }}
            animate={{ rotate: [12, -16, 10, -14, 12] }}
            transition={{ duration: 7.8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Center glow pulse */}
          <motion.div
            aria-hidden
            className="absolute -top-48 left-1/2 h-[560px] w-[1020px] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle at 50% 55%, rgba(255,255,255,0.40), rgba(255,255,255,0.10), transparent 74%)",
              mixBlendMode: "screen",
            }}
            animate={{ opacity: [0.18, 0.55, 0.18], scale: [1, 1.06, 1] }}
            transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Stadium silhouette bottom */}
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-1/2 w-[1500px] max-w-none -translate-x-1/2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* darker in light mode for visibility; softer in dark */}
          <StadiumSilhouette className="h-[320px] w-[1500px] text-black/60 dark:text-white/55" />
        </motion.div>

        {/* Pitch lines glow (World Cup feel) */}
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-1/2 w-[1400px] max-w-none -translate-x-1/2"
          style={{ opacity: 0.8 }}
          animate={{ opacity: [0.55, 0.9, 0.6] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <PitchLines className="h-[360px] w-[1400px] text-morocco-gold/70 dark:text-white/25" />
        </motion.div>

        {/* Soft particles (clean) */}
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(193,39,45,0.20) 1px, transparent 2px)," +
              "radial-gradient(circle, rgba(197,160,89,0.20) 1px, transparent 2px)," +
              "radial-gradient(circle, rgba(0,98,51,0.14) 1px, transparent 2px)",
            backgroundSize: "220px 220px, 280px 280px, 360px 360px",
            backgroundPosition: "0 0, 60px 90px, 110px 30px",
            opacity: 0.32,
          }}
          animate={{
            backgroundPosition: [
              "0px 0px, 60px 90px, 110px 30px",
              "220px 520px, 420px 240px, 640px 560px",
            ],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />

        {/* ⚽ Balls (keep) */}
        <motion.div
          aria-hidden
          className="absolute left-[5%] top-[18%] h-[190px] w-[190px] sm:h-[240px] sm:w-[240px]"
          animate={{ y: [0, 22, -10, 0], x: [0, 12, -6, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 7.5, repeat: Infinity, ease: "linear" }}>
            <SoccerBall className="h-full w-full text-morocco-red/80 drop-shadow-[0_20px_45px_rgba(193,39,45,0.28)]" />
          </motion.div>
        </motion.div>

        <motion.div
          aria-hidden
          className="absolute right-[6%] bottom-[16%] h-[140px] w-[140px] sm:h-[180px] sm:w-[180px] opacity-75"
          animate={{ y: [0, -18, 10, 0], x: [0, -10, 8, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 9.5, repeat: Infinity, ease: "linear" }}>
            <SoccerBall className="h-full w-full text-morocco-gold/80 drop-shadow-[0_18px_40px_rgba(197,160,89,0.25)]" />
          </motion.div>
        </motion.div>

        {/* Readability overlay (light + dark) */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/8 via-background/6 to-background/28 dark:from-background/20 dark:via-background/10 dark:to-background/40" />
      </div>

      {/* =========================
         CONTENT
      ========================== */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6">
        <motion.div variants={wrap} initial="hidden" animate="show" className="w-full text-center">
          <motion.h1
            variants={fadeUp}
            className="mx-auto max-w-4xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Connect with <span className="text-morocco-red">Authentic</span>
            <br />
            <span className="text-morocco-gold italic">Moroccan Culture</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-muted-foreground sm:text-lg">
            Explore cities, events, and experiences — quickly, beautifully, and in one place.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/rabat"
                className="
                  inline-flex h-11 items-center justify-center gap-2
                  rounded-md px-7 text-sm font-semibold
                  bg-morocco-gold text-black
                  transition-all shadow-lg
                  hover:bg-morocco-gold/90
                  shadow-morocco-gold/30 hover:shadow-xl hover:shadow-morocco-gold/40
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50
                  ring-offset-background ring-offset-2
                "
              >
                <MapPin className="h-5 w-5" />
                Explore Rabat
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/culture"
                className="
                  inline-flex h-11 items-center justify-center gap-2
                  rounded-md px-7 text-sm font-semibold
                  bg-morocco-red text-white
                  transition-all shadow-lg
                  hover:bg-morocco-red/90
                  shadow-morocco-red/30 hover:shadow-xl hover:shadow-morocco-red/40
                  dark:bg-[#e23b41] dark:hover:bg-[#ff4b52]
                  dark:shadow-[#e23b41]/30 dark:hover:shadow-[#ff4b52]/40
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50
                  ring-offset-background ring-offset-2
                "
              >
                <Compass className="h-5 w-5" />
                Things to Do
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 text-xs text-muted-foreground">
            Use the sidebar to access Matches, Culture, Map and Tickets.
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}






















