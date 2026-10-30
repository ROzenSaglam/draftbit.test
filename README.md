# Zappy — A Fun Daily Helper for Kids with ADHD

Zappy is a playful, supportive app built for kids aged 3-8 with ADHD. It helps children build routines, stay focused, earn rewards, practice calm-down techniques, and play sensory-friendly games — all with bright colors, big buttons, and encouraging language.

## Features

- **My Day** — Visual daily schedule with mood check-in and progress tracking
- **Focus Timer** — Kid-friendly visual timer with task labels and presets
- **Stars** — Reward system with stars, badges, and a prize shop
- **Calm** — Guided breathing exercises, calming sounds, and gentle movements
- **Play** — Sensory games including Animal Tap, Color Dots, and Memory Pattern
- **Agora test screen** — Native-only video call test route for iOS/Android preview using `react-native-agora`

## Tech stack

- Expo SDK 54 and React Native 0.81
- Expo Router v4 (file-based routing)
- NativeWind v4 / Tailwind-style utility classes
- TypeScript (strict) with `~/*` path aliases
- Light/dark theming through shared theme tokens
- React Native Reusables (`@rn-primitives/*`) as base component library
- `expo-linear-gradient` for playful gradient UI elements

## Getting started

Use Node.js 20+.

```bash
npm install
npx expo start -c
```

Useful commands:

```bash
npm run lint
npm run typecheck
npx expo export --platform web
```

## Project structure

```text
app/                    Expo Router routes and layouts
app/(tabs)/             Main tab screens (My Day, Focus, Stars, Calm, Play)
components/             Reusable UI components
components/ui/          Primitives from @rn-primitives
components/forms/       Form controls and inputs
components/layout/      Layout primitives
theming/                Theme system (light/dark themes, provider)
lib/                    Utility helpers (colors, cn)
assets/                 Images, icons, fonts, animations
```

## Current state

- Fully functional frontend with mock data and local state
- Supabase backend connected for account sign-in and user/profile linkage
- All 5 tabs implemented with interactive features
- Breathing exercise has animated visual feedback
- Timer runs with real countdown and task selection
- Theme supports light and dark mode with warm, kid-friendly palette
- `app/agora.tsx` is available as a native-preview test screen for Agora RTC
- Agora requires environment variables: `EXPO_PUBLIC_AGORA_APP_ID`, optional `EXPO_PUBLIC_AGORA_TOKEN`, and optional `EXPO_PUBLIC_AGORA_CHANNEL_NAME`
- Web preview intentionally shows a placeholder instead of live Agora video to keep the preview stable

## Customizing

1. Update `app.config.js` with final app name, slug, and platform settings
2. Connect additional screens to Supabase data beyond the signed-in user/profile flow
3. Customize theme in `theming/themes/light.ts` and `dark.ts`
4. Add sound files for the Calm screen's calming sounds feature
