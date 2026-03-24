// app.config.ts
import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,

  name: "my-expo-app",
  slug: "my-expo-app",
  version: "1.0.0",
  orientation: "portrait",

  icon: "./assets/images/systems/icon.png",
  scheme: "myexpoapp",

  userInterfaceStyle: "automatic",

  ios: {
    icon: "./assets/expo.icon",
    bundleIdentifier: "com.aki.yourapp",
    supportsTablet: false,
  },

  android: {
    package: "com.aki.yourapp",
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/images/systems/android-icon-foreground.png",
      backgroundImage: "./assets/images/systems/android-icon-background.png",
      monochromeImage: "./assets/images/systems/android-icon-monochrome.png",
    },
    predictiveBackGestureEnabled: false,
  },

  web: {
    output: "static",
    favicon: "./assets/images/systems/favicon.png",
    bundler: "metro",
  },

  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#208AEF",
        android: {
          image: "./assets/images/systems/splash-icon.png",
          imageWidth: 76,
        },
      },
    ],
    [
      "expo-secure-store",
      {
        configureAndroidBackup: true,
      },
    ],
  ],

  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    APP_ENV: process.env.EXPO_PUBLIC_APP_ENV ?? "development",
    API_URL: process.env.EXPO_PUBLIC_API_URL ?? "https://api.example.com",
  },
});
