import { PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthBootstrap } from "./AuthBootstrap";
import { AuthGuard } from "./AuthGuard";
import { QueryProvider } from "./QueryProvider";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthBootstrap>
          <QueryProvider>
            <AuthGuard>{children}</AuthGuard>
          </QueryProvider>
        </AuthBootstrap>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
