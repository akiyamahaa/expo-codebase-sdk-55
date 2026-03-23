import { PropsWithChildren, useEffect } from "react";

import { useAuthStore } from "@/features/auth/store/auth.store";
import {
  registerAccessTokenGetter,
  registerUnauthorizedHandler,
} from "@/shared/api/auth-token";

export function AuthBootstrap({ children }: PropsWithChildren) {
  useEffect(() => {
    registerAccessTokenGetter(() => useAuthStore.getState().accessToken);

    registerUnauthorizedHandler(async () => {
      const { status, signOut } = useAuthStore.getState();

      if (status === "authenticated") {
        await signOut();
      }
    });

    void useAuthStore.getState().hydrate();
  }, []);

  return <>{children}</>;
}
