"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  Home,
  Calendar,
  Store,
  Landmark,
  Brain,
  Map as MapIcon,
  LogIn,
  X,
} from "lucide-react";

const ALL_ITEMS = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Matches", icon: Calendar, href: "/events" },
  { name: "Que Faire ?", icon: Store, href: "/businesses" },
  { name: "Culture", icon: Landmark, href: "/culture" },
  { name: "Assistant", icon: Brain, href: "/assistant" },
  { name: "Map", icon: MapIcon, href: "/map" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

type Props = {
  open: boolean;
  onClose: () => void;
};

export function AppSidebar({ open, onClose }: Props) {
  const pathname = usePathname();

  // ESC pour fermer (uniquement quand open)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    // ✅ Toujours monté pour l'animation, MAIS quand fermé => pointer-events-none
    <div
      className={[
        "fixed inset-0 z-[140] transition-opacity duration-300",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
      ].join(" ")}
      aria-hidden={!open}
    >
      {/* Overlay (clique pour fermer) */}
      <button
        type="button"
        aria-label="Close sidebar overlay"
        onClick={onClose}
        className="absolute inset-0 bg-black/35 backdrop-blur-sm"
      />

      {/* Panel sidebar (animation slide) */}
      <aside
        className={[
          "absolute left-0 top-0 h-screen w-[340px] max-w-[88vw] border-r border-black/10",
          "transform-gpu transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="relative flex h-full w-full flex-col overflow-hidden bg-gradient-to-b from-[#8B0B13] via-[#B0101C] to-[#5A060C]">
          {/* Glows */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-100 [background:
              radial-gradient(900px_520px_at_10%_0%,rgba(255,255,255,0.22),transparent_60%),
              radial-gradient(900px_520px_at_95%_20%,rgba(245,158,11,0.30),transparent_55%),
              radial-gradient(900px_520px_at_40%_90%,rgba(0,0,0,0.30),transparent_55%)
            ]"
          />

          {/* Header */}
          <div className="relative px-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 h-10 w-10 rounded-2xl border border-white/14 bg-white/10 hover:bg-white/14 transition flex items-center justify-center"
              aria-label="Close sidebar"
              title="Close"
            >
              <X className="h-5 w-5 text-white/90" />
            </button>

            <Link href="/" onClick={onClose} aria-label="Go to Home" className="block">
              <div className="flex items-center justify-center pt-6 pb-4">
                <Image
                  src="/logoGoMatch2030.png"
                  alt="GoMatch Morocco 2030"
                  width={320}
                  height={320}
                  priority
                  className="h-auto w-[240px] sm:w-[260px] md:w-[280px] object-contain drop-shadow-[0_22px_44px_rgba(0,0,0,0.38)]"
                />
              </div>
            </Link>
          </div>

          {/* Menu list */}
          <nav
            className={[
              "relative flex-1 min-h-0 px-4 pb-4 space-y-2 overflow-y-auto",
              "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
            ].join(" ")}
          >
            {ALL_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "w-full box-border block rounded-2xl border transition-all duration-300 will-change-transform",
                    "hover:-translate-y-[2px] hover:shadow-[0_10px_28px_rgba(0,0,0,0.25)]",
                    active
                      ? "border-white/28 bg-gradient-to-r from-white/18 to-amber-200/18"
                      : "border-white/14 bg-white/10 hover:border-white/22 hover:bg-white/14",
                  ].join(" ")}
                >
                  <div className="grid grid-cols-[44px_1fr_18px] items-center gap-3 px-3 py-3">
                    <div
                      className={[
                        "h-11 w-11 rounded-2xl border flex items-center justify-center transition-all duration-300",
                        active ? "bg-white/18 border-white/22" : "bg-black/10 border-white/14",
                      ].join(" ")}
                    >
                      <Icon className={active ? "h-5 w-5 text-white" : "h-5 w-5 text-white/85"} />
                    </div>

                    <div className="min-w-0">
                      <div className="text-sm font-black text-white leading-tight">{item.name}</div>
                      <div className="text-xs text-white/70 truncate">Accès rapide</div>
                    </div>

                    <div className="flex justify-end">
                      <span
                        className={[
                          "h-2.5 w-2.5 rounded-full transition-all duration-300",
                          active
                            ? "bg-amber-300 shadow-[0_0_0_6px_rgba(245,158,11,0.22)]"
                            : "bg-transparent",
                        ].join(" ")}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="relative px-4 py-4 border-t border-white/12">
            <Link
              href="/signin"
              onClick={onClose}
              className="w-full box-border block rounded-2xl border border-white/14 bg-white/10
                         hover:bg-white/14 hover:border-white/22 hover:-translate-y-[1px]
                         hover:shadow-[0_10px_24px_rgba(0,0,0,0.22)]
                         transition-all duration-300"
            >
              <div className="grid grid-cols-[44px_1fr] items-center gap-3 px-3 py-3">
                <div className="h-11 w-11 rounded-2xl bg-black/10 border border-white/14 flex items-center justify-center">
                  <LogIn className="h-5 w-5 text-white/85" />
                </div>

                <div className="min-w-0">
                  <div className="text-sm font-black text-white leading-tight">Sign in</div>
                  <div className="text-xs text-white/70 truncate">Compte & favoris</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}






