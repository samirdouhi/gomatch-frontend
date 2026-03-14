import { getAccessToken, getRefreshToken, setAuthTokens, clearAuthTokens } from "./authTokens";

/**
 * On appelle TOUJOURS via Next.js (même origine), puis Next rewrites vers l'API réelle (local ou docker).
 * - Login:   POST /api/auth/login   -> (rewrite) -> {AUTH_API_TARGET}/auth/login
 * - Refresh: POST /api/auth/refresh -> (rewrite) -> {AUTH_API_TARGET}/auth/refresh
 */
const API_BASE = "/api"; // ✅ plus de localhost ici

type TokenResponse = {
  accessToken: string;
  expiresAtUtc: string;
  refreshToken: string;
};

async function refreshSession(): Promise<boolean> {
  const rt = getRefreshToken();
  if (!rt) return false;

  const res = await fetch(`${API_BASE}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: rt }),
  });

  if (!res.ok) return false;

  const data = (await res.json()) as TokenResponse;
  setAuthTokens(data.accessToken, data.expiresAtUtc, data.refreshToken);
  return true;
}

export async function authFetch(path: string, init: RequestInit = {}) {
  const token = getAccessToken();

  const first = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      ...(init.headers ?? {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (first.status !== 401) return first;

  // 401 -> try refresh
  const ok = await refreshSession();
  if (!ok) {
    clearAuthTokens();
    return first;
  }

  // retry with new token
  const newToken = getAccessToken();
  return fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      ...(init.headers ?? {}),
      ...(newToken ? { Authorization: `Bearer ${newToken}` } : {}),
    },
  });
}

export async function logoutRequest() {
  const rt = getRefreshToken();

  if (rt) {
    await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: rt }),
    }).catch(() => {});
  }

  clearAuthTokens();
}
