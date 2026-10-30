# About this app

This file describes this app's stack, structure, and conventions. **Keep it updated**: when the app gains a backend, new conventions, or significant structure, update this file (and the README) so future sessions inherit that knowledge.

## Stack

- Expo cross-platform app (iOS / Android / Web), TypeScript (strict), Expo Router v4 (file-based routing)
- NativeWind v4 (Tailwind for RN) for styling
- React Native Reusables (shadcn-style primitives, `@rn-primitives/*`) as the base component library; build higher-level components on top
- Yarn Berry (v4.x) with **Plug'n'Play** — not classic yarn, no traditional `node_modules`. Patching dependencies is a last resort; use `yarn patch`, never hand-edit.
- React Query available for server state when a backend is wired
- `~/*` aliases the project root (see `tsconfig.json`), e.g. `import { Button } from '~/components/ui/button';`

## Theming (read before touching themes)

Dual layer:
1. `theming/ThemeProvider.tsx` injects theme objects (colors + typography) as CSS variables via NativeWind's `vars()`. Typography is flattened — `h1.fontSize` becomes `--h1-fontSize`. Theme shape lives in `theming/Theme.ts`; concrete themes in `theming/themes/light.ts` and `theming/themes/dark.ts`.
2. `lib/useColorScheme.tsx` syncs the system dark/light preference and is wired into `ThemeProvider` in `app/_layout.tsx`.

Use themes via NativeWind classes (`text-foreground`, `bg-background`, `text-h1`, `border-border`, …) — these resolve to the CSS variables, declared in `tailwind.config.js`. Reach for `useTheme()` only when you need raw theme values. When changing colors/typography, update the theme files — never hardcode per screen. Support both light and dark with readable contrast.

**Zappy's palette:** warm cream background, playful primary blue, coral pink secondary, bright yellow accent. Typography is large and bold — designed for young children (ages 3-8).

## Conventions

- **Icons:** Use the `Icon` component wrapper at `components/Icon.tsx` — `import Icon from '@/components/Icon';` then `<Icon name="Home" size={24} color={theme.colors.foreground} />`. Do NOT import from `lucide-react-native` directly.
- **Portals:** web uses `WebPortalContext` (DOM container); native uses `PortalHost` from `@rn-primitives/portal`. Both are configured in `app/_layout.tsx`, and the primitives in `components/ui/` rely on this — don't bypass it.
- **Fonts:** Google Fonts via `expo-font` config plugin — Outfit (400 regular, 700 bold), declared in `app.config.js`, loaded in `app/_layout.tsx`.
- **Navigation:** set an explicit human-friendly `title` for every screen header — never let route names like `(tabs)` appear in the UI. Keep `app/index.tsx` for redirects, not feature UI; use `_layout.tsx` files for stacks/tabs.
- **Screens:** wrap in SafeAreaView (react-native-safe-area-context) and handle scrolling/gestures correctly. Keep bottom tab bars compact — pad content inside screens, not via `tabBarStyle`.
- **Components:** shared UI in `components/ui/`, layout-level pieces in `components/layout/`. Keep components small and focused; reuse before creating.
- **Performance:** `FlatList`/`SectionList` for long lists — never `ScrollView` + `.map()` for large collections.
- **Gradients:** Use `expo-linear-gradient` for colorful UI elements. Colors prop must be a tuple type `[string, string]` to satisfy TypeScript.

## Critical files

- `app/_layout.tsx` — root layout, theme setup, font loading, portal hosts
- `app/(tabs)/_layout.tsx` — tab navigation with 5 tabs
- `theming/ThemeProvider.tsx` — theme context and CSS-variable injection
- `theming/Theme.ts` — `Theme` interface
- `tailwind.config.js` — NativeWind config, CSS variable declarations, safelist
- `lib/utils.ts` — `cn` helper for class merging
- `global.css` — global CSS and typography classes

## Current state

- Zappy: an app for kids with ADHD (ages 3-8)
- 5 tabs: My Day, Focus, Stars, Calm, Play
- No backend connected — all data is local in-memory state
- Mock/demo data used throughout (stars count, schedule, sessions, badges)
- Breathing animation on Calm screen uses React Native Animated
- Timer on Focus screen uses setInterval with real countdown
- Play screen has 3 mini-games: Animal Tap, Color Dots, Memory Pattern
- Native-only Agora RTC test screen at `app/agora.tsx` for iOS/Android preview
- Agora config comes from app env vars: `EXPO_PUBLIC_AGORA_APP_ID`, optional `EXPO_PUBLIC_AGORA_TOKEN`, optional `EXPO_PUBLIC_AGORA_CHANNEL_NAME`
- Web preview must keep using the Agora placeholder path; live camera/mic/video are for native preview only
