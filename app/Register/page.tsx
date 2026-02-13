"use client";

import Link from "next/link";
import { EyeOff } from "lucide-react";

export default function RegisterPage() {
  return (
    // Le parent <main> du layout fait déjà flex-1 → on utilise h-full
    <main className="h-full overflow-hidden">
      {/* ✅ Page en 2 colonnes, sans scroll global */}
      <div className="h-full grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] overflow-hidden">
        {/* ================= LEFT : IMAGE STABLE ================= */}
        <section className="relative hidden lg:block overflow-hidden">
          {/* ✅ image "fixe" dans la colonne (sticky) */}
          <div
            className="
              sticky top-0 h-full
              bg-black
              bg-[url('/photoRegister.png')]
              bg-cover bg-center
            "
          >
            {/* overlay sombre */}
            <div className="absolute inset-0 bg-black/55" />

            {/* texte */}
            <div className="relative z-10 h-full flex items-end">
              <div className="p-12 text-white max-w-xl">
                <p className="text-xs font-semibold tracking-wide mb-3 opacity-90">
                  GoMatch · World Cup 2030
                </p>

                <h1 className="text-4xl font-black leading-tight">
                  Rejoins l’expérience 2030.
                </h1>

                <p className="mt-3 text-sm text-white/85 leading-relaxed">
                  Crée ton compte pour accéder aux matchs, tickets, expériences locales et recommandations IA.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= RIGHT : FORM SCROLLABLE ================= */}
        <section className="bg-white overflow-hidden">
          {/* ✅ SEUL CETTE DIV SCROLL */}
          <div className="h-full overflow-y-auto">
            {/* ✅ padding + centrage vertical “soft” */}
            <div className="min-h-full px-6 py-10 flex justify-center">
              <div className="w-full max-w-sm">
                <h2 className="text-3xl font-black mb-2">Créer un compte</h2>
                <p className="text-sm text-black/60 mb-8">
                  Inscris-toi pour commencer sur GoMatch.
                </p>

                {/* ✅ Form plus grand (tu peux rajouter des champs, ça scroll) */}
                <form className="space-y-6">
                  {/* PRENOM */}
                  <div>
                    <label className="text-xs font-semibold text-black/70">
                      Prénom
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Samir"
                      className="mt-2 w-full border-b border-black/30 py-3 outline-none focus:border-red-600 transition"
                    />
                  </div>

                  {/* NOM */}
                  <div>
                    <label className="text-xs font-semibold text-black/70">
                      Nom
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Douhi"
                      className="mt-2 w-full border-b border-black/30 py-3 outline-none focus:border-red-600 transition"
                    />
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="text-xs font-semibold text-black/70">
                      Adresse électronique
                    </label>
                    <input
                      type="email"
                      placeholder="email@exemple.com"
                      className="mt-2 w-full border-b border-black/30 py-3 outline-none focus:border-red-600 transition"
                    />
                  </div>

                  {/* CONFIRM EMAIL */}
                  <div>
                    <label className="text-xs font-semibold text-black/70">
                      Confirmer l’adresse électronique
                    </label>
                    <input
                      type="email"
                      placeholder="email@exemple.com"
                      className="mt-2 w-full border-b border-black/30 py-3 outline-none focus:border-red-600 transition"
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
                        className="mt-2 w-full border-b border-black/30 py-3 pr-10 outline-none focus:border-red-600 transition"
                      />
                      <EyeOff className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-black/40" />
                    </div>
                  </div>

                  {/* CONFIRM PASSWORD */}
                  <div>
                    <label className="text-xs font-semibold text-black/70">
                      Confirmer le mot de passe
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="mt-2 w-full border-b border-black/30 py-3 pr-10 outline-none focus:border-red-600 transition"
                      />
                      <EyeOff className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-black/40" />
                    </div>
                  </div>

                  {/* CGU */}
                  <label className="flex items-start gap-2 text-sm text-black/60 pt-1">
                    <input type="checkbox" className="mt-1 accent-red-600" />
                    <span>
                      J’accepte les{" "}
                      <Link href="/terms" className="text-red-600 hover:underline font-semibold">
                        conditions
                      </Link>{" "}
                      et la{" "}
                      <Link href="/privacy" className="text-red-600 hover:underline font-semibold">
                        politique de confidentialité
                      </Link>
                      .
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-red-600 py-3 text-white font-bold hover:bg-red-700 transition"
                  >
                    S’inscrire
                  </button>
                </form>

                <div className="mt-8 text-center text-sm text-black/60">
                  Déjà un compte ?{" "}
                  <Link href="/signin" className="font-bold text-red-600 hover:underline">
                    Se connecter
                  </Link>
                </div>

                <div className="mt-10 text-center text-xs text-black/40">
                  Conditions d’utilisation · Politique de confidentialité
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}




