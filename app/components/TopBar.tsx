"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  User,
  ChevronDown,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Home,
  Calendar,
  Landmark,
  Map as MapIcon,
  Ticket,
  MoreHorizontal,
  Search,
} from "lucide-react";

type TopBarProps = {
  sidebarCollapsed?: boolean;
  sidebarOpen?: boolean;
  onToggleSidebar?: () => void;
};

const TOP_LINKS = [
  { label: "Home", href: "/" },
  { label: "Matches", href: "/events" },
  { label: "Culture", href: "/culture" },
  { label: "Map", href: "/map" },
  { label: "Boutique", href: "/tickets" },
];

const MOBILE_NAV = [
  { label: "Home", href: "/", icon: Home },
  { label: "Matches", href: "/events", icon: Calendar },
  { label: "Culture", href: "/culture", icon: Landmark },
  { label: "Map", href: "/map", icon: MapIcon },
  { label: "Boutique", href: "/tickets", icon: Ticket },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function TopBar({ sidebarCollapsed, sidebarOpen, onToggleSidebar }: TopBarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [q, setQ] = useState("");

  const profileRef = useRef<HTMLDivElement | null>(null);
  const notifRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      const t = e.target as Node;
      if (profileRef.current && !profileRef.current.contains(t)) setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(t)) setNotifOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setProfileOpen(false);
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const notifCount = 3;

  // Navigation robuste depuis un dropdown (évite les soucis overlay/pointer-events)
  const go = (path: string) => {
    setProfileOpen(false);
    setNotifOpen(false);
    router.push(path);
  };

  return (
    <>
      <header className="sticky top-0 z-[80] w-full">
        <div className="relative border-b border-white/10 bg-gradient-to-r from-[#8B0B13] via-[#B0101C] to-[#5A060C]">
          {/* glows */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-100 [background:
              radial-gradient(900px_520px_at_15%_0%,rgba(255,255,255,0.18),transparent_60%),
              radial-gradient(900px_520px_at_90%_40%,rgba(245,158,11,0.25),transparent_55%),
              radial-gradient(900px_520px_at_50%_120%,rgba(0,0,0,0.30),transparent_55%)
            ]"
          />

          {/* ===================== DESKTOP (lg+) ===================== */}
          <div className="relative hidden lg:block">
            <div className="mx-auto max-w-7xl px-6">
              <div className="h-20 flex items-center gap-4">
                {/* LEFT */}
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => onToggleSidebar?.()}
                    className="flex h-11 w-11 rounded-2xl border border-white/14 bg-white/10 hover:bg-white/14 transition items-center justify-center"
                    aria-label={sidebarCollapsed ? "Open menu" : "Close menu"}
                    title={sidebarCollapsed ? "Open menu" : "Close menu"}
                  >
                    {sidebarCollapsed ? (
                      <Menu className="h-5 w-5 text-white/85" />
                    ) : (
                      <X className="h-5 w-5 text-white/85" />
                    )}
                  </button>

                  <Link href="/" className="flex items-center gap-3">
                    <div className="relative h-11 w-11">
                      <Image
                        src="/LogoGoMatch2030.png"
                        alt="GoMatch 2030"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                    <div className="leading-tight">
                      <div className="text-white font-black text-sm">GoMatch</div>
                      <div className="text-white/65 text-[11px] font-semibold">Morocco 2030</div>
                    </div>
                  </Link>
                </div>

                {/* CENTER */}
                <nav className="flex-1 flex justify-center">
                  <div className="flex items-center gap-1 rounded-2xl border border-white/14 bg-white/8 px-2 py-1">
                    {TOP_LINKS.map((l) => {
                      const active = isActive(pathname, l.href);
                      return (
                        <Link
                          key={l.href}
                          href={l.href}
                          aria-current={active ? "page" : undefined}
                          className={[
                            "px-4 py-2 rounded-xl text-sm font-black transition-all whitespace-nowrap",
                            active
                              ? "bg-white/16 text-white border border-white/18"
                              : "text-white/85 hover:text-white hover:bg-white/10",
                          ].join(" ")}
                        >
                          {l.label}
                        </Link>
                      );
                    })}
                  </div>
                </nav>

                {/* RIGHT */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="hidden xl:block w-[340px]">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
                      <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search places, events, tickets..."
                        className="w-full rounded-2xl border border-white/14 bg-white/10 pl-9 pr-3 py-2.5 text-sm
                                   text-white placeholder:text-white/55 outline-none transition
                                   focus:border-amber-300/40 focus:ring-2 focus:ring-amber-300/10"
                      />
                    </div>
                  </div>

                  {/* Notifications */}
                  <div className="relative" ref={notifRef}>
                    <button
                      type="button"
                      onClick={() => {
                        setNotifOpen((v) => !v);
                        setProfileOpen(false);
                      }}
                      className="relative h-11 w-11 rounded-2xl border border-white/14 bg-white/10 hover:bg-white/14 transition flex items-center justify-center"
                      aria-label="Notifications"
                      aria-haspopup="menu"
                      aria-expanded={notifOpen}
                    >
                      <Bell className="h-5 w-5 text-white/85" />
                      {notifCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full bg-amber-300 text-[#5A060C] text-[10px] font-black flex items-center justify-center">
                          {notifCount}
                        </span>
                      )}
                    </button>

                    {notifOpen && (
                      <div
                        role="menu"
                        className="absolute right-0 mt-2 z-[120] w-[320px] overflow-hidden rounded-2xl border border-border bg-popover/90 text-popover-foreground backdrop-blur-xl shadow-2xl pointer-events-auto"
                      >
                        <div className="px-4 py-3 border-b border-border/60">
                          <div className="text-sm font-black">Notifications</div>
                          <div className="text-xs opacity-70">Latest updates & alerts</div>
                        </div>
                        <div className="p-2">
                          {[
                            { title: "Tickets", desc: "New ticket drop for Rabat venues." },
                            { title: "Matches", desc: "Schedule updated for this week." },
                            { title: "Culture", desc: "New activity added in Rabat Medina." },
                          ].map((n) => (
                            <button
                              key={n.title}
                              type="button"
                              className="w-full text-left rounded-xl px-3 py-2 hover:bg-muted transition"
                            >
                              <div className="text-sm font-black">{n.title}</div>
                              <div className="text-xs opacity-70">{n.desc}</div>
                            </button>
                          ))}
                        </div>
                        <div className="px-3 py-2 border-t border-border/60">
                          <button
                            type="button"
                            onClick={() => go("/notifications")}
                            className="w-full text-left rounded-xl px-3 py-2 text-sm font-black hover:bg-muted transition"
                          >
                            View all
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Profile */}
                  <div className="relative" ref={profileRef}>
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen((v) => !v);
                        setNotifOpen(false);
                      }}
                      className="h-11 rounded-2xl border border-white/14 bg-white/10 hover:bg-white/14 transition flex items-center gap-2 px-3"
                      aria-label="Profile menu"
                      aria-haspopup="menu"
                      aria-expanded={profileOpen}
                    >
                      <div className="h-7 w-7 rounded-xl bg-white/12 border border-white/14 flex items-center justify-center">
                        <User className="h-4 w-4 text-white/90" />
                      </div>
                      <span className="text-sm font-black text-white/90">Account</span>
                      <ChevronDown className="h-4 w-4 text-white/70" />
                    </button>

                    {profileOpen && (
                      <div
                        role="menu"
                        className="absolute right-0 mt-2 z-[120] w-[260px] overflow-hidden rounded-2xl border border-border bg-popover/90 text-popover-foreground backdrop-blur-xl shadow-2xl pointer-events-auto"
                      >
                        <div className="px-4 py-3 border-b border-border/60">
                          <div className="text-sm font-black">Account</div>
                          <div className="text-xs opacity-70">Sign in to sync favorites</div>
                        </div>
                        <div className="p-2">
                          <button
                            type="button"
                            onClick={() => go("/settings")}
                            className="w-full flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-muted transition text-left"
                          >
                            <Settings className="h-4 w-4 opacity-80" />
                            <span className="text-sm font-semibold">Settings</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => go("/help")}
                            className="w-full flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-muted transition text-left"
                          >
                            <HelpCircle className="h-4 w-4 opacity-80" />
                            <span className="text-sm font-semibold">Help & Support</span>
                          </button>

                          <button
                            type="button"
                            className="w-full flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-muted transition text-left"
                          >
                            <LogOut className="h-4 w-4 opacity-80" />
                            <span className="text-sm font-semibold">Logout</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===================== MOBILE/TABLET (< lg) ===================== */}
          <div className="relative lg:hidden h-[112px] px-4 flex items-center justify-between">
            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button
                type="button"
                onClick={() => {
                  setNotifOpen((v) => !v);
                  setProfileOpen(false);
                }}
                className="relative h-11 w-11 rounded-2xl border border-white/14 bg-white/10 hover:bg-white/14 transition flex items-center justify-center"
                aria-label="Notifications"
                aria-haspopup="menu"
                aria-expanded={notifOpen}
              >
                <Bell className="h-5 w-5 text-white/90" />
                {notifCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full bg-amber-300 text-[#5A060C] text-[10px] font-black flex items-center justify-center">
                    {notifCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div
                  role="menu"
                  className="absolute left-0 mt-2 z-[120] w-[300px] overflow-hidden rounded-2xl border border-border bg-popover/90 text-popover-foreground backdrop-blur-xl shadow-2xl pointer-events-auto"
                >
                  <div className="px-4 py-3 border-b border-border/60">
                    <div className="text-sm font-black">Notifications</div>
                    <div className="text-xs opacity-70">Latest updates & alerts</div>
                  </div>
                  <div className="p-2">
                    {[
                      { title: "Tickets", desc: "New ticket drop for Rabat venues." },
                      { title: "Matches", desc: "Schedule updated for this week." },
                      { title: "Culture", desc: "New activity added in Rabat Medina." },
                    ].map((n) => (
                      <button
                        key={n.title}
                        type="button"
                        className="w-full text-left rounded-xl px-3 py-2 hover:bg-muted transition"
                      >
                        <div className="text-sm font-black">{n.title}</div>
                        <div className="text-xs opacity-70">{n.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Logo */}
            <Link href="/" className="relative h-full w-[380px] mx-auto">
              <Image
                src="/LogoGoMatch2030.png"
                alt="GoMatch 2030"
                fill
                priority
                className="object-contain"
              />
            </Link>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => {
                  setProfileOpen((v) => !v);
                  setNotifOpen(false);
                }}
                className="h-11 w-11 rounded-2xl border border-white/14 bg-white/10 hover:bg-white/14 transition flex items-center justify-center"
                aria-label="Profile"
                aria-haspopup="menu"
                aria-expanded={profileOpen}
              >
                <User className="h-5 w-5 text-white/90" />
              </button>

              {profileOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 z-[120] w-[260px] overflow-hidden rounded-2xl border border-border bg-popover/90 text-popover-foreground backdrop-blur-xl shadow-2xl pointer-events-auto"
                >
                  <div className="px-4 py-3 border-b border-border/60">
                    <div className="text-sm font-black">Account</div>
                    <div className="text-xs opacity-70">Sign in to sync favorites</div>
                  </div>

                  <div className="p-2">
                    <button
                      type="button"
                      onClick={() => go("/settings")}
                      className="w-full flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-muted transition text-left"
                    >
                      <Settings className="h-4 w-4 opacity-80" />
                      <span className="text-sm font-semibold">Settings</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => go("/help")}
                      className="w-full flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-muted transition text-left"
                    >
                      <HelpCircle className="h-4 w-4 opacity-80" />
                      <span className="text-sm font-semibold">Help</span>
                    </button>

                    <button
                      type="button"
                      className="w-full flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-muted transition text-left"
                    >
                      <LogOut className="h-4 w-4 opacity-80" />
                      <span className="text-sm font-semibold">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ===================== BOTTOM NAV (hidden when sidebar open) ===================== */}
      {!sidebarOpen && (
        <nav
          className="lg:hidden fixed bottom-0 left-0 right-0 z-[70]
                     bg-gradient-to-r from-[#8B0B13] via-[#B0101C] to-[#5A060C]
                     border-t border-white/10"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          aria-label="Bottom navigation"
        >
          <div className="mx-auto max-w-md px-3">
            <div className="flex items-center justify-between py-2">
              {MOBILE_NAV.map((item) => {
                const active = isActive(pathname, item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-2xl transition",
                      active ? "bg-white/16" : "hover:bg-white/10",
                    ].join(" ")}
                  >
                    <Icon className={active ? "h-6 w-6 text-white" : "h-6 w-6 text-white/85"} />
                    <span
                      className={
                        active
                          ? "text-[11px] font-black text-white"
                          : "text-[11px] font-semibold text-white/70"
                      }
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}

              <button
                type="button"
                onClick={() => onToggleSidebar?.()}
                className="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-2xl hover:bg-white/10 transition"
                aria-label={sidebarCollapsed ? "Open sidebar" : "Close sidebar"}
              >
                {sidebarCollapsed ? (
                  <MoreHorizontal className="h-6 w-6 text-white" />
                ) : (
                  <X className="h-6 w-6 text-white" />
                )}
                <span className="text-[11px] font-semibold text-white/70">More</span>
              </button>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}


















