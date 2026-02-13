"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  HelpCircle,
  MapPin,
  Navigation,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Ticket,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Ticket,
    title: "Choisissez votre match / ville",
    desc: "Sélectionnez la ville, le stade ou la fan zone. Vous pouvez aussi activer votre position.",
  },
  {
    icon: Sparkles,
    title: "Recevez des idées adaptées",
    desc: "Restaurants, cafés, artisans et expériences culturelles selon vos préférences et votre temps.",
  },
  {
    icon: MapPin,
    title: "Explorez sur la carte",
    desc: "Visualisez les lieux autour de vous, comparez la distance et repérez les meilleures options.",
  },
  {
    icon: Navigation,
    title: "Suivez l’itinéraire simple",
    desc: "Obtenez un trajet rapide pour arriver à temps : avant match, après match, ou le lendemain.",
  },
];

const features = [
  { icon: Store, title: "Adresses locales", desc: "Des lieux authentiques pour manger, acheter et découvrir." },
  { icon: ShieldCheck, title: "Commerces vérifiés", desc: "Sélectionnés pour la qualité, l’accueil et la fiabilité." },
  { icon: Clock, title: "Gagnez du temps", desc: "Suggestions rapides selon votre planning du jour." },
  { icon: Star, title: "Meilleures expériences", desc: "Enregistrez vos favoris et retrouvez-les facilement." },
];

const faqs = [
  {
    q: "Est-ce que ça marche sans compte ?",
    a: "Oui. Vous pouvez explorer et consulter. Le compte sert surtout à enregistrer vos favoris et préférences.",
  },
  {
    q: "Comment sont choisis les commerces ?",
    a: "Nous mettons en avant des commerces locaux avec un contrôle de base et un suivi des retours utilisateurs.",
  },
  {
    q: "Je suis pressé(e), je veux une idée rapide.",
    a: "Choisissez un temps (30 min / 1h / soirée) : on propose des options proches et faciles d’accès.",
  },
  {
    q: "Puis-je filtrer par type (café, artisan, culture) ?",
    a: "Oui. Vous pouvez filtrer par catégories et affiner avec vos préférences.",
  },
];

export function CommentCaMarcheSection() {
  return (
    <section
      id="comment-ca-marche"
      className="relative overflow-hidden bg-black py-14 sm:py-20"
    >
      {/* Background premium */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-44 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-red-600/12 blur-3xl" />
        <div className="absolute -bottom-44 right-[-10%] h-[560px] w-[560px] rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.45),rgba(0,0,0,0.93))]" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:44px_44px]" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80">
            <HelpCircle className="h-4 w-4 text-red-500" />
            Comment ça marche ? • Simple • Rapide • Local
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Comment ça marche ?
          </h2>

          <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">
            Trouvez des adresses proches, gagnez du temps et vivez une expérience
            locale authentique — avant et après le match.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button className="h-11 w-full rounded-2xl bg-red-600 px-6 text-white hover:bg-red-700 sm:w-auto">
              Commencer maintenant <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-11 w-full rounded-2xl border-white/15 bg-transparent px-6 text-white hover:bg-white/5 sm:w-auto"
            >
              <Link href="/businesses">Voir les lieux</Link>
            </Button>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="mx-auto mt-12 max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.35)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black/40 ring-1 ring-white/10">
                      <Icon className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="text-sm font-semibold text-white/90">
                      Étape {idx + 1}
                    </div>
                  </div>

                  <div className="mt-4 text-base font-semibold text-white">
                    {s.title}
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-white/65">
                    {s.desc}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Features */}
        <div className="mx-auto mt-12 max-w-6xl">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="text-xl font-bold text-white sm:text-2xl">
                  Ce que vous gagnez
                </h3>
                <p className="mt-1 text-sm text-white/65">
                  Pensé pour les supporters et les visiteurs pendant Maroc 2030.
                </p>
              </div>

              <Button
                asChild
                variant="outline"
                className="h-10 w-full rounded-2xl border-white/15 bg-transparent px-4 text-white hover:bg-white/5 sm:w-auto"
              >
                <Link href="/businesses">Explorer les lieux</Link>
              </Button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((f, idx) => {
                const Icon = f.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/10 bg-black/25 p-5"
                  >
                    <Icon className="h-5 w-5 text-emerald-400" />
                    <div className="mt-3 font-semibold text-white">
                      {f.title}
                    </div>
                    <div className="mt-1 text-sm text-white/65">{f.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-white sm:text-2xl">FAQ</h3>
            <div className="mt-5 space-y-3">
              {faqs.map((item, idx) => (
                <details
                  key={idx}
                  className="group rounded-2xl border border-white/10 bg-black/25 p-4"
                >
                  <summary className="cursor-pointer list-none font-semibold text-white/90">
                    {item.q}
                    <span className="float-right text-white/40 group-open:text-white/70">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mx-auto mt-12 max-w-6xl">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-red-600/20 to-emerald-500/10 p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h4 className="text-lg font-bold text-white sm:text-xl">
                  Prêt à découvrir autour de vous ?
                </h4>
                <p className="mt-1 text-sm text-white/75">
                  Lancez la carte et trouvez une adresse en moins d’une minute.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button className="h-11 rounded-2xl bg-red-600 px-6 text-white hover:bg-red-700">
                  Explorer maintenant <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-11 rounded-2xl border-white/15 bg-transparent px-6 text-white hover:bg-white/5"
                >
                  <Link href="/assistant">Suggestions personnalisées</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

