"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import createGlobe from "cobe";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

type Marker = { location: [number, number]; size: number };

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(!!mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

export function GlobeSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const reducedMotion = usePrefersReducedMotion();

  const markers: Marker[] = useMemo(
    () => [
      { location: [34.0209, -6.8416], size: 0.1 }, // Rabat
      { location: [33.5731, -7.5898], size: 0.12 }, // Casablanca
      { location: [31.6295, -7.9811], size: 0.1 }, // Marrakech
      { location: [35.7595, -5.834], size: 0.08 }, // Tanger
      { location: [30.4278, -9.5981], size: 0.08 }, // Agadir
      { location: [34.0333, -5.0], size: 0.08 }, // Fès (approx)
    ],
    []
  );

  useEffect(() => {
    if (!canvasRef.current || !wrapRef.current) return;

    const canvas = canvasRef.current;
    const wrap = wrapRef.current;

    const DPR = Math.min(2, window.devicePixelRatio || 1);

    let globe: any | null = null;
    let phi = 0;
    let theta = 0.25;
    let pointerX = 0;
    let pointerY = 0;

    const onPointerMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      pointerX = (x - 0.5) * 2; // -1..1
      pointerY = (y - 0.5) * 2; // -1..1
    };

    wrap.addEventListener("pointermove", onPointerMove, { passive: true });

    const makeGlobe = (size: number) => {
      // IMPORTANT: set canvas pixel size BEFORE createGlobe
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      canvas.width = Math.floor(size * DPR);
      canvas.height = Math.floor(size * DPR);

      // destroy old globe safely
      globe?.destroy?.();
      globe = null;

      globe = createGlobe(canvas, {
        devicePixelRatio: DPR,
        width: canvas.width,
        height: canvas.height,
        phi,
        theta,
        dark: 1,
        diffuse: 1.25,
        mapSamples: 16000,
        mapBrightness: 6.2,
        baseColor: [0.14, 0.14, 0.15],
        markerColor: [0.82, 0.08, 0.1],
        glowColor: [1, 1, 1],
        markers,
        onRender: (state) => {
          // keep these updated
          state.width = canvas.width;
          state.height = canvas.height;

          if (!reducedMotion) {
            phi += 0.0032;
            const targetTheta = 0.25 + pointerY * 0.08;
            theta += (targetTheta - theta) * 0.08;
            state.phi = phi + pointerX * 0.06;
            state.theta = theta;
          } else {
            state.phi = phi;
            state.theta = 0.25;
          }
        },
      });
    };

    // ResizeObserver → recreate globe on real size change (fix black bug)
    let raf = 0;
    let lastSize = 0;

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = wrap.getBoundingClientRect();

        // take available width
        const next = Math.max(260, Math.min(720, Math.floor(rect.width)));

        // recreate only if size changed enough
        if (Math.abs(next - lastSize) >= 2) {
          lastSize = next;
          makeGlobe(next);
        }
      });
    });

    ro.observe(wrap);

    // initial
    const initRect = wrap.getBoundingClientRect();
    lastSize = Math.max(260, Math.min(720, Math.floor(initRect.width)));
    makeGlobe(lastSize);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener("pointermove", onPointerMove);
      globe?.destroy?.();
      globe = null;
    };
  }, [markers, reducedMotion]);

  return (
    // ✅ min-h full viewport + background applied here = no white bottom
    <section className="relative min-h-[100svh] overflow-hidden bg-black py-10 sm:py-14">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-red-600/15 blur-3xl" />
        <div className="absolute -bottom-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.35),rgba(0,0,0,0.92))]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:44px_44px]" />
      </div>

      {/* ✅ Make container stretch full height */}
      <div className="container relative mx-auto flex min-h-[100svh] flex-col px-4 lg:min-h-0 lg:flex-none">
        <div className="grid flex-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="flex h-full max-w-xl flex-col justify-center"
          >
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80">
              <Sparkles className="h-4 w-4 text-red-500" />
              Maroc 2030 • Votre guide local pendant les matchs
            </div>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Vivez le Maroc{" "}
              <span className="text-red-500">autour des stades</span>, pas
              seulement le match.
            </h2>

            <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
              Découvrez des adresses authentiques près de vous : restaurants,
              cafés, artisans et expériences culturelles. Une seule plateforme
              pour trouver où aller, quoi faire et comment s’y rendre.
            </p>

            <div className="mt-7 grid gap-3">
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <MapPin className="mt-0.5 h-5 w-5 text-emerald-400" />
                <div>
                  <div className="font-semibold text-white">
                    Autour de vous, en temps réel
                  </div>
                  <div className="text-sm text-white/65">
                    Cafés, restaurants et artisans à moins de 10 minutes du
                    stade ou de votre fan zone.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <Clock className="mt-0.5 h-5 w-5 text-red-500" />
                <div>
                  <div className="font-semibold text-white">
                    Idéal avant / après match
                  </div>
                  <div className="text-sm text-white/65">
                    Des idées rapides selon votre temps : 30 min, 1h, ou une
                    soirée complète.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 text-white/80" />
                <div>
                  <div className="font-semibold text-white">
                    Commerces vérifiés
                  </div>
                  <div className="text-sm text-white/65">
                    Des lieux sélectionnés pour la qualité, l’accueil et
                    l’expérience locale.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-2xl font-bold text-white">+1000</div>
                <div className="text-xs text-white/60">
                  commerces locaux partenaires
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-xs text-white/60">
                  infos accessibles partout
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-2xl font-bold text-white">2030</div>
                <div className="text-xs text-white/60">
                  expérience Coupe du Monde
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button className="h-11 w-full rounded-2xl bg-red-600 px-5 text-white hover:bg-red-700 sm:w-auto">
                Découvrir autour de moi <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            <Button
  variant="outline"
  className="h-11 w-full rounded-2xl border-white/15 bg-transparent px-5 text-white hover:bg-white/5 sm:w-auto"
  onClick={() =>
    document
      .getElementById("comment-ca-marche")
      ?.scrollIntoView({ behavior: "smooth", block: "start" })
  }
>
  Comment ça marche ?
</Button>

            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="flex h-full items-center"
          >
            <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5 shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-white">
                    Carte interactive du Maroc
                  </div>
                  <div className="text-xs text-white/60">
                    Points d’intérêt autour des stades et fan zones
                  </div>
                </div>
                <div className="hidden rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/70 sm:inline-flex">
                  Explorez les villes
                </div>
              </div>

              {/* ✅ Wrapper controls the size; globe is recreated on resize */}
              <div
                ref={wrapRef}
                className="
                  relative mt-4 mx-auto
                  w-full
                  max-w-[380px] sm:max-w-[540px] lg:max-w-[640px]
                  aspect-square
                  rounded-2xl border border-white/10 bg-black/40 p-3
                  flex items-center justify-center
                "
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
                <canvas
                  ref={canvasRef}
                  className="block select-none"
                  aria-label="Globe interactif du Maroc"
                  role="img"
                />
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  <div className="text-xs text-white/60">Suggestion</div>
                  <div className="mt-1 text-sm font-semibold text-white">
                    Restaurants & cafés
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  <div className="text-xs text-white/60">Suggestion</div>
                  <div className="mt-1 text-sm font-semibold text-white">
                    Artisans & souvenirs
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


