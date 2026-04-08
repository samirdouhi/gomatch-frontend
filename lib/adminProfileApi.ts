import { authFetch } from "@/lib/authApi";

type ApiObject = Record<string, unknown>;

export type AdminCommercantItem = {
  id: string;
  userId: string;
  status: string;
  rejectionReason: string;
  reviewedAt: string | null;
};

export type AdminCommercantDetail = {
  userProfile: {
    prenom: string;
    nom: string;
    dateNaissance: string;
    genre: string;
    langue: string;
    photoUrl: string;
  };
  nomResponsable: string;
  telephone: string;
  emailProfessionnel: string;
  ville: string;
  adresseProfessionnelle: string;
  typeActivite: string;
  status: string;
  rejectionReason: string;
  submittedAt: string | null;
  reviewedAt: string | null;
  commerceId: string | null;
  inscriptionTerminee: boolean;
};

const ADMIN_PROFILE_API = "/admin-profile";

function pickString(obj: ApiObject, keys: string[]): string {
  for (const key of keys) {
    const value = obj[key];
    if (typeof value === "string") return value;
  }
  return "";
}

function pickNullableString(obj: ApiObject, keys: string[]): string | null {
  for (const key of keys) {
    const value = obj[key];
    if (typeof value === "string") return value;
  }
  return null;
}

function pickBoolean(obj: ApiObject, keys: string[]): boolean {
  for (const key of keys) {
    const value = obj[key];
    if (typeof value === "boolean") return value;
  }
  return false;
}

function normalizeNetworkError(error: unknown): never {
  if (error instanceof Error) {
    if (error.message === "Failed to fetch") {
      throw new Error("Impossible de contacter le serveur (Gateway/ProfileService).");
    }

    throw error;
  }

  throw new Error("Erreur réseau inconnue.");
}

async function readError(res: Response): Promise<string> {
  try {
    const data = (await res.json()) as ApiObject;
    return (
      pickString(data, ["message", "Message"]) ||
      pickString(data, ["error", "Error"]) ||
      pickString(data, ["title", "Title"]) ||
      `HTTP ${res.status}`
    );
  } catch {
    return `HTTP ${res.status}`;
  }
}

function mapListItem(raw: ApiObject): AdminCommercantItem {
  return {
    id: pickString(raw, ["id", "Id"]),
    userId: pickString(raw, ["userId", "UserId"]),
    status: pickString(raw, ["status", "Status"]),
    rejectionReason: pickString(raw, ["rejectionReason", "RejectionReason"]),
    reviewedAt: pickNullableString(raw, ["reviewedAt", "ReviewedAt"]),
  };
}

function mapDetail(raw: ApiObject): AdminCommercantDetail {
  const userProfileRaw =
    raw.userProfile && typeof raw.userProfile === "object"
      ? (raw.userProfile as ApiObject)
      : {};

  return {
    userProfile: {
      prenom: pickString(userProfileRaw, ["prenom", "Prenom"]),
      nom: pickString(userProfileRaw, ["nom", "Nom"]),
      dateNaissance: pickString(userProfileRaw, ["dateNaissance", "DateNaissance"]),
      genre: pickString(userProfileRaw, ["genre", "Genre"]),
      langue: pickString(userProfileRaw, ["langue", "Langue"]),
      photoUrl: pickString(userProfileRaw, ["photoUrl", "PhotoUrl"]),
    },
    nomResponsable: pickString(raw, ["nomResponsable", "NomResponsable"]),
    telephone: pickString(raw, ["telephone", "Telephone"]),
    emailProfessionnel: pickString(raw, ["emailProfessionnel", "EmailProfessionnel"]),
    ville: pickString(raw, ["ville", "Ville"]),
    adresseProfessionnelle: pickString(raw, ["adresseProfessionnelle", "AdresseProfessionnelle"]),
    typeActivite: pickString(raw, ["typeActivite", "TypeActivite"]),
    status: pickString(raw, ["status", "Status"]),
    rejectionReason: pickString(raw, ["rejectionReason", "RejectionReason"]),
    submittedAt: pickNullableString(raw, ["submittedAt", "SubmittedAt"]),
    reviewedAt: pickNullableString(raw, ["reviewedAt", "ReviewedAt"]),
    commerceId: pickNullableString(raw, ["commerceId", "CommerceId"]),
    inscriptionTerminee: pickBoolean(raw, ["inscriptionTerminee", "InscriptionTerminee"]),
  };
}

export async function getPendingCommercants(): Promise<AdminCommercantItem[]> {
  try {
    const res = await authFetch(`${ADMIN_PROFILE_API}/commercants/pending`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(await readError(res));
    }

    const data = (await res.json()) as unknown;
    if (!Array.isArray(data)) return [];

    return data.map((item) => mapListItem((item ?? {}) as ApiObject));
  } catch (error: unknown) {
    normalizeNetworkError(error);
  }
}

export async function getCommercantDetail(
  id: string
): Promise<AdminCommercantDetail> {
  try {
    const res = await authFetch(`${ADMIN_PROFILE_API}/commercants/${id}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(await readError(res));
    }

    const data = (await res.json()) as ApiObject;
    return mapDetail(data);
  } catch (error: unknown) {
    normalizeNetworkError(error);
  }
}

export async function approveCommercant(id: string): Promise<void> {
  try {
    const res = await authFetch(`${ADMIN_PROFILE_API}/commercants/${id}/approve`, {
      method: "POST",
    });

    if (!res.ok) {
      throw new Error(await readError(res));
    }
  } catch (error: unknown) {
    normalizeNetworkError(error);
  }
}

export async function rejectCommercant(
  id: string,
  rejectionReason: string
): Promise<void> {
  try {
    const res = await authFetch(`${ADMIN_PROFILE_API}/commercants/${id}/reject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "Rejected",
        rejectionReason,
      }),
    });

    if (!res.ok) {
      throw new Error(await readError(res));
    }
  } catch (error: unknown) {
    normalizeNetworkError(error);
  }
}