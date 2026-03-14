const ACCESS_KEY = "gomatch_access_token";
const REFRESH_KEY = "gomatch_refresh_token";
const EXPIRES_KEY = "gomatch_expiresAtUtc";

export function setAuthTokens(accessToken: string, expiresAtUtc: string, refreshToken?: string) {
  localStorage.setItem(ACCESS_KEY, accessToken);
  localStorage.setItem(EXPIRES_KEY, expiresAtUtc);

  if (refreshToken) {
    localStorage.setItem(REFRESH_KEY, refreshToken);
  }

  // update UI same tab
  window.dispatchEvent(new Event("gomatch-auth-changed"));
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}

export function clearAuthTokens() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXPIRES_KEY);

  // update UI same tab
  window.dispatchEvent(new Event("gomatch-auth-changed"));
}