"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import {
  Home, Calendar, Store, Landmark, Brain, Map as CarteIcon,
  LogIn, LogOut, X, Search, Settings, Heart, History,
  Sparkles, HelpCircle, Info, Mail, BadgeCheck,  User, 
} from "lucide-react";
import { logout } from "@/lib/logout";

type ElementMenu = {
  nom: string;
  icone: React.ElementType;
  lien: string;
  description?: string;
  badge?: string;
  external?: boolean;
};

type SectionMenu = {
  titre: string;
  elements: ElementMenu[];
};

function estActif(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

type Props = {
  open: boolean;
  onClose: () => void;
};

function readAuthedFromStorage() {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("gomatch_access_token");
}

const SECTIONS_AUTH: SectionMenu[] = [
  {
    titre: "Navigation",
    elements: [
      { nom: "Accueil", icone: Home, lien: "/", description: "Page principale" },
      { nom: "Matchs", icone: Calendar, lien: "/events", description: "Calendrier" },
      { nom: "Culture", icone: Landmark, lien: "/culture", description: "Patrimoine & histoires" },
      { nom: "Carte", icone: CarteIcon, lien: "/map", description: "Explorer autour de toi" },
      { nom: "Que faire ?", icone: Store, lien: "/businesses", description: "Commerces & sorties" },
    ],
  },
  {
    titre: "Intelligent",
    elements: [
      { nom: "Assistant", icone: Brain, lien: "/assistant", description: "Aide & conseils", badge: "IA" },
      { nom: "Recommandations", icone: Sparkles, lien: "/reco", description: "Suggestions" },
    ],
  },
  {
    titre: "Mon espace",
    elements: [
      { nom: "Profil", icone: User, lien: "/profile", description: "Compte & infos" },
      { nom: "Favoris", icone: Heart, lien: "/favorites", description: "Lieux enregistrés" },
      { nom: "Historique", icone: History, lien: "/history", description: "Dernières visites" },
      { nom: "Paramètres", icone: Settings, lien: "/settings", description: "Préférences" },
    ],
  },
];

const INVITE_ACTIONS = [
  { label: "Créer un compte", href: "/Register", variant: "primary" as const, icon: BadgeCheck },
  { label: "Se connecter", href: "/signin", variant: "secondary" as const, icon: LogIn },
];

const INVITE_LINKS: ElementMenu[] = [
  { nom: "Expérience 2030", icone: Sparkles, lien: "/experience", description: "Villes & ambiances" },
  { nom: "Ajouter votre commerce", icone: Store, lien: "/ajouter-commerce", description: "Rejoindre GoMatch" },
  { nom: "Aide", icone: HelpCircle, lien: "/aide", description: "FAQ & support" },
  { nom: "À propos", icone: Info, lien: "/a-propos", description: "Notre mission" },
  { nom: "Contact", icone: Mail, lien: "/contact", description: "Nous écrire" },
];

export function AppSidebar({ open, onClose }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [recherche, setRecherche] = useState("");
  const [authed, setAuthed] = useState(() => readAuthedFromStorage());

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    const sync = () => setAuthed(readAuthedFromStorage());
    window.addEventListener("storage", sync);
    window.addEventListener("gomatch-auth-changed", sync as EventListener);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("gomatch-auth-changed", sync as EventListener);
    };
  }, []);

  async function handleLogout() {
    try { await logout(); } catch { } finally {
      window.dispatchEvent(new Event("gomatch-auth-changed"));
      onClose();
      router.replace("/signin");
      router.refresh();
    }
  }

  const inviteFiltered = useMemo(() => {
    const q = recherche.trim().toLowerCase();
    if (!q) return INVITE_LINKS;
    return INVITE_LINKS.filter(it => `${it.nom} ${it.description}`.toLowerCase().includes(q));
  }, [recherche]);

  const authSectionsFiltrees = useMemo(() => {
    const q = recherche.trim().toLowerCase();
    if (!q) return SECTIONS_AUTH;
    return SECTIONS_AUTH.map(s => ({
      ...s,
      elements: s.elements.filter(it => `${it.nom} ${it.description}`.toLowerCase().includes(q))
    })).filter(s => s.elements.length > 0);
  }, [recherche]);

  return (
    <div className={`fixed inset-0 z-[140] transition-all duration-500 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      {/* Overlay */}
      <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      {/* Panel */}
      <aside className={`absolute left-0 top-0 h-screen w-[320px] bg-[#0a0a0a] border-r border-white/10 transition-transform duration-500 ease-out shadow-2xl ${open ? "translate-x-0" : "-translate-x-full"}`}>
        
        {/* Glow discret en fond */}
        <div className="absolute top-0 left-0 w-full h-64 bg-[#facc15]/5 blur-[120px] pointer-events-none" />

        <div className="relative flex h-full flex-col overflow-hidden">
          
          {/* Header */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <Link href="/" onClick={onClose} className="relative h-10 w-32">
                <Image src="/logoGoMatch2030.png" alt="Logo" fill className="object-contain object-left" priority />
              </Link>
              <button onClick={onClose} className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:border-[#facc15] transition-all">
                <X size={20} />
              </button>
            </div>

            {/* Recherche style TopBar */}
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-[#facc15] transition-colors" />
              <input
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
                placeholder="Rechercher..."
                className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-white/20 outline-none focus:border-[#facc15]/50 transition-all"
              />
            </div>

            {!authed && (
              <div className="mt-6 flex flex-col gap-2">
                {INVITE_ACTIONS.map((a) => (
                  <Link key={a.href} href={a.href} onClick={onClose} 
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      a.variant === "primary" ? "bg-[#facc15] text-black shadow-lg shadow-[#facc15]/10 hover:scale-[1.02]" : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                    }`}>
                    <a.icon size={14} /> {a.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Content */}
          <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-6 [scrollbar-width:none]">
            {!authed ? (
              <div className="space-y-1">
                {inviteFiltered.map((item) => (
                  <SidebarLink key={item.lien} item={item} actif={estActif(pathname, item.lien)} onClick={onClose} />
                ))}
              </div>
            ) : (
              authSectionsFiltrees.map((section) => (
                <div key={section.titre} className="space-y-2">
                  <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
                    {section.titre}
                  </h3>
                  <div className="space-y-1">
                    {section.elements.map((item) => (
                      <SidebarLink key={item.lien} item={item} actif={estActif(pathname, item.lien)} onClick={onClose} />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/5 bg-black/40">
            {authed && (
              <button onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#ef4444] hover:bg-[#ef4444]/5 transition-all">
                <LogOut size={16} /> Quitter la session
              </button>
            )}
            <p className="mt-2 text-[9px] text-center font-bold uppercase tracking-widest text-white/10">
              © GoMatch Maroc 2030
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

function SidebarLink({ item, actif, onClick }: { item: ElementMenu; actif: boolean; onClick: () => void }) {
  const Icon = item.icone;
  return (
    <Link
      href={item.lien}
      onClick={onClick}
      className={`group flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
        actif ? "bg-[#facc15]/10 border border-[#facc15]/20 shadow-[0_0_20px_rgba(250,204,21,0.05)]" : "hover:bg-white/5 border border-transparent"
      }`}
    >
      <div className={`p-2 rounded-lg transition-colors ${actif ? "bg-[#facc15] text-black" : "bg-white/5 text-white/40 group-hover:text-white"}`}>
        <Icon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`text-[11px] font-black uppercase tracking-wider transition-colors ${actif ? "text-[#facc15]" : "text-white/60 group-hover:text-white"}`}>
            {item.nom}
          </span>
          {item.badge && (
            <span className="px-1.5 py-0.5 rounded-md bg-[#facc15] text-[8px] font-black text-black">
              {item.badge}
            </span>
          )}
        </div>
        <p className="text-[10px] text-white/20 truncate">{item.description}</p>
      </div>
      {actif && <div className="h-1.5 w-1.5 rounded-full bg-[#facc15] shadow-[0_0_10px_#facc15]" />}
    </Link>
  );
}





