// src/lib/profile/profile.routing.ts

import { getMockProfile } from "@/lib/profileMock";

export function getFirstRoute(params?: { registered?: boolean }) {
  const profile = getMockProfile();
  const registered = !!params?.registered;

  // ✅ onboarding seulement si c'est un "nouveau" et pas encore fait
  if (registered && !profile.firstLoginOnboardingDone) {
    return "/onboarding";
  }

  return "/dashboard";
}