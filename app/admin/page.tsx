import Link from "next/link";
import {
  ShieldCheck,
  Store,
  Clock3,
  BarChart3,
  ChevronRight,
} from "lucide-react";

export default function AdminDashboardPage() {
  const cards = [
    {
      title: "Demandes commerçants",
      description:
        "Consulter, examiner et traiter les demandes commerçants en attente de validation.",
      href: "/admin/commercants",
      icon: Store,
      badge: "Priorité",
    },
    {
      title: "Validations en attente",
      description:
        "Accéder rapidement aux dossiers à approuver ou à rejeter depuis l’espace d’administration.",
      href: "/admin/commercants",
      icon: Clock3,
      badge: "Workflow",
    },
    {
      title: "Statistiques",
      description:
        "Section réservée aux statistiques et au pilotage de la plateforme. À brancher ensuite.",
      href: "/admin",
      icon: BarChart3,
      badge: "Bientôt",
    },
  ];

  return (
    <main className="min-h-screen bg-[#06080d] text-white">
      <div className="border-b border-white/10 bg-white/[0.02] backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
          <div className="flex items-start justify-between gap-6 flex-col lg:flex-row">
            <div>
              <div className="mb-4 inline-flex items-center gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-2">
                <ShieldCheck className="h-4 w-4 text-amber-400" />
                <span className="text-[11px] font-black uppercase tracking-[0.25em] text-amber-400">
                  Administration
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-black tracking-tight">
                Dashboard Admin
              </h1>

              <p className="mt-3 max-w-2xl text-sm text-zinc-400 leading-6">
                Bienvenue dans l’espace d’administration GoMatch. Depuis ce
                panneau, vous pouvez superviser les demandes commerçants,
                contrôler les validations et préparer les futures fonctionnalités
                de pilotage de la plateforme.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto lg:min-w-[340px]">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_0_30px_rgba(0,0,0,0.25)]">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">
                  Module principal
                </p>
                <p className="mt-2 text-lg font-bold text-white">
                  Validation commerçants
                </p>
                <p className="mt-1 text-sm text-zinc-400">
                  Flux prioritaire actuellement branché.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_0_30px_rgba(0,0,0,0.25)]">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">
                  Statut
                </p>
                <p className="mt-2 text-lg font-bold text-amber-400">
                  Interface sécurisée
                </p>
                <p className="mt-1 text-sm text-zinc-400">
                  Accès réservé au rôle Admin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="mb-6">
          <h2 className="text-xl font-bold tracking-tight">
            Accès rapides
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Utilisez ces raccourcis pour naviguer dans les modules de gestion
            disponibles.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.title}
                href={card.href}
                className="group rounded-[28px] border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-amber-500/30 hover:bg-white/[0.05] hover:shadow-[0_0_40px_rgba(251,191,36,0.08)]"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10">
                    <Icon className="h-6 w-6 text-amber-400" />
                  </div>

                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-lg font-black tracking-tight text-white">
                  {card.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {card.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-amber-400">
                  <span>Ouvrir</span>
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}