import {
  getAccessToken,
  getRefreshToken,
  setAuthTokens,
  clearAuthTokens,
} from "./authTokens";

const GATEWAY_BASE = process.env.NEXT_PUBLIC_GATEWAY_BASE_URL;

type TokenResponse = {
  accessToken: string;
  expiresAtUtc: string;
  refreshToken: string;
};

let refreshPromise: Promise<boolean> | null = null;

function getGatewayBase(): string {
  if (!GATEWAY_BASE) {
    throw new Error("NEXT_PUBLIC_GATEWAY_BASE_URL is not defined");
  }

  return GATEWAY_BASE.replace(/\/+$/, "");
}

function buildUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const base = getGatewayBase();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

async function refreshSession(): Promise<boolean> {
  const rt = getRefreshToken();
  if (!rt) return false;

  const res = await fetch(buildUrl("/api/auth/refresh"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: rt }),
  });

  if (!res.ok) return false;

  const data = (await res.json()) as TokenResponse;

  if (!data.accessToken || !data.expiresAtUtc) {
    return false;
  }

  setAuthTokens(data.accessToken, data.expiresAtUtc, data.refreshToken);
  return true;
}

async function ensureRefreshed(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = refreshSession().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

function mergeHeaders(
  initHeaders: RequestInit["headers"],
  token?: string | null
): Headers {
  const headers = new Headers(initHeaders ?? undefined);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return headers;
}

export async function authFetch(path: string, init: RequestInit = {}) {
  const url = buildUrl(path);
  const token = getAccessToken();

  const first = await fetch(url, {
    ...init,
    headers: mergeHeaders(init.headers, token),
  });

  if (first.status !== 401) {
    return first;
  }

  const ok = await ensureRefreshed();

  if (!ok) {
    clearAuthTokens();
    return first;
  }

  const newToken = getAccessToken();

  return fetch(url, {
    ...init,
    headers: mergeHeaders(init.headers, newToken),
  });
}

export async function logoutRequest() {
  const rt = getRefreshToken();

  if (rt) {
    await fetch(buildUrl("/api/auth/logout"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: rt }),
    }).catch(() => {});
  }

  clearAuthTokens();
}