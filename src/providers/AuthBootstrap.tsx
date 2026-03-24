import { PropsWithChildren, useEffect } from "react";

import { hydrateAuth, signOutAuth } from "@/features/auth/lib/auth-actions";
import { useAuthStore } from "@/features/auth/store/auth.store";
import {
  registerAccessTokenGetter,
  registerUnauthorizedHandler,
} from "@/shared/api/auth-token";

export function AuthBootstrap({ children }: PropsWithChildren) {
  useEffect(() => {
    registerAccessTokenGetter(() => useAuthStore.getState().accessToken);

    registerUnauthorizedHandler(async () => {
      const { status } = useAuthStore.getState();

      if (status === "authenticated") {
        await signOutAuth();
      }
    });

    void hydrateAuth();
  }, []);

  return <>{children}</>;
}
