"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Globe,
  MapPin,
  Megaphone,
  ShieldCheck,
  Store,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: Users,
    title: "Plus de clients",
    desc: "Touchez des supporters et touristes proches de vous pendant les matchs.",
  },
  {
    icon: MapPin,
    title: "Visible sur la carte",
    desc: "Votre commerce apparaît autour des stades et fan zones selon la proximité.",
  },
  {
    icon: Megaphone,
    title: "Mise en avant",
    desc: "Promotions, menus du jour, horaires spéciaux : vos infos toujours à jour.",
  },
  {
    icon: BarChart3,
    title: "Suivez votre impact",
    desc: "Consultez les vues et clics (statistiques simples, utiles et lisibles).",
  },
];

const steps = [
  {
    title: "Créez votre fiche",
    desc: "Nom, catégorie, photos, horaires, localisation, contact.",
  },
  {
    title: "Choisissez votre offre",
    desc: "Gratuit pour démarrer, puis options premium pour booster la visibilité.",
  },
  {
    title: "Soyez découvert",
    desc: "Les utilisateurs vous trouvent selon la ville, la distance et leurs envies.",
  },
];

const faqs = [
  {
    q: "C’est gratuit ?",
    a: "Oui, vous pouvez commencer gratuitement. Des options existent pour améliorer la visibilité et ajouter des services.",
  },
  {
    q: "Qui peut s’inscrire ?",
    a: "Restaurants, cafés, artisans, boutiques, expériences culturelles, services locaux.",
  },
  {
    q: "Combien de temps pour apparaître ?",
    a: "Après ajout de votre fiche, elle peut apparaître rapidement dès qu’elle est complétée.",
  },
];

export function MerchantSection() {
  return (
    <section
      id="devenir-partenaire"
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
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80">
              <Store className="h-4 w-4 text-red-500" />
              Espace Commerçant • Maroc 2030
            </div>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Vous êtes commerçant ?
              <span className="block text-red-500">
                Ajoutez votre business
              </span>
              et soyez découvert par des milliers de visiteurs.
            </h2>

            <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
              GoMatch met en avant les commerces locaux (restaurants, cafés,
              artisans, boutiques) pour connecter les supporters et touristes aux
              meilleures adresses près des stades et fan zones.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button className="h-11 w-full rounded-2xl bg-red-600 px-6 text-white hover:bg-red-700 sm:w-auto">
                Ajouter mon business <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-11 w-full rounded-2xl border-white/15 bg-transparent px-6 text-white hover:bg-white/5 sm:w-auto"
              >
                <Link href="/businesses">Voir les commerces</Link>
              </Button>
            </div>

            <div className="mt-4 flex items-center gap-3 text-xs text-white/60">
              <ShieldCheck className="h-4 w-4" />
              Fiches vérifiées • Qualité & confiance
              <BadgeCheck className="ml-3 h-4 w-4" />
              Support & assistance
            </div>
          </motion.div>

          {/* Right cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6 shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">
                    Pourquoi rejoindre GoMatch ?
                  </div>
                  <div className="text-xs text-white/60">
                    Des avantages simples et concrets
                  </div>
                </div>
                <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/70 sm:flex">
                  <Globe className="h-4 w-4" /> Visibilité locale
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {benefits.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <div
                      key={i}
                      className="rounded-2xl border border-white/10 bg-black/25 p-4"
                    >
                      <Icon className="h-5 w-5 text-emerald-400" />
                      <div className="mt-2 font-semibold text-white">
                        {b.title}
                      </div>
                      <div className="mt-1 text-sm text-white/65">{b.desc}</div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-4">
                <div className="text-sm font-semibold text-white">
                  Comment ça marche (côté commerçant)
                </div>
                <ol className="mt-3 space-y-2 text-sm text-white/70">
                  {steps.map((s, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-600/20 text-red-200">
                        {i + 1}
                      </span>
                      <div>
                        <div className="font-medium text-white/85">
                          {s.title}
                        </div>
                        <div className="text-white/60">{s.desc}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-4">
                <div className="text-sm font-semibold text-white">FAQ</div>
                <div className="mt-3 space-y-2">
                  {faqs.map((f, i) => (
                    <details
                      key={i}
                      className="group rounded-xl border border-white/10 bg-black/20 p-3"
                    >
                      <summary className="cursor-pointer list-none text-sm font-semibold text-white/85">
                        {f.q}
                        <span className="float-right text-white/40 group-open:text-white/70">
                          +
                        </span>
                      </summary>
                      <p className="mt-2 text-sm text-white/65">{f.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
