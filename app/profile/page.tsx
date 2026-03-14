"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getMockProfile,
  resetMockProfile,
  setMockProfile,
  type MockProfile,
} from "@/lib/profileMock";

export default function ProfilePage() {
  const router = useRouter();

  // Init depuis localStorage (mock)
  const [profile, setProfileState] = useState<MockProfile>(() => getMockProfile());

  // Helper: rafraîchir depuis localStorage (utile après /profile/edit)
  const refreshProfile = () => setProfileState(getMockProfile());

  // 🔁 Re-sync à chaque focus (quand tu reviens d'une autre page)
  useEffect(() => {
    const onFocus = () => refreshProfile();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ Champs requis (grand site): bio + country
  const requiredDone = useMemo(() => {
    return Boolean(profile.bio?.trim()) && Boolean(profile.country?.trim());
  }, [profile.bio, profile.country]);

  // Checklist UI (optionnels inclus)
  const checklist = useMemo(() => {
    return [
      { key: "photo", label: "Ajouter une photo", done: !!profile.photoUrl?.trim() },
      { key: "bio", label: "Ajouter une description", done: !!profile.bio?.trim(), required: true },
      { key: "phone", label: "Ajouter un numéro", done: !!profile.phone?.trim() },
      { key: "country", label: "Choisir un pays", done: !!profile.country?.trim(), required: true },
    ];
  }, [profile]);

  const doneCount = checklist.filter((x) => x.done).length;
  const percent = checklist.length ? Math.round((doneCount / checklist.length) * 100) : 0;

  // ✅ Quand requis OK => marquer setup terminé + aller dashboard
  useEffect(() => {
    if (requiredDone && !profile.profileSetupCompleted) {
      setMockProfile({ profileSetupCompleted: true });
      refreshProfile();
      router.replace("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requiredDone, profile.profileSetupCompleted]);

  return (
    <main className="min-h-[calc(100vh-64px)] bg-zinc-50 dark:bg-[#070A0F] px-6 py-10">
      <div className="max-w-3xl mx-auto grid gap-6">
        {/* Header card */}
        <header
          className="rounded-3xl border border-zinc-200/70 bg-white/90 p-6
                     shadow-[0_10px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl
                     dark:border-zinc-800/60 dark:bg-zinc-950/55
                     dark:shadow-[0_20px_70px_rgba(0,0,0,0.60)]"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black tracking-tight">Compléter mon profil</h1>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                Complétion : <span className="font-semibold">{percent}%</span>
              </p>

              {profile.onboardingIntent && (
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  Intention : <span className="font-semibold">{profile.onboardingIntent}</span> (UX seulement)
                </p>
              )}

              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                Champs requis : <span className="font-semibold">Description</span> +{" "}
                <span className="font-semibold">Pays</span>.
              </p>
            </div>

            <button
              onClick={() => {
                resetMockProfile();
                refreshProfile();
              }}
              className="text-xs font-semibold text-zinc-700 underline hover:text-zinc-900
                         dark:text-zinc-300 dark:hover:text-white"
            >
              Reset (mock)
            </button>
          </div>

          <div className="mt-4 w-full h-3 rounded-full bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
            <div className="h-3 bg-red-600 dark:bg-emerald-500" style={{ width: `${percent}%` }} />
          </div>

          {!requiredDone && (
            <div
              className="mt-4 rounded-2xl border border-amber-200/70 bg-amber-50 px-4 py-3 text-sm text-amber-900
                         dark:border-amber-900/40 dark:bg-amber-950/35 dark:text-amber-200"
            >
              Pour continuer, complète au minimum : <b>Description</b> et <b>Pays</b>.
            </div>
          )}
        </header>

        {/* Checklist card */}
        <section
          className="rounded-3xl border border-zinc-200/70 bg-white/90 p-6
                     shadow-[0_10px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl
                     dark:border-zinc-800/60 dark:bg-zinc-950/55"
        >
          <h2 className="text-lg font-black tracking-tight">À compléter</h2>

          <ul className="mt-4 grid gap-3">
            {checklist.map((item) => (
              <li
                key={item.key}
                className="flex items-center justify-between rounded-2xl border border-zinc-200/80 bg-white px-4 py-3
                           shadow-sm transition hover:border-zinc-300
                           dark:border-zinc-800/70 dark:bg-zinc-900/35 dark:hover:border-zinc-700"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex h-7 w-7 items-center justify-center rounded-full border ${
                      item.done
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white text-zinc-900 border-zinc-300 dark:bg-zinc-950 dark:text-zinc-100 dark:border-zinc-700"
                    }`}
                    aria-hidden
                  >
                    {item.done ? "✓" : "•"}
                  </span>

                  <div className="flex flex-col">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {item.label}{" "}
                      {item.required ? (
                        <span className="ml-2 text-[11px] font-bold text-red-600 dark:text-emerald-400">
                          Requis
                        </span>
                      ) : (
                        <span className="ml-2 text-[11px] font-semibold text-zinc-400">
                          Optionnel
                        </span>
                      )}
                    </span>
                    {!item.done && item.required && (
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        Nécessaire pour passer au dashboard.
                      </span>
                    )}
                  </div>
                </div>

                <button
                  className="text-sm font-semibold text-red-700 hover:underline dark:text-emerald-400"
                  onClick={() => router.push(`/profile/edit?field=${item.key}`)}
                >
                  {item.done ? "Modifier" : "Ajouter"}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => router.push("/dashboard")}
              className="rounded-2xl border border-zinc-200 px-4 py-2 text-sm font-extrabold
                         bg-white hover:bg-zinc-50
                         dark:border-zinc-800 dark:bg-zinc-950/40 dark:hover:bg-zinc-900/40"
            >
              Aller au dashboard
            </button>

            <button
              onClick={() => router.push("/onboarding")}
              className="rounded-2xl px-4 py-2 text-sm font-extrabold
                         bg-red-600 text-white hover:bg-red-700
                         dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400"
            >
              Modifier l’intention
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}