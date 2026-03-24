import { toApiError } from "@/shared/api/api-error";
import { getMeApi } from "../api/get-me";
import { signInApi } from "../api/sign-in";

import { useAuthStore } from "../store/auth.store";
import type { SignInPayload } from "../types/auth.types";
import {
  clearPersistedAccessToken,
  readPersistedAccessToken,
  writePersistedAccessToken,
} from "./auth-session";

let hydratePromise: Promise<void> | null = null;

export async function hydrateAuth(): Promise<void> {
  const store = useAuthStore.getState();

  if (store.isHydrated) return;
  if (hydratePromise) return hydratePromise;

  hydratePromise = (async () => {
    try {
      const persistedAccessToken = await readPersistedAccessToken();

      if (!persistedAccessToken) {
        useAuthStore.getState().clearSession();
        return;
      }

      useAuthStore.getState().setAccessToken(persistedAccessToken);

      const me = await getMeApi();

      useAuthStore.getState().setSession({
        accessToken: persistedAccessToken,
        user: me,
      });
    } catch (error) {
      await clearPersistedAccessToken();
      useAuthStore.getState().clearSession();
      throw toApiError(error);
    } finally {
      useAuthStore.getState().setHydrated(true);
    }
  })().finally(() => {
    hydratePromise = null;
  });

  return hydratePromise;
}

export async function signInAuth(payload: SignInPayload): Promise<void> {
  useAuthStore.getState().setLoading(true);

  try {
    const response = await signInApi(payload);

    await writePersistedAccessToken(response.accessToken);

    useAuthStore.getState().setSession({
      accessToken: response.accessToken,
      user: response.user,
    });

    useAuthStore.getState().setHydrated(true);
  } catch (error) {
    await clearPersistedAccessToken();
    useAuthStore.getState().clearSession();
    useAuthStore.getState().setHydrated(true);
    throw toApiError(error);
  } finally {
    useAuthStore.getState().setLoading(false);
  }
}

export async function signOutAuth(): Promise<void> {
  useAuthStore.getState().setLoading(true);

  try {
    await clearPersistedAccessToken();
  } finally {
    useAuthStore.getState().clearSession();
    useAuthStore.getState().setHydrated(true);
    useAuthStore.getState().setLoading(false);
  }
}
