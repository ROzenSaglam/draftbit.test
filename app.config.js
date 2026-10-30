module.exports = {
  android: {
    adaptiveIcon: { foregroundImage: "./assets/adaptive-icon.png", backgroundColor: "#FFF9F0" },
    softwareKeyboardLayoutMode: "pan",
    predictiveBackGestureEnabled: false,
    edgeToEdgeEnabled: true,
    package: "com.draftbit.newapp",
    versionCode: 1
  },
  assetBundlePatterns: ["**/*"],
  experiments: { tsconfigPaths: true, typedRoutes: true },
  extra: { router: { origin: false }, eas: { projectId: "ed7b0ea7-7597-471f-acf4-e2aa25d7950d" } },
  icon: "./assets/icon.png",
  ios: { supportsTablet: true, bundleIdentifier: "com.draftbit.newapp", buildNumber: "1" },
  name: "Zappy",
  newArchEnabled: true,
  orientation: "portrait",
  owner: "thomino",
  platforms: ["ios", "android", "web"],
  plugins: [
  "expo-font",
  "expo-asset",
  "expo-web-browser",

  [
  "expo-router",
  {


  }]],




  runtimeVersion: "1.0.0",
  scheme: "zappy",
  slug: "zappy",
  splash: { image: "./assets/splash.png", resizeMode: "contain", backgroundColor: "#FFF9F0" },
  updates: { url: "https://u.expo.dev/ed7b0ea7-7597-471f-acf4-e2aa25d7950d" },
  userInterfaceStyle: "automatic",
  version: "1.0.0",
  web: { bundler: "metro", output: "single", favicon: "./assets/favicon.png" }
};
