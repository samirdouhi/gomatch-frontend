"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { AppSidebar } from "./AppSideBar";
import { TopBar } from "./TopBar";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // ✅ setState dans un callback -> évite le warning
    const id = window.requestAnimationFrame(() => {
      setSidebarOpen(false);
    });

    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  const noScrollPage = useMemo(() => {
    return pathname === "/signin" || pathname === "/login";
  }, [pathname]);

  const isAssistant = useMemo(() => {
    return pathname === "/assistant" || pathname.startsWith("/assistant/");
  }, [pathname]);

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <TopBar
        sidebarCollapsed={!sidebarOpen}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
      />

      <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main
        className={[
          "flex-1 min-h-0 overscroll-contain",
          isAssistant
            ? "overflow-hidden p-0 pb-0 bg-background text-foreground"
            : noScrollPage
            ? "overflow-hidden"
            : "overflow-y-auto",
          isAssistant ? "" : "pb-24 lg:pb-0",
          "bg-background text-foreground",
        ].join(" ")}
      >
        {children}
      </main>
    </div>
  );
}



