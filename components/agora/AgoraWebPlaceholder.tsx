import React from 'react';
import { Link } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '@/components/Icon';
import { useTheme } from '@/theming/ThemeProvider';

export default function AgoraWebPlaceholder() {
  const { theme } = useTheme();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, paddingBottom: 48 }}>
        <Text className="text-h4 text-foreground">Agora call test</Text>
        <Text className="mt-2 text-sm text-muted-foreground">
          Agora video needs iOS or Android native preview. Web stays on this safe placeholder screen.
        </Text>

        <LinearGradient
          colors={[theme.colors.primary, theme.colors.secondary] as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 28, padding: 20, marginTop: 20 }}>
          <View className="flex-row items-center gap-3">
            <View className="h-14 w-14 items-center justify-center rounded-full bg-white/20">
              <Icon name="MonitorSmartphone" size={28} color="#FFFFFF" strokeWidth={2.5} />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-white">Open native preview</Text>
              <Text className="mt-1 text-sm text-white/90">
                Your live camera, mic, and remote video appear in native preview only.
              </Text>
            </View>
          </View>
        </LinearGradient>

        <View className="mt-5 overflow-hidden rounded-[28px] border border-border bg-card">
          <View className="h-72 items-center justify-center bg-black px-6">
            <Icon name="VideoOff" size={40} color="#FFFFFF" />
            <Text className="mt-4 text-center text-base font-bold text-white">Web preview is protected</Text>
            <Text className="mt-2 text-center text-sm text-white/80">
              This keeps the app stable on web while the real Agora screen runs in native preview.
            </Text>
          </View>
        </View>

        <View className="mt-5 rounded-[28px] border border-dashed border-border bg-background p-5">
          <Text className="text-base font-bold text-foreground">What to set</Text>
          <Text className="mt-3 text-sm leading-6 text-muted-foreground">
            Add EXPO_PUBLIC_AGORA_APP_ID, optional EXPO_PUBLIC_AGORA_TOKEN, and optional EXPO_PUBLIC_AGORA_CHANNEL_NAME in app environment variables before testing in native preview.
          </Text>
          <Link href="/(tabs)/play" asChild>
            <Pressable className="mt-4 self-start rounded-full border border-border px-4 py-3">
              <Text className="text-sm font-bold text-foreground">Back to the app</Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
