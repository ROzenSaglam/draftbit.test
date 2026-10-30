import * as React from 'react';
import { Redirect } from 'expo-router';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/lib/supabase';
import Icon from '@/components/Icon';
import { useTheme } from '@/theming/ThemeProvider';

export default function SignInScreen() {
  const { theme } = useTheme();
  const { session, initialized, ensureUserRow, refreshUserData } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [displayName, setDisplayName] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [mode, setMode] = React.useState<'signin' | 'signup'>('signin');

  const handleSubmit = React.useCallback(async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing info', 'Please enter an email and password.');
      return;
    }

    setLoading(true);

    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim().toLowerCase(),
          password,
          options: {
            data: {
              display_name: displayName.trim() || undefined,
            },
          },
        });

        if (error) {
          throw error;
        }

        if (data.user) {
          await ensureUserRow(data.user);
          await refreshUserData();
        }

        if (data.user) {
          await ensureUserRow(data.user);
          await refreshUserData();
        }

        Alert.alert('Account ready', 'Your account was created and your user data was saved. You can keep going if email confirmation is off, or confirm your email first if it is on.');
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password,
        });

        if (error) {
          throw error;
        }

        if (data.user) {
          await ensureUserRow(data.user);
          await refreshUserData();
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong.';
      Alert.alert('Sign-in issue', message);
    } finally {
      setLoading(false);
    }
  }, [displayName, email, mode, password]);

  if (!initialized) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </SafeAreaView>
    );
  }

  if (session) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1 px-6 py-5"
      >
        <View className="flex-1 justify-center gap-6">
          <View className="gap-4">
            <LinearGradient
              colors={[theme.colors.primary, theme.colors.secondary] as [string, string]}
              className="h-20 w-20 items-center justify-center self-center rounded-full"
            >
              <Icon name="Sparkles" size={38} color={theme.colors.primaryForeground} />
            </LinearGradient>
            <View className="gap-2">
              <Text className="text-center text-h1 text-foreground">Welcome to Zappy</Text>
              <Text className="text-center text-base text-muted-foreground">
                Grown-up sign in for your child&apos;s routine, focus, and stars.
              </Text>
            </View>
          </View>

          <View className="gap-3 rounded-3xl border border-border bg-card p-5">
            <View className="self-center rounded-full bg-yellow-200 px-3 py-1">
              <Text className="text-xs font-bold text-yellow-900">Real account</Text>
            </View>

            {mode === 'signup' ? (
              <View className="gap-2">
                <Text className="text-sm font-semibold text-foreground">Parent name</Text>
                <TextInput
                  value={displayName}
                  onChangeText={setDisplayName}
                  placeholder="Jamie"
                  placeholderTextColor={theme.colors.mutedForeground}
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-base text-foreground"
                  autoCapitalize="words"
                />
              </View>
            ) : null}

            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="parent@example.com"
                placeholderTextColor={theme.colors.mutedForeground}
                className="rounded-2xl border border-border bg-background px-4 py-3 text-base text-foreground"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="At least 6 characters"
                placeholderTextColor={theme.colors.mutedForeground}
                className="rounded-2xl border border-border bg-background px-4 py-3 text-base text-foreground"
                secureTextEntry
                autoCapitalize="none"
                autoComplete={mode === 'signup' ? 'new-password' : 'password'}
              />
            </View>

            <Pressable
              onPress={() => {
                void handleSubmit();
              }}
              disabled={loading}
              className="overflow-hidden rounded-2xl"
            >
              <LinearGradient
                colors={[theme.colors.primary, theme.colors.accent] as [string, string]}
                className="items-center justify-center px-4 py-4"
              >
                {loading ? (
                  <ActivityIndicator color={theme.colors.primaryForeground} />
                ) : (
                  <Text className="text-base font-bold text-primary-foreground">
                    {mode === 'signup' ? 'Create account' : 'Sign in'}
                  </Text>
                )}
              </LinearGradient>
            </Pressable>

            <Pressable
              onPress={() => setMode((current) => (current === 'signin' ? 'signup' : 'signin'))}
              className="items-center py-2"
            >
              <Text className="text-sm font-semibold text-primary">
                {mode === 'signin' ? 'Need an account? Create one' : 'Already have an account? Sign in'}
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
