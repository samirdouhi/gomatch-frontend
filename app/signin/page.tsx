"use client";

import Link from "next/link";
import { EyeOff } from "lucide-react";

export default function SignInPage() {
  return (
    // ✅ IMPORTANT : h-full (pas de calc) car le parent <main> du layout est déjà flex-1
    <main className="h-full overflow-hidden">
      <div className="h-full grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] overflow-hidden">
        {/* ================= LEFT : IMAGE ================= */}
        <section
          className="
            relative hidden lg:flex items-end overflow-hidden
            bg-black
            bg-[url('/photosignin.png')]
            bg-cover bg-center
          "
        >
          {/* overlay sombre */}
          <div className="absolute inset-0 bg-black/55" />

          {/* texte */}
          <div className="relative z-10 p-12 text-white max-w-xl">
            <p className="text-xs font-semibold tracking-wide mb-3 opacity-90">
              GoMatch · World Cup 2030
            </p>

            <h1 className="text-4xl font-black leading-tight">
              Le football au bout des doigts.
            </h1>

            <p className="mt-3 text-sm text-white/85 leading-relaxed">
              Accède aux matchs, tickets, expériences locales et recommandations IA
              pour la Coupe du Monde 2030 au Maroc.
            </p>
          </div>
        </section>

        {/* ================= RIGHT : FORM ================= */}
        <section className="flex items-center justify-center bg-white px-6 overflow-hidden">
          <div className="w-full max-w-sm">
            <h2 className="text-3xl font-black mb-2">Se connecter</h2>
            <p className="text-sm text-black/60 mb-7">
              Connecte-toi pour accéder à ton compte GoMatch.
            </p>

            <form className="space-y-6">
              {/* EMAIL */}
              <div>
                <label className="text-xs font-semibold text-black/70">
                  Adresse électronique
                </label>
                <input
                  type="email"
                  placeholder="email@exemple.com"
                  className="
                    mt-2 w-full border-b border-black/30
                    py-3 outline-none
                    focus:border-red-600 transition
                  "
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-xs font-semibold text-black/70">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="
                      mt-2 w-full border-b border-black/30
                      py-3 pr-10 outline-none
                      focus:border-red-600 transition
                    "
                  />
                  <EyeOff className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-black/40" />
                </div>
              </div>

              <button
                type="submit"
                className="
                  w-full rounded-full bg-red-600
                  py-3 text-white font-bold
                  hover:bg-red-700 transition
                "
              >
                Se connecter
              </button>

              <Link
                href="/forgot-password"
                className="block text-center text-sm text-red-600 hover:underline"
              >
                Mot de passe oublié ?
              </Link>
            </form>

            <div className="mt-8 text-center text-sm text-black/60">
              Vous n’avez pas de compte ?{" "}
              <Link href="/Register" className="font-bold text-red-600 hover:underline">
                S’inscrire
              </Link>
            </div>

            <div className="mt-10 text-center text-xs text-black/40">
              Conditions d’utilisation · Politique de confidentialité
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}










