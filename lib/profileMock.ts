// lib/profileMock.ts

// ✅ Nouveau modèle (UX réaliste)
export type UserGoal = "experience" | "business" | null;

export type MerchantStatus =
  | "None"
  | "Started"
  | "PendingReview"
  | "Approved"
  | "Rejected";

export type MockProfile = {
  // identité
  displayName: string;
  email: string;

  // profil
  phone: string;
  country: string;
  age?: number;
  bio: string;
  photoUrl: string;

  // ✅ NEW: onboarding 1 seule fois (le vrai flag recherché)
  firstLoginOnboardingDone: boolean;

  // ✅ NEW: goal moderne
  goal: UserGoal;

  // ✅ NEW: intérêts (cartes)
  interests: string[];

  // ✅ utile pour business flow futur
  merchantStatus: MerchantStatus;

  // ------------------------------
  // ⚠️ LEGACY (ancienne approche wizard)
  // On les garde pour ne pas casser l’app, mais on ne les utilisera plus.
  // Tu pourras les supprimer après migration totale.
  goalChosen?: boolean;
  profileSetupCompleted?: boolean;
  onboardingCompleted?: boolean;
  setupStepIndex?: number;
  skippedSteps?: string[];
};

const KEY = "gomatch_profile_mock_v3";

// ⚠️ Migration douce : si ton localStorage contient l’ancien v2,
// on “map” ce qu’on peut vers le nouveau modèle.
function migrateV2ToV3(parsed: unknown): Partial<MockProfile> {
  const obj = (typeof parsed === "object" && parsed !== null
    ? (parsed as Record<string, unknown>)
    : null);

  const onboardingIntent = obj?.onboardingIntent;
  const goal =
    onboardingIntent === "Explore"
      ? "experience"
      : onboardingIntent === "HaveBusiness"
        ? "business"
        : null;

  const firstLoginOnboardingDoneValue = obj?.firstLoginOnboardingDone;
  const onboardingCompletedValue = obj?.onboardingCompleted;

  const firstLoginOnboardingDone =
    typeof firstLoginOnboardingDoneValue === "boolean"
      ? firstLoginOnboardingDoneValue
      : !!onboardingCompletedValue;

  const interestsRaw = obj?.interests;
  const interests = Array.isArray(interestsRaw)
    ? interestsRaw.filter((x): x is string => typeof x === "string")
    : [];

  const merchantStatusRaw = obj?.merchantStatus;
  const merchantStatus =
    merchantStatusRaw === "None" ||
    merchantStatusRaw === "Started" ||
    merchantStatusRaw === "PendingReview" ||
    merchantStatusRaw === "Approved" ||
    merchantStatusRaw === "Rejected"
      ? merchantStatusRaw
      : "None";

  return {
    displayName: typeof obj?.displayName === "string" ? obj.displayName : "",
    email: typeof obj?.email === "string" ? obj.email : "",

    phone: typeof obj?.phone === "string" ? obj.phone : "",
    country: typeof obj?.country === "string" ? obj.country : "",
    age: typeof obj?.age === "number" ? obj.age : undefined,
    bio: typeof obj?.bio === "string" ? obj.bio : "",
    photoUrl: typeof obj?.photoUrl === "string" ? obj.photoUrl : "",

    firstLoginOnboardingDone,
    goal: (obj?.goal === "experience" || obj?.goal === "business" || obj?.goal === null)
      ? (obj.goal as UserGoal)
      : goal,

    interests,
    merchantStatus,

    // legacy si présent
    goalChosen: typeof obj?.goalChosen === "boolean" ? obj.goalChosen : undefined,
    profileSetupCompleted:
      typeof obj?.profileSetupCompleted === "boolean" ? obj.profileSetupCompleted : undefined,
    onboardingCompleted:
      typeof obj?.onboardingCompleted === "boolean" ? obj.onboardingCompleted : undefined,
    setupStepIndex: typeof obj?.setupStepIndex === "number" ? obj.setupStepIndex : undefined,
    skippedSteps: Array.isArray(obj?.skippedSteps)
      ? obj!.skippedSteps.filter((x): x is string => typeof x === "string")
      : [],
  };
}

const defaultProfile: MockProfile = {
  displayName: "",
  email: "",

  phone: "",
  country: "",
  age: undefined,
  bio: "",
  photoUrl: "",

  firstLoginOnboardingDone: false,
  goal: null,
  interests: [],

  merchantStatus: "None",

  // legacy
  goalChosen: false,
  profileSetupCompleted: false,
  onboardingCompleted: false,
  setupStepIndex: 0,
  skippedSteps: [],
};

export function getMockProfile(): MockProfile {
  if (typeof window === "undefined") return defaultProfile;

  try {
    const raw = localStorage.getItem(KEY);

    // ✅ si v3 existe => ok
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...defaultProfile, ...parsed };
    }

    // ✅ sinon essayer de lire l’ancien v2 et migrer
    const oldRaw = localStorage.getItem("gomatch_profile_mock_v2");
    if (oldRaw) {
      const oldParsed = JSON.parse(oldRaw);
      const migrated = migrateV2ToV3(oldParsed);

      const merged = { ...defaultProfile, ...migrated };
      localStorage.setItem(KEY, JSON.stringify(merged));
      return merged;
    }

    return defaultProfile;
  } catch {
    return defaultProfile;
  }
}

export function setMockProfile(patch: Partial<MockProfile>) {
  if (typeof window === "undefined") return;
  const current = getMockProfile();
  const next: MockProfile = { ...current, ...patch };
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function resetMockProfile() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
  // on peut aussi nettoyer l'ancien si tu veux plus tard, mais pas maintenant.
}