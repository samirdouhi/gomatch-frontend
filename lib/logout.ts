

import { clearAuthTokens, getRefreshToken, getAccessToken } from "./authTokens";

export async function logout() {
  const rt = getRefreshToken();
  if (rt) {
    await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(getAccessToken() ? { Authorization: `Bearer ${getAccessToken()}` } : {}),
      },
      body: JSON.stringify({ refreshToken: rt }),
    }).catch(() => {});
  }
  clearAuthTokens();
}