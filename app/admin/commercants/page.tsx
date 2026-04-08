"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  getPendingCommercants,
  type AdminCommercantItem,
} from "@/lib/adminProfileApi";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Erreur de chargement.";
}

function isUnauthorizedError(error: unknown): boolean {
  const message = getErrorMessage(error);
  return message.includes("401") || message.toLowerCase().includes("unauthorized");
}

export default function AdminCommercantsPage() {
  const router = useRouter();

  const [items, setItems] = useState<AdminCommercantItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadPendingCommercants() {
      try {
        const data = await getPendingCommercants();

        if (!mounted) return;
        setItems(data);
      } catch (err: unknown) {
        if (!mounted) return;

        if (isUnauthorizedError(err)) {
          router.replace("/signin");
          return;
        }

        setError(getErrorMessage(err));
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadPendingCommercants();

    return () => {
      mounted = false;
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0b0d14] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-400">
              Admin
            </p>
            <h1 className="mt-2 text-3xl font-black uppercase italic tracking-tight">
              Demandes commerçants
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Liste des profils commerçants en attente de validation.
            </p>
          </div>

          <Link
            href="/admin"
            className="rounded-2xl border border-white/10 px-4 py-2 text-xs uppercase tracking-widest text-slate-300 transition hover:bg-white/10"
          >
            Dashboard
          </Link>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
          {loading ? (
            <div className="py-10 text-center text-slate-400">
              Chargement...
            </div>
          ) : error ? (
            <div className="py-10 text-center text-red-400">{error}</div>
          ) : items.length === 0 ? (
            <div className="py-10 text-center text-slate-400">
              Aucune demande commerçant en attente.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-[0.2em] text-slate-500">
                    <th className="px-4 py-2">UserId</th>
                    <th className="px-4 py-2">Statut</th>
                    <th className="px-4 py-2">Review date</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr
                      key={item.id}
                      className="transition hover:bg-white/[0.05] bg-white/[0.03]"
                    >
                      <td className="px-4 py-4 text-sm text-slate-300">
                        {item.userId}
                      </td>

                      <td className="px-4 py-4 text-sm text-slate-300">
                        {item.status || "-"}
                      </td>

                      <td className="px-4 py-4 text-sm text-slate-300">
                        {item.reviewedAt
                          ? new Date(item.reviewedAt).toLocaleString()
                          : "-"}
                      </td>

                      <td className="px-4 py-4">
                        <Link
                          href={`/admin/commercants/${item.id}`}
                          className="inline-flex rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 text-sm font-black uppercase tracking-widest text-black transition hover:scale-105"
                        >
                          Voir détail
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}