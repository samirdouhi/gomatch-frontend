"use client";

import Link from "next/link";
import { MapPin, Mail, Phone, ArrowRight, Store, Sparkles, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-black text-white">
      {/* top divider glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-red-600/10 blur-3xl" />
        <div className="absolute -bottom-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-emerald-500/8 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.65),rgba(0,0,0,0.96))]" />
      </div>

      <div className="container relative mx-auto px-4 pt-14 sm:pt-16">
        {/* CTA block */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-red-600/20 to-emerald-500/10 p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                <Store className="h-4 w-4 text-red-500" />
                Espace commerçant
              </div>
              <h3 className="mt-3 text-lg font-bold sm:text-xl">
                Vous êtes commerçant ? Ajoutez votre business.
              </h3>
              <p className="mt-1 text-sm text-white/75">
                Soyez visible auprès des supporters et touristes près des stades et fan zones.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {/* ✅ Scroll vers section commerçant */}
              <Button
                className="h-11 rounded-2xl bg-red-600 px-6 text-white hover:bg-red-700"
                onClick={() => scrollToId("devenir-partenaire")}
              >
                Ajouter mon business <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              {/* ✅ Scroll vers MatchPlans */}
              <Button
                variant="outline"
                className="h-11 rounded-2xl border-white/15 bg-transparent px-6 text-white hover:bg-white/5"
                onClick={() => scrollToId("match-plans")}
              >
                Découvrir
              </Button>
            </div>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="mt-10 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                <Sparkles className="h-5 w-5 text-red-500" />
              </div>
              <div className="font-bold">GoMatch</div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              Votre guide local pendant Maroc 2030 : adresses proches, expériences culturelles
              et commerces locaux autour des stades.
            </p>

            <div className="mt-4 space-y-2 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-400" />
                Maroc • Rabat • Casablanca • Marrakech • Tanger
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-400" />
                <a className="hover:text-white" href="mailto:contact@gomatch.ma">
                  contact@gomatch.ma
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-400" />
                <a className="hover:text-white" href="tel:+212600000000">
                  +212 6 00 00 00 00
                </a>
              </div>
            </div>
          </div>

          {/* ✅ NEW: Landing sections */}
          <div>
            <div className="text-sm font-semibold text-white/90">Sections</div>
            <ul className="mt-3 space-y-2 text-sm text-white/65">
              <li>
                <button
                  className="inline-flex items-center gap-2 hover:text-white"
                  onClick={() => scrollToId("matches")}
                >
                  <Calendar className="h-4 w-4 text-red-500" />
                  Matchs à Rabat
                </button>
              </li>
              <li>
                <button
                  className="inline-flex items-center gap-2 hover:text-white"
                  onClick={() => scrollToId("match-plans")}
                >
                  <Clock className="h-4 w-4 text-emerald-400" />
                  Plans avant / après match
                </button>
              </li>
              <li>
                <button className="hover:text-white" onClick={() => scrollToId("comment-ca-marche")}>
                  Comment ça marche ?
                </button>
              </li>
              <li>
                <button className="hover:text-white" onClick={() => scrollToId("devenir-partenaire")}>
                  Espace commerçant
                </button>
              </li>
            </ul>
          </div>

          {/* Pages */}
          <div>
            <div className="text-sm font-semibold text-white/90">Explorer</div>
            <ul className="mt-3 space-y-2 text-sm text-white/65">
              <li>
                <Link className="hover:text-white" href="/events">
                  Matchs & événements
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/businesses">
                  Commerces & adresses
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/culture">
                  Culture & découverte
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/map">
                  Carte interactive
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className="text-sm font-semibold text-white/90">Légal</div>
            <ul className="mt-3 space-y-2 text-sm text-white/65">
              <li>
                <Link className="hover:text-white" href="/privacy">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/terms">
                  Conditions d’utilisation
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/cookies">
                  Cookies
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-white/55 sm:flex-row">
          <div>© {year} GoMatch. Tous droits réservés.</div>
          <div className="flex items-center gap-2">
            <span className="text-white/45">Made for</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-white/70">
              Maroc 2030
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

