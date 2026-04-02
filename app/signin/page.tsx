"use client";

import Link from "next/link";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowLeft,
  ChevronRight,
  Loader2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { setAuthTokens } from "@/lib/authTokens";
import { getFirstRoute } from "@/lib/profile/profile.routing";
import { getMockProfile, setMockProfile } from "@/lib/profileMock";

// --- TYPES ---
interface Orbe {
  id: number;
  size: number;
  left: number;
  top: number;
  duration: number;
}

interface Comete {
  id: number;
  top: number;
  duration: number;
  delay: number;
}

const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// --- LOGIQUE (Inchangée) ---
type LoginSuccess = {
  accessToken: string;
  expiresAtUtc: string;
  refreshToken: string;
};

function isLoginSuccess(data: unknown): data is LoginSuccess {
  return (
    typeof data === "object" &&
    data !== null &&
    "accessToken" in data &&
    "expiresAtUtc" in data &&
    "refreshToken" in data
  );
}

function getErrorMessage(data: unknown): string {
  if (typeof data !== "object" || data === null) return "Identifiants invalides.";
  const d = data as Record<string, unknown>;
  const msg = d["erreur"] ?? d["Erreur"] ?? d["message"] ?? d["title"] ?? d["error"];
  return typeof msg === "string" && msg.trim() ? msg : "Identifiants invalides.";
}

// --- COMPOSANT D'ARRIÈRE-PLAN DYNAMIQUE ---
const DynamicSpaceBackground = () => {
  const elements = useMemo(() => {
    const newOrbes: Orbe[] = [...Array(5)].map((_, i) => ({
      id: i,
      size: 300 + i * 50,
      left: Math.floor(pseudoRandom(i + 1) * 100),
      top: Math.floor(pseudoRandom(i + 2) * 100),
      duration: 10 + i * 2,
    }));

    const newCometes: Comete[] = [...Array(12)].map((_, i) => ({
      id: i,
      top: Math.floor(pseudoRandom(i + 10) * 100),
      duration: 3 + pseudoRandom(i + 20) * 4,
      delay: pseudoRandom(i + 30) * 5,
    }));

    return { orbes: newOrbes, cometes: newCometes };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{ y: [0, -40] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        // CHANGEMENT : Grille Ambre
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffd70005_1px,transparent_1px),linear-gradient(to_bottom,#ffd70005_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"
      />

      {elements.orbes.map((orbe) => (
        <motion.div
          key={`orbe-${orbe.id}`}
          // CHANGEMENT : bg-amber-500
          className="absolute rounded-full bg-amber-500/10 blur-[100px]"
          style={{
            width: orbe.size,
            height: orbe.size,
            left: `${orbe.left}%`,
            top: `${orbe.top}%`,
          }}
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: orbe.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {elements.cometes.map((comete) => (
        <motion.div
          key={`comet-${comete.id}`}
          // CHANGEMENT : via-amber-500
          className="absolute h-[1px] w-[150px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"
          style={{ top: `${comete.top}%`, left: "-20%" }}
          animate={{ left: ["-20%", "120%"] }}
          transition={{
            duration: comete.duration,
            repeat: Infinity,
            delay: comete.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

function clearOnboardingCaches() {
  if (typeof window === "undefined") return;
  const suspicious = ["gomatch_onboarding","onboarding","selectedInterests","interests","wizard","setupStep","skippedSteps"];
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const k = localStorage.key(i);
    if (!k) continue;
    if (suspicious.some((s) => k.toLowerCase().includes(s))) localStorage.removeItem(k);
  }
  for (let i = sessionStorage.length - 1; i >= 0; i--) {
    const k = sessionStorage.key(i);
    if (!k) continue;
    if (suspicious.some((s) => k.toLowerCase().includes(s))) sessionStorage.removeItem(k);
  }
}

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password) {
      setError("Email et mot de passe obligatoires.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, password }),
      });
      const data: unknown = await res.json().catch(() => null);
      if (!res.ok) {
        setError(`${getErrorMessage(data)} (HTTP ${res.status})`);
        return;
      }
      if (!isLoginSuccess(data)) {
        setError("Réponse API invalide : tokens manquants.");
        return;
      }
      setAuthTokens(data.accessToken, data.expiresAtUtc, data.refreshToken);
      const urlRegistered = searchParams.get("registered") === "1";
      const sessionRegistered = typeof window !== "undefined" && sessionStorage.getItem("gomatch_registered") === "1";
      const registered = urlRegistered || sessionRegistered;
      const existing = getMockProfile();
      const emailChanged = !!existing.email && existing.email.toLowerCase() !== normalizedEmail;

      if (emailChanged || registered) {
        clearOnboardingCaches();
        setMockProfile({
          email: normalizedEmail,
          displayName: "", phone: "", country: "", age: undefined, bio: "", photoUrl: "",
          firstLoginOnboardingDone: false, goal: null, interests: [], merchantStatus: "None",
          goalChosen: false, profileSetupCompleted: false, onboardingCompleted: false,
          setupStepIndex: 0, skippedSteps: [],
        });
      } else {
        setMockProfile({ email: normalizedEmail });
      }

      if (registered && typeof window !== "undefined") {
        sessionStorage.removeItem("gomatch_registered");
        router.replace("/onboarding");
        return;
      }
     const route = await getFirstRoute({ registered: false });
router.replace(route);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="h-screen w-full bg-[#010204] text-zinc-100 overflow-hidden font-sans antialiased select-none">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] h-full">
        {/* SECTION GAUCHE */}
        <section className="relative hidden lg:flex flex-col justify-end p-20 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute inset-0 bg-[url('/photosignin.png')] bg-cover bg-center opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#010204] via-[#010204]/40 to-transparent" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* CHANGEMENT : text-amber-400 & shadow-amber-500 */}
              <div className="flex items-center gap-3 mb-6 text-amber-400">
                <div className="h-[1px] w-12 bg-amber-500 shadow-[0_0_8px_#fbbf24]" />
                <span className="text-[10px] font-black tracking-[0.5em] uppercase">
                  GoMatch · 2030
                </span>
              </div>

              <h1 className="text-7xl font-[1000] leading-[0.85] tracking-tighter mb-8 italic text-white">
                LE FOOTBALL <br />
                {/* CHANGEMENT : gradient via-amber-400 */}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-400 to-red-500 animate-gradient-x bg-[length:200%_auto]">
                  AU CŒUR DU ROYAUME
                </span>
              </h1>

              {/* CHANGEMENT : border-amber-500 */}
              <p className="text-lg text-zinc-400 font-light max-w-md border-l-2 border-amber-500/50 pl-6 py-2">
                Connectez-vous pour vivre L&apos;expérience exclusive de la Coupe du Monde au Maroc.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION DROITE (LOGIN) */}
        <section className="relative flex flex-col items-center justify-center p-6 lg:p-12 bg-[#010204]">
          <DynamicSpaceBackground />

          <div className="relative w-full max-w-[440px] z-10">
            <div className="flex items-center justify-between mb-8 px-2">
              <Link
                href="/"
                // CHANGEMENT : hover:text-amber-400
                className="group flex items-center gap-2 text-[10px] font-bold text-zinc-500 hover:text-amber-400 transition-all uppercase tracking-widest"
              >
                <ArrowLeft className="h-4 w-4" />
                RETOUR
              </Link>

              {/* CHANGEMENT : emerald -> amber */}
              <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-2xl">
                <Zap className="h-3 w-3 text-amber-400 animate-pulse fill-amber-400" />
                <span className="text-[9px] font-black text-amber-400 uppercase tracking-tighter animate-pulse">
                  Rapide
                </span>
              </div>
            </div>

            <div className="relative group p-[1.5px] rounded-[2.6rem] overflow-hidden">
              <div className="absolute inset-0 bg-transparent">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  // CHANGEMENT : conic-gradient ambre -> rouge
                  className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0%,#fbbf24_25%,transparent_50%,#f85050_75%,transparent_100%)]"
                />
              </div>

              <div className="relative rounded-[2.5rem] bg-[#0A0C10]/95 backdrop-blur-3xl p-10 lg:p-12 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                <div className="text-center mb-10">
                  {/* CHANGEMENT : emerald -> amber */}
                  <div className="inline-flex p-4 rounded-[2rem] bg-amber-500/5 border border-amber-500/20 mb-6 shadow-[0_0_15px_rgba(251,191,36,0.1)]">
                    <ShieldCheck className="h-8 w-8 text-amber-400" />
                  </div>
                  <h2 className="text-3xl font-[1000] text-white tracking-tight mb-2 uppercase italic">
                    Connexion
                  </h2>
                  <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em]">
                    Accédez à votre espace membre GoMatch
                  </p>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black text-center uppercase tracking-widest overflow-hidden"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-2">
                      Identifiant Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                      {/* CHANGEMENT : focus border/bg amber */}
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nom@exemple.com"
                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-5 pl-14 pr-4 text-sm outline-none transition-all focus:border-amber-500/40 focus:bg-amber-500/[0.04] placeholder:text-zinc-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center px-2">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">
                        Mot de passe
                      </label>
                      <Link
                        href="/forgot-password"
                        // CHANGEMENT : text-amber-500
                        className="text-[9px] font-black text-amber-500/40 hover:text-amber-400 transition-colors uppercase"
                      >
                        Oublié ?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                      {/* CHANGEMENT : focus border/bg amber */}
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-5 pl-14 pr-14 text-sm outline-none transition-all focus:border-amber-500/40 focus:bg-amber-500/[0.04] placeholder:text-zinc-800"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white p-2"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={loading}
                    // CHANGEMENT : bg-amber-500, shadow-amber
                    className="group relative w-full bg-amber-500 hover:bg-amber-400 py-6 rounded-2xl text-zinc-950 font-[1000] text-[11px] uppercase tracking-[0.4em] overflow-hidden shadow-[0_20px_40px_-10px_rgba(251,191,36,0.5)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shine" />
                    <span className="relative flex items-center justify-center gap-3">
                      {loading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          Accéder au stade <ChevronRight className="h-4 w-4 stroke-[3px]" />
                        </>
                      )}
                    </span>
                  </motion.button>
                </form>

                <div className="mt-12 text-center pt-8 border-t border-white/5">
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] flex items-center justify-center gap-3">
                    Nouveau ici ?
                    {/* CHANGEMENT : hover:text-amber-400, border-amber-500 */}
                    <Link
                      href="/Register"
                      className="text-white hover:text-amber-400 transition-all border-b-2 border-amber-500/50 pb-0.5"
                    >
                      Rejoindre l&apos;aventure
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx global>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x { animation: gradient-x 5s ease infinite; }
        @keyframes shine {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(150%) skewX(-20deg); }
        }
        .animate-shine { animation: shine 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        html, body { height: 100%; overflow: hidden; background: #010204; }
        ::placeholder { color: #1a1a1c !important; letter-spacing: 0.1em; }
      `}</style>
    </main>
  );
}



