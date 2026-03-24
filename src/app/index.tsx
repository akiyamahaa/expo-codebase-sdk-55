import { useAuthStore } from "@/features/auth/store/auth.store";
import { Redirect } from "expo-router";

export default function IndexPage() {
  const status = useAuthStore((state) => {
    return state.status;
  });
  const isHydrated = useAuthStore((state) => {
    return state.isHydrated;
  });
  console.log("🚀 ~ IndexPage ~ status:", status);
  console.log("🚀 ~ IndexPage ~ isHydrated:", isHydrated);

  if (!isHydrated || status === "checking") {
    return null;
  }

  if (status === "authenticated") {
    return <Redirect href="/(protected)/(tabs)" />;
  }

  return <Redirect href="/(public)/sign-in" />;
}
