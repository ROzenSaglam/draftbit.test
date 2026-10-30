import '@/global.css';
import '@/lib/nativewindInterop';

import { Stack } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider, useTheme } from '@/theming/ThemeProvider';
import { AuthProvider, useAuth } from '@/components/auth/AuthProvider';
import { useColorScheme } from '@/lib/useColorScheme';
import darkTheme from '@/theming/themes/dark';
import lightTheme from '@/theming/themes/light';
import '@/appearance-polyfill';

export { ErrorBoundary } from 'expo-router';

function RootStack() {
  const { isDarkColorScheme } = useColorScheme();
  const { theme, setTheme } = useTheme();
  const { initialized, session } = useAuth();

  React.useEffect(() => {
    const nextTheme = isDarkColorScheme ? 'dark' : 'light';
    if (theme.name !== nextTheme) {
      setTheme(nextTheme);
    }
  }, [isDarkColorScheme, setTheme, theme.name]);

  if (!initialized) {
    return <ActivityIndicator size="large" color={theme.colors.primary} />;
  }

  return (
    <>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!session}>
          <Stack.Screen name="sign-in" />
        </Stack.Protected>
        <Stack.Protected guard={!!session}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <GestureHandlerRootView className="flex-1">
      <ThemeProvider
        initialThemeName={isDarkColorScheme ? 'dark' : 'light'}
        themes={[lightTheme, darkTheme]}>
        <AuthProvider>
          <RootStack />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
