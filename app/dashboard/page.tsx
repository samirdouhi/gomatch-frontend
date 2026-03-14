"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getAccessToken } from "@/lib/authTokens";
import { Trophy, Star, Clock, ArrowUpRight, Newspaper, Zap, LucideIcon } from "lucide-react";

// --- TYPES ---
interface StatCardProps {
  title: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  color: string;
}

interface NewsItemProps {
  title: string;
  category: string;
  date: string;
}

// --- FOND DYNAMIQUE GOMATCH ---
const DynamicSpaceBackground = () => {
  const elements = useMemo(() => {
    const newOrbes = [...Array(5)].map((_, i) => ({
      id: i,
      size: 400 + i * 100,
      left: [5, 85, 15, 75, 50][i],
      top: [15, 10, 80, 75, 45][i],
      duration: 12 + i * 4,
    }));
    return { orbes: newOrbes };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#facc1503_1px,transparent_1px),linear-gradient(to_bottom,#facc1503_1px,transparent_1px)] bg-[size:60px_60px]" />
      {elements.orbes.map((orbe) => (
        <motion.div
          key={orbe.id}
          className="absolute rounded-full bg-[#facc15]/5 blur-[120px]"
          style={{ width: orbe.size, height: orbe.size, left: `${orbe.left}%`, top: `${orbe.top}%` }}
          animate={{ x: [0, 30, -30, 0], y: [0, -30, 30, 0], scale: [1, 1.1, 0.9, 1] }}
          transition={{ duration: orbe.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

export default function DashboardPage() {
  const router = useRouter();

  // ✅ Correction de l'erreur "cascading renders" : Initialisation synchrone
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== "undefined") {
      return !getAccessToken(); // Si pas de token, on reste en chargement pour la redirection
    }
    return true;
  });

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      router.replace("/signin");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-[#050505] flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-2 border-[#facc15] border-t-transparent rounded-full shadow-[0_0_15px_#facc15]" 
        />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#facc15]/30 relative pb-20">
      <DynamicSpaceBackground />

      <div className="w-full px-6 py-10 lg:px-16 lg:py-12 max-w-[1600px] mx-auto space-y-12">
        
        {/* HEADER DE BIENVENUE */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div className="flex items-center gap-4 mb-4">
             <span className="h-px w-12 bg-[#facc15]" />
             <span className="text-[#facc15] text-[10px] font-black uppercase tracking-[0.5em]">Espace Premium</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-[1000] tracking-tighter italic uppercase leading-[0.85] mb-4">
            Salut, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#facc15] via-white to-[#facc15] bg-[length:200%_auto] animate-shimmer">Champion</span>
          </h1>
          <p className="text-white/40 text-xs md:text-sm font-medium max-w-xl leading-relaxed">
            Votre voyage vers <span className="text-white">Maroc 2030</span> continue ici. Accédez à vos privilèges et suivez l&apos;évolution du Royaume en temps réel.
          </p>
        </motion.div>

        {/* GRILLE DE STATISTIQUES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Matchs Favoris" value="12" detail="+2 nouveaux évènements" icon={Star} color="#facc15" />
          <StatCard title="Points GoMatch" value="2,450" detail="Top 5% des supporters" icon={Trophy} color="#facc15" />
          <StatCard title="Compte à rebours" value="1,240j" detail="Jours avant l'ouverture" icon={Clock} color="#ef4444" />
        </div>

        {/* SECTION ACTUALITÉS */}
        <div className="relative group p-[1px] rounded-[2.5rem] overflow-hidden">
          <div className="absolute inset-0 bg-transparent">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0%,#facc15_25%,transparent_50%,#facc15_75%,transparent_100%)] opacity-20"
            />
          </div>

          <div className="relative bg-[#0A0A0A]/80 rounded-[2.45rem] p-8 lg:p-12 backdrop-blur-3xl border border-white/5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <h3 className="text-3xl font-black uppercase italic tracking-tighter flex items-center gap-3">
                  <Newspaper className="text-[#facc15]" /> Actualités GOMATCH
                </h3>
              </div>
              <button className="bg-white/5 hover:bg-[#facc15] hover:text-black transition-all px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 self-start">
                Tout explorer
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <motion.div 
                whileHover={{ y: -5 }}
                className="lg:col-span-7 aspect-[16/10] rounded-[2rem] bg-zinc-900 overflow-hidden relative group cursor-pointer border border-white/10 shadow-2xl"
              >
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000')] bg-cover bg-center transition-all duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute top-6 left-6">
                  <span className="bg-[#facc15] text-black text-[9px] font-[1000] px-4 py-1.5 rounded-lg uppercase tracking-tighter flex items-center gap-2 shadow-lg">
                    <Zap size={12} fill="currentColor" /> Live
                  </span>
                </div>
                <div className="absolute bottom-8 left-8 right-8">
                   <p className="text-[#facc15] text-[10px] font-black uppercase tracking-[0.3em] mb-2">Grand Stade de Casablanca</p>
                   <h4 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic leading-none group-hover:text-[#facc15] transition-colors">
                     L&apos;avancement des travaux <br/>en direct du chantier
                   </h4>
                </div>
              </motion.div>

              <div className="lg:col-span-5 flex flex-col justify-between py-2 space-y-4">
                <NewsItem title="Nouvelle procédure de billetterie FIFA" category="Mise à jour" date="Il y a 2h" />
                <NewsItem title="Transport : Le TGV Marrakech-Agadir confirmé" category="Infrastructure" date="Il y a 5h" />
                <NewsItem title="Partenariat exclusif avec la FRMF" category="Officiel" date="Hier" />
                <NewsItem title="Sélections : Les Lions en préparation" category="Sport" date="2 jours" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// --- SOUS-COMPOSANTS ---

function StatCard({ title, value, detail, icon: Icon, color }: StatCardProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-[#111] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group transition-all duration-500 hover:border-[#facc15]/40 shadow-xl"
    >
      <div className="absolute -right-4 -top-4 bg-white/5 p-10 rounded-full group-hover:bg-[#facc15]/10 transition-colors">
        <Icon size={40} className="text-white/5 group-hover:text-[#facc15]/20 transition-colors" />
      </div>
      <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
        <Icon size={12} style={{ color }} /> {title}
      </p>
      <div className="relative z-10">
        <span className="text-6xl font-[1000] tracking-tighter italic group-hover:text-[#facc15] transition-colors duration-500">
          {value}
        </span>
      </div>
      <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/50">
        <span className="h-1 w-1 rounded-full" style={{ backgroundColor: color }} />
        {detail}
      </div>
    </motion.div>
  );
}

function NewsItem({ title, category, date }: NewsItemProps) {
  return (
    <div className="flex items-center gap-6 p-5 rounded-2xl hover:bg-white/5 transition-all duration-300 cursor-pointer border border-transparent hover:border-white/10 group">
      <div className="h-14 w-14 rounded-xl bg-[#facc15]/5 flex-shrink-0 flex items-center justify-center border border-white/5 group-hover:border-[#facc15]/50 transition-all">
        <ArrowUpRight size={20} className="text-white/20 group-hover:text-[#facc15] transition-all" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <p className="text-[9px] text-[#facc15] font-black tracking-widest uppercase">{category}</p>
          <span className="text-[9px] text-white/20 font-bold uppercase">{date}</span>
        </div>
        <p className="text-sm font-bold text-white/70 group-hover:text-white transition-colors leading-tight">
          {title}
        </p>
      </div>
    </div>
  );
}