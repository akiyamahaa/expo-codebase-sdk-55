import { useAuthStore } from "@/features/auth/store/auth.store";
import { Redirect } from "expo-router";

export default function IndexPage() {
  const status = useAuthStore((state) => state.status);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  if (!isHydrated || status === "checking") {
    return null;
  }

  if (status === "authenticated") {
    return <Redirect href="/(protected)/(tabs)" />;
  }

  return <Redirect href="/(public)/sign-in" />;
}
