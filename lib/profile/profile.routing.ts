// src/lib/profile/profile.routing.ts
import { authFetch } from "../authApi";
import { getAccessToken } from "../authTokens";
import { jwtDecode } from "jwt-decode";

type ProfileRouteResponse = {
  inscriptionTerminee?: boolean;
  InscriptionTerminee?: boolean;
  firstLoginOnboardingDone?: boolean;
  onboardingCompleted?: boolean;
};

type DecodedJwt = {
  roles?: string[] | string;
  role?: string[] | string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?:
    | string[]
    | string;
};

function normalizeRoles(value: string[] | string | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function getRolesFromToken(token: string): string[] {
  try {
    const decoded = jwtDecode<DecodedJwt>(token);

    const roles = [
      ...normalizeRoles(decoded.roles),
      ...normalizeRoles(decoded.role),
      ...normalizeRoles(
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      ),
    ];

    return [...new Set(roles.filter(Boolean))];
  } catch {
    return [];
  }
}

function getProfileEndpointFromRoles(roles: string[]): string {
  if (roles.includes("Admin")) {
    return "/admin-profile/me";
  }

  if (roles.includes("Merchant")) {
    return "/commercant-profile/me";
  }

  return "/profile/me";
}

function getDashboardRouteFromRoles(roles: string[]): string {
  if (roles.includes("Admin")) {
    return "/admin";
  }

  if (roles.includes("Merchant")) {
    return "/merchant/dashboard";
  }

  return "/dashboard";
}

export async function getFirstRoute(): Promise<string> {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return "/signin";
  }

  const roles = getRolesFromToken(accessToken);
  const profileEndpoint = getProfileEndpointFromRoles(roles);
  const dashboardRoute = getDashboardRouteFromRoles(roles);

  try {
    const res = await authFetch(profileEndpoint, {
      method: "GET",
      cache: "no-store",
    });

    if (res.status === 404) {
      return "/onboarding";
    }

    if (res.status === 401 || res.status === 403) {
      return "/signin";
    }

    if (!res.ok) {
      return "/onboarding";
    }

    const profile = (await res.json()) as ProfileRouteResponse;

    const onboardingDone =
      profile.inscriptionTerminee ??
      profile.InscriptionTerminee ??
      profile.firstLoginOnboardingDone ??
      profile.onboardingCompleted ??
      false;

    if (!onboardingDone) {
      return "/onboarding";
    }

    return dashboardRoute;
  } catch {
    return "/signin";
  }
}