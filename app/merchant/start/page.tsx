"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { setMockProfile } from "@/lib/profileMock";

export default function MerchantStartPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");

  function submit() {
    // Mock : on simule "Started"
    setMockProfile({ merchantStatus: "Started" });
    router.push("/profile");
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-neutral-50">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-semibold">Créer mon commerce</h1>
        <p className="text-neutral-600 mt-2">
          Démo front : on enregistre juste un statut local (sans backend).
        </p>

        <div className="grid gap-3 mt-6">
          <label className="grid gap-1">
            <span className="text-sm text-neutral-700">Nom du commerce</span>
            <input
              className="rounded-xl border p-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Café Atlas"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm text-neutral-700">Catégorie</span>
            <input
              className="rounded-xl border p-3"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Ex: Restaurant, Artisanat…"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm text-neutral-700">Ville</span>
            <input
              className="rounded-xl border p-3"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Ex: Rabat"
            />
          </label>
        </div>

        <div className="flex items-center justify-between mt-6">
          <button onClick={() => router.back()} className="text-sm underline">
            Retour
          </button>

          <button
            disabled={!name || !category || !city}
            onClick={submit}
            className="rounded-xl bg-neutral-900 text-white px-4 py-2 disabled:opacity-60"
          >
            Continuer
          </button>
        </div>
      </div>
    </main>
  );
}