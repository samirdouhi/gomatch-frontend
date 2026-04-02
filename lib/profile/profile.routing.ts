// src/lib/profile/profile.routing.ts
import { authFetch } from "../authApi";

type ProfileRouteResponse = {
  inscriptionTerminee?: boolean;
  InscriptionTerminee?: boolean;
  firstLoginOnboardingDone?: boolean;
  onboardingCompleted?: boolean;
};

export async function getFirstRoute(params?: { registered?: boolean }) {
  const registered = !!params?.registered;

  try {
    const res = await authFetch("/profile/me", {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      return registered ? "/onboarding" : "/dashboard";
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

    return "/dashboard";
  } catch {
    return registered ? "/onboarding" : "/dashboard";
  }
}