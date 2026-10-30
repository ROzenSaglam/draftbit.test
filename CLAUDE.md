# CLAUDE.md — Draftbit Digital wallet App Template

This file gives AI assistants and maintainers guidance for working in this Draftbit App Template.

## Project overview

Walley is a Draftbit App Template for balances, cards, transactions, transfers, analytics, and wallet profile flows. Treat this repository as a reusable Draftbit-owned template, not as a one-off app or a third-party marketplace package. Keep copy, documentation, and implementation decisions generic enough for customers to customize.

## Current baseline

- **Framework:** Expo SDK 54 / React Native 0.81
- **Navigation:** Expo Router with file-based routes and native tabs/drawers where applicable
- **Web:** Metro web bundling and `expo export --platform web`
- **Styling:** NativeWind v4 with shared theme tokens
- **Language:** TypeScript
- **Data:** Mock/local data unless a template-specific integration is explicitly present
- **Icons/media:** Lucide React Native plus app-specific assets and animations

## Commands

```bash
npm install
npm run lint
npm run typecheck
npx expo export --platform web
npx expo-doctor
npx expo start -c
```

If `npm run typecheck` reports pre-existing template debt, document it in the PR and avoid introducing new type errors.

## Repository conventions

- This is a Draftbit App Template. Do not add third-party seller credits, prior source ownership references, purchase/redistribution language, or app-store marketing copy that implies a non-Draftbit owner.
- Keep README/CLAUDE/AGENTS documentation aligned with the current Expo SDK, web support, and navigation approach.
- Keep template content backend-agnostic unless the repository intentionally demonstrates a specific integration.
- Use `@/*` imports for project-root paths when available.
- Preserve web compatibility when touching native modules; add `.web.tsx` shims or platform-specific files where needed.
- Prefer Expo-managed packages and versions compatible with SDK 54.

## Styling and theming rules

1. Prefer themed components and shared tokens over raw `Text`/hardcoded colors.
2. Use `theming/ThemeProvider.tsx`, `theming/themes/*`, and `tailwind.config.js` as the source of truth for colors.
3. Prefer base-style tokens such as `foreground`, `primary`, `secondary`, `accent`, `muted`, and `card` over legacy alias classes.
4. Validate both light and dark modes when changing colors, tab bars, headers, cards, or form controls.
5. Be careful with safe areas and Android edge-to-edge behavior when changing root layouts or tab bars.

## Navigation and platform notes

- Routes live under `app/`; screens and modal flows are usually under `app/screens`.
- Tab/drawer layouts should preserve the intended template UX on iOS, Android, and web.
- Avoid placeholder tab routes that behave differently on direct navigation unless documented.
- Prefer Expo Router `Stack.Screen` and `Tabs.Screen` options for native headers, titles, and right actions. Use the in-screen `Header` component only when a screen needs a custom embedded header that cannot be expressed through router options.
- For platform-specific native dependencies, prefer `Component.native.tsx` / `Component.web.tsx` files over runtime `require()` patterns that may bundle native code into web.

## PR validation checklist

Before merging template changes, run or document why you could not run:

- `npm run lint`
- `npm run typecheck`
- `npx expo export --platform web`
- `npx expo-doctor`
- Native smoke test for changes involving maps, media, audio, navigation bars, permissions, or Android edge-to-edge behavior
