import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getMockProfile } from "./profileMock";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ✅ Redirection globale (front-only)
export function getFirstRoute(): string {
  const p = getMockProfile();
  if (!p.goalChosen) return "/onboarding/goal";
  if (!p.profileSetupCompleted) return "/onboarding/steps";
  return "/dashboard";
}


