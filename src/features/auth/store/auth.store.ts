import { storageKeys } from "@/shared/constants/storage";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { signInApi } from "../api/sign-in";
import type { AuthStatus, SignInPayload, User } from "../types/auth.types";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  status: AuthStatus;
  isHydrated: boolean;
  isLoading: boolean;
  hydrate: () => Promise<void>;
  signIn: (payload: SignInPayload) => Promise<void>;
  signOut: () => Promise<void>;
}

async function clearPersistedAuth() {
  await Promise.all([
    SecureStore.deleteItemAsync(storageKeys.accessToken),
    SecureStore.deleteItemAsync(storageKeys.user),
  ]);
}

function safeParseUser(rawUser: string | null): User | null {
  if (!rawUser) return null;

  try {
    const parsed = JSON.parse(rawUser) as Partial<User>;

    if (
      typeof parsed?.id === "string" &&
      typeof parsed?.email === "string" &&
      typeof parsed?.name === "string" &&
      Array.isArray(parsed?.roles)
    ) {
      return {
        id: parsed.id,
        email: parsed.email,
        name: parsed.name,
        avatarUrl: parsed.avatarUrl ?? null,
        roles: parsed.roles,
      };
    }

    return null;
  } catch {
    return null;
  }
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  status: "checking",
  isHydrated: false,
  isLoading: false,

  hydrate: async () => {
    if (get().isHydrated) return;

    try {
      const [accessToken, rawUser] = await Promise.all([
        SecureStore.getItemAsync(storageKeys.accessToken),
        SecureStore.getItemAsync(storageKeys.user),
      ]);

      const user = safeParseUser(rawUser);

      if (accessToken && user) {
        set({
          accessToken,
          user,
          status: "authenticated",
        });
      } else {
        await clearPersistedAuth();
        set({
          accessToken: null,
          user: null,
          status: "unauthenticated",
        });
      }
    } catch {
      try {
        await clearPersistedAuth();
      } catch {}

      set({
        accessToken: null,
        user: null,
        status: "unauthenticated",
      });
    } finally {
      set({ isHydrated: true });
    }
  },

  signIn: async (payload) => {
    set({ isLoading: true });

    try {
      const response = await signInApi(payload);

      await Promise.all([
        SecureStore.setItemAsync(storageKeys.accessToken, response.accessToken),
        SecureStore.setItemAsync(
          storageKeys.user,
          JSON.stringify(response.user)
        ),
      ]);

      set({
        accessToken: response.accessToken,
        user: response.user,
        status: "authenticated",
      });
    } finally {
      set({ isLoading: false, isHydrated: true });
    }
  },

  signOut: async () => {
    set({ isLoading: true });

    try {
      await clearPersistedAuth();
    } finally {
      set({
        accessToken: null,
        user: null,
        status: "unauthenticated",
        isLoading: false,
        isHydrated: true,
      });
    }
  },
}));
