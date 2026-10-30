import * as React from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/components/auth/AuthProvider';
import { useTheme } from '@/theming/ThemeProvider';
import Icon from '@/components/Icon';

export default function MyDayScreen() {
  const { theme } = useTheme();
  const { appUser, profile, signOut } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ padding: 20, gap: 20 }}>
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.secondary] as [string, string]}
          className="rounded-[28px] p-6"
        >
          <View className="gap-3">
            <View className="flex-row items-center justify-between">
              <View className="rounded-full bg-white/25 px-3 py-1">
                <Text className="text-xs font-bold text-primary-foreground">Signed in</Text>
              </View>
              <Icon name="BadgeCheck" size={24} color={theme.colors.primaryForeground} />
            </View>
            <Text className="text-h2 text-primary-foreground">
              Hi {appUser?.display_name || profile?.name || 'there'}
            </Text>
            <Text className="text-base text-primary-foreground/90">
              Your account is connected. Zappy can now load the child profile tied to this user.
            </Text>
          </View>
        </LinearGradient>

        <View className="gap-4 rounded-[28px] border border-border bg-card p-5">
          <Text className="text-lg font-bold text-foreground">Account details</Text>

          <View className="gap-3">
            <View className="rounded-2xl bg-background p-4">
              <Text className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Email</Text>
              <Text className="mt-1 text-base text-foreground">{appUser?.email ?? 'Not available'}</Text>
            </View>
            <View className="rounded-2xl bg-background p-4">
              <Text className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Linked child profile</Text>
              <Text className="mt-1 text-base text-foreground">{profile?.name ?? 'No profile linked yet'}</Text>
            </View>
            <View className="rounded-2xl bg-background p-4">
              <Text className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Stars</Text>
              <Text className="mt-1 text-base text-foreground">{profile?.star_balance ?? 0} / {profile?.star_goal ?? 0}</Text>
            </View>
          </View>

          <Pressable
            onPress={() => {
              void signOut();
            }}
            className="items-center rounded-2xl border border-border px-4 py-4"
          >
            <Text className="text-base font-bold text-foreground">Sign out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
