"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Store,
  Sparkles,
  Check,
  ArrowLeft,
  Utensils,
  ShoppingBag,
  Landmark,
  MapPin,
  Heart,
  History,
  Leaf,
  Music,
  Ticket,
  Camera,
  FileText,
  Globe,
  Phone,
  X,
  ChevronRight,
} from "lucide-react";
import { getMockProfile, setMockProfile } from "@/lib/profileMock";

// --- Types ---
type Goal = "experience" | "business";
type StepNumber = 0 | 1 | 2;

// --- Données ---
const GOALS = [
  {
    id: "experience" as Goal,
    title: "Vivre l’expérience",
    desc: "Matchs, bons plans et lieux secrets — une expérience 2030 sur mesure.",
    Icon: Sparkles,
    image: "/goal-experience.png", // Assure-toi que cette image existe
    badge: "Supporter / Voyage",
    color: "from-red-600/10", // Moins opaque
  },
  {
    id: "business" as Goal,
    title: "J’ai un commerce",
    desc: "Attirez des clients, gagnez en visibilité et boostez votre activité pendant l'événement.",
    Icon: Store,
    image: "/goal-business.png", // Assure-toi que cette image existe
    badge: "Professionnel",
    color: "from-emerald-600/10", // Moins opaque
  },
];

const INTERESTS = [
  { id: "Gastronomie", label: "Gastronomie", Icon: Utensils, hint: "Adresses & spécialités" },
  { id: "Artisanat", label: "Artisanat", Icon: ShoppingBag, hint: "Souks & savoir-faire" },
  { id: "Culture", label: "Culture locale", Icon: Landmark, hint: "Musées & traditions" },
  { id: "Architecture", label: "Architecture", Icon: Landmark, hint: "Villes & monuments" },
  { id: "Marchés", label: "Marchés", Icon: MapPin, hint: "Marchés & spots" },
  { id: "Cafés", label: "Cafés", Icon: Heart, hint: "Ambiance locale" },
  { id: "Football", label: "Football", Icon: Ticket, hint: "Matchs & fan zones" },
  { id: "Nature", label: "Nature", Icon: Leaf, hint: "Paysages & randos" },
];

const SETUP_CARDS = [
  { step: "photo", title: "Photo de profil", desc: "Un profil avec photo inspire 3x plus confiance aux autres membres.", Icon: Camera, cta: "Ajouter ma photo" },
  { step: "bio", title: "Ta biographie", desc: "Dis-nous en plus sur toi en quelques mots pour personnaliser tes matchs.", Icon: FileText, cta: "Rédiger ma bio" },
  { step: "country", title: "Ton pays", desc: "Pour adapter les suggestions et les langues à ta culture.", Icon: Globe, cta: "Sélectionner" },
];

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export default function OnboardingPage() {
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const initialProfile = useMemo(() => getMockProfile(), []);
  
  const [step, setStep] = useState<StepNumber>(0);
  const [goal, setGoal] = useState<Goal | null>(() => (initialProfile.goal as Goal | null));
  const [interests, setInterests] = useState<string[]>(() => initialProfile.interests || []);
  const [setupIndex, setSetupIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "unset"; };
  }, []);

  const finish = () => {
    setMockProfile({ goal, interests, firstLoginOnboardingDone: true });
    router.replace("/dashboard");
  };

  const nextSetup = () => {
    if (setupIndex < SETUP_CARDS.length - 1) {
      setSetupIndex(prev => prev + 1);
    } else {
      finish();
    }
  };

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-[#030409] text-slate-50 selection:bg-emerald-500/30">
      
      {/* --- BACKGROUND --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
        <motion.div
          animate={reducedMotion ? {} : { scale: [1, 1.2, 1], x: [0, 30, 0], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] h-[70%] w-[70%] rounded-full bg-red-600 blur-[120px]"
        />
        <motion.div
          animate={reducedMotion ? {} : { scale: [1, 1.3, 1], x: [0, -40, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[20%] -right-[10%] h-[60%] w-[60%] rounded-full bg-emerald-500 blur-[130px]"
        />
      </div>

      {/* --- HEADER --- */}
      <header className="relative z-50 flex flex-col items-center px-6 pt-8 pb-4">
        <div className="flex w-full max-w-6xl justify-between items-center">
          <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-black tracking-tighter md:text-3xl italic">
            GO<span className="text-emerald-500">MATCH</span>
          </motion.h1>
          <button onClick={finish} className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest backdrop-blur-md transition hover:bg-white/10 active:scale-95">
            Passer <X className="h-3 w-3" />
          </button>
        </div>

        <div className="mt-8 w-full max-w-md">
           <div className="flex justify-between mb-2 px-1">
              {["Objectif", "Intérêts", "Profil"].map((label, i) => (
                <span key={i} className={`text-[10px] uppercase tracking-[0.2em] font-black transition-colors duration-500 ${step >= i ? 'text-emerald-400' : 'text-white/20'}`}>
                  {label}
                </span>
              ))}
           </div>
           <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/5">
              <motion.div className="h-full bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400" animate={{ width: `${(step / 2) * 100}%` }} transition={{ type: "spring", stiffness: 100, damping: 20 }} />
           </div>
        </div>
      </header>

      {/* --- CONTENT --- */}
      <main className="relative z-10 h-[calc(100dvh-180px)] overflow-y-auto px-6 py-4 custom-scrollbar">
        <div className="mx-auto max-w-6xl h-full">
          <AnimatePresence mode="wait">
            
            {step === 0 && (
              <motion.div key="step0" {...pageVariants} transition={{ duration: 0.4 }} className="grid h-full gap-6 md:grid-cols-2 lg:py-10">
                {GOALS.map((g) => (
                  <motion.button
                    key={g.id}
                    whileHover={{ y: -5, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setGoal(g.id); setStep(1); }}
                    className={`group relative overflow-hidden rounded-[40px] border transition-all duration-500 ${goal === g.id ? 'border-emerald-500/50 ring-1 ring-emerald-500/50' : 'border-white/10'}`}
                  >
                    {/* MODIFICATION ICI : Opacité augmentée pour plus de clarté */}
                    <Image src={g.image} alt="" fill className="object-cover opacity-70 transition duration-700 group-hover:scale-110 group-hover:opacity-90" />
                    
                    {/* MODIFICATION ICI : Dégradé noir ajusté pour être moins opaque en haut et révéler l'image */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${g.color} via-black/40 to-black/70`} />
                    
                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-left">
                      <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest backdrop-blur-xl border border-white/5">
                        <g.Icon className="h-3 w-3 text-emerald-400" /> {g.badge}
                      </div>
                      <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white md:text-5xl leading-none">{g.title}</h2>
                      <p className="mt-4 max-w-[35ch] text-sm leading-relaxed text-slate-400">{g.desc}</p>
                      <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:translate-x-3">
                        <ChevronRight size={28} />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step1" {...pageVariants} className="flex flex-col gap-8 py-6 h-full items-center">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-black italic tracking-tight uppercase">Tes Passions</h2>
                  {/* FIX ESLint: Apostrophe échappée */}
                  <p className="text-slate-500 text-sm">{"Sélectionne tes centres d'intérêt pour affiner ton expérience."}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 w-full">
                  {INTERESTS.map((it) => {
                    const selected = interests.includes(it.id);
                    return (
                      <motion.button
                        key={it.id}
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.06)" }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setInterests(prev => prev.includes(it.id) ? prev.filter(i => i !== it.id) : [...prev, it.id])}
                        className={`relative flex flex-col items-center gap-4 rounded-[32px] border p-8 transition-all duration-300 ${selected ? 'border-emerald-500 bg-emerald-500/10 shadow-[0_0_40px_rgba(16,185,129,0.1)]' : 'border-white/5 bg-white/[0.02]'}`}
                      >
                        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-colors ${selected ? 'bg-emerald-500 text-white' : 'bg-white/5 text-slate-500'}`}>
                          <it.Icon className="h-7 w-7" />
                        </div>
                        <div className="text-center">
                          <span className="block text-sm font-bold tracking-wide">{it.label}</span>
                          <span className="text-[10px] text-slate-500 uppercase font-medium mt-1">{it.hint}</span>
                        </div>
                        {selected && <motion.div initial={{scale:0}} animate={{scale:1}} className="absolute top-4 right-4 h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center"><Check className="h-3 w-3 text-white" /></motion.div>}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" {...pageVariants} className="flex flex-col items-center justify-center py-12 h-full">
                <div className="w-full max-w-lg space-y-8">
                  <div className="text-center space-y-2">
                    {/* FIX ESLint: Apostrophe échappée */}
                    <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none">{"C'est presque prêt !"}</h2>
                    <p className="text-slate-500">Ajoutons les dernières touches pour ton profil public.</p>
                  </div>
                  <motion.div layout className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl shadow-2xl">
                    <AnimatePresence mode="wait">
                      <motion.div key={setupIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col items-center text-center">
                        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-[30px] bg-gradient-to-br from-emerald-400 to-cyan-500 text-black shadow-lg shadow-emerald-500/20">
                          {React.createElement(SETUP_CARDS[setupIndex].Icon, { size: 40 })}
                        </div>
                        <h3 className="text-2xl font-bold">{SETUP_CARDS[setupIndex].title}</h3>
                        <p className="mt-3 text-slate-400 leading-relaxed">{SETUP_CARDS[setupIndex].desc}</p>
                        <button className="mt-10 w-full rounded-2xl bg-white py-5 font-black text-black transition hover:bg-emerald-400 active:scale-95 uppercase tracking-widest text-sm">{SETUP_CARDS[setupIndex].cta}</button>
                        <button onClick={nextSetup} className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors">Plus tard</button>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      {/* --- FOOTER NAV --- */}
      <AnimatePresence>
        {step > 0 && (
          <motion.footer initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="fixed bottom-0 inset-x-0 z-50 p-6 md:p-10 pointer-events-none">
            <div className="max-w-6xl mx-auto flex justify-between items-center pointer-events-auto">
              <button
                // FIX TypeScript: Typage explicite as StepNumber
                onClick={() => setStep((s) => Math.max(0, s - 1) as StepNumber)}
                className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-white transition group"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Retour
              </button>

              {step === 1 && (
                <button
                  disabled={interests.length < 3}
                  onClick={() => setStep(2)}
                  className={`flex items-center gap-3 rounded-2xl px-10 py-5 font-black uppercase tracking-widest text-sm transition-all ${interests.length >= 3 ? 'bg-emerald-500 text-white shadow-[0_20px_50px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95' : 'bg-white/5 text-white/20 cursor-not-allowed opacity-50'}`}
                >
                  Suivant <ChevronRight className="h-5 w-5" />
                </button>
              )}

              {step === 2 && (
                <button onClick={finish} className="rounded-2xl bg-white px-10 py-5 font-black uppercase tracking-widest text-sm text-black hover:bg-emerald-400 transition-all hover:scale-105 active:scale-95">Accéder au Dashboard</button>
              )}
            </div>
          </motion.footer>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
      `}</style>
    </div>
  );
}