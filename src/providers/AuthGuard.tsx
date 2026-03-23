import { useAuthStore } from "@/features/auth/store/auth.store";
import { router, useSegments } from "expo-router";
import { PropsWithChildren, useEffect } from "react";

export function AuthGuard({ children }: PropsWithChildren) {
  const segments = useSegments();

  const status = useAuthStore((state) => state.status);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  useEffect(() => {
    if (!isHydrated || status === "checking") return;

    const rootGroup = segments[0];
    const inPublicGroup = rootGroup === "(public)";
    const inProtectedGroup = rootGroup === "(protected)";

    if (status === "authenticated" && inPublicGroup) {
      router.replace("/(protected)/(tabs)");
      return;
    }

    if (status === "unauthenticated" && inProtectedGroup) {
      router.replace("/(public)/sign-in");
    }
  }, [segments, status, isHydrated]);

  if (!isHydrated || status === "checking") {
    return null;
  }

  return <>{children}</>;
}
