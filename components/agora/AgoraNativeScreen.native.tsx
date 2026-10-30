import React, { useMemo } from 'react';
import { Link } from 'expo-router';
import { Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '@/components/Icon';
import { useTheme } from '@/theming/ThemeProvider';
import { useAgoraRtc } from '@/lib/agora/useAgoraRtc';

const APP_ID = process.env.EXPO_PUBLIC_AGORA_APP_ID ?? '';
const CHANNEL_NAME = process.env.EXPO_PUBLIC_AGORA_CHANNEL_NAME ?? 'zappy-room';
const TOKEN = process.env.EXPO_PUBLIC_AGORA_TOKEN ?? null;

function StatusPill({ label, tone }: { label: string; tone: 'blue' | 'green' | 'red' | 'yellow' }) {
  const tones = {
    blue: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-200',
    green: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200',
    red: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-200',
    yellow: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200',
  } as const;

  return <Text className={`rounded-full px-3 py-1 text-xs font-bold ${tones[tone]}`}>{label}</Text>;
}

export default function AgoraScreen() {
  const { theme } = useTheme();
  const { isSupported, state, error, remoteUsers, LocalVideoView, RemoteVideoView, joinChannel, leaveChannel } =
    useAgoraRtc({
      appId: APP_ID,
      channelName: CHANNEL_NAME,
      token: TOKEN,
    });

  const statusTone = useMemo(() => {
    if (state === 'joined') return 'green' as const;
    if (state === 'joining') return 'yellow' as const;
    if (state === 'error') return 'red' as const;
    return 'blue' as const;
  }, [state]);

  const remoteUid = remoteUsers[0]?.uid;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, paddingBottom: 48 }}>
        <View className="mb-5 flex-row items-center justify-between">
          <View>
            <Text className="text-h4 text-foreground">Agora call test</Text>
            <Text className="mt-1 max-w-[280px] text-sm text-muted-foreground">
              Native preview only. Web shows a safe placeholder so the app never crashes.
            </Text>
          </View>
          <StatusPill label={state.toUpperCase()} tone={statusTone} />
        </View>

        <LinearGradient
          colors={[theme.colors.primary, theme.colors.secondary] as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 28, padding: 20 }}>
          <View className="flex-row items-center gap-3">
            <View className="h-14 w-14 items-center justify-center rounded-full bg-white/20">
              <Icon name="Video" size={28} color="#FFFFFF" strokeWidth={2.5} />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-white">Join a real video room</Text>
              <Text className="mt-1 text-sm text-white/90">
                App ID and channel come from environment variables so you can swap rooms without code changes.
              </Text>
            </View>
          </View>
        </LinearGradient>

        <View className="mt-5 rounded-[28px] border border-border bg-card p-5">
          <View className="flex-row flex-wrap gap-2">
            <StatusPill label={Platform.OS === 'web' ? 'WEB PREVIEW' : 'NATIVE PREVIEW'} tone="blue" />
            <StatusPill label={APP_ID ? 'APP ID SET' : 'APP ID MISSING'} tone={APP_ID ? 'green' : 'red'} />
            <StatusPill label={TOKEN ? 'TOKEN SET' : 'TOKEN OPTIONAL'} tone={TOKEN ? 'green' : 'yellow'} />
          </View>

          <Text className="mt-4 text-sm font-semibold text-foreground">Channel</Text>
          <Text className="mt-1 text-base text-foreground">{CHANNEL_NAME}</Text>

          {error ? <Text className="mt-4 text-sm font-medium text-rose-600 dark:text-rose-300">{error}</Text> : null}

          <View className="mt-5 flex-row gap-3">
            <Pressable
              onPress={() => {
                void joinChannel();
              }}
              disabled={!isSupported || !APP_ID || state === 'joining' || state === 'joined'}
              className={`flex-1 items-center rounded-full px-5 py-4 ${
                !isSupported || !APP_ID || state === 'joining' || state === 'joined' ? 'bg-muted' : 'bg-primary'
              }`}>
              <Text
                className={`text-base font-bold ${
                  !isSupported || !APP_ID || state === 'joining' || state === 'joined'
                    ? 'text-muted-foreground'
                    : 'text-primary-foreground'
                }`}>
                {state === 'joining' ? 'Joining...' : 'Join room'}
              </Text>
            </Pressable>

            <Pressable
              onPress={leaveChannel}
              disabled={state !== 'joined'}
              className={`flex-1 items-center rounded-full px-5 py-4 ${state === 'joined' ? 'bg-secondary' : 'bg-muted'}`}>
              <Text className={`text-base font-bold ${state === 'joined' ? 'text-white' : 'text-muted-foreground'}`}>
                Leave room
              </Text>
            </Pressable>
          </View>
        </View>

        <View className="mt-5 gap-4">
          <View className="overflow-hidden rounded-[28px] border border-border bg-card">
            <View className="flex-row items-center justify-between px-5 py-4">
              <Text className="text-base font-bold text-foreground">Your camera</Text>
              <StatusPill label={state === 'joined' ? 'LIVE' : 'PREVIEW'} tone={state === 'joined' ? 'green' : 'blue'} />
            </View>
            <View className="h-72 bg-black">
              {isSupported ? (
                <LocalVideoView style={{ flex: 1 }} canvas={{ uid: 0 }} />
              ) : (
                <View className="flex-1 items-center justify-center px-6">
                  <Icon name="MonitorSmartphone" size={40} color="#FFFFFF" />
                  <Text className="mt-4 text-center text-base font-bold text-white">Open native preview to test Agora</Text>
                  <Text className="mt-2 text-center text-sm text-white/80">
                    Web preview stays safe, but live camera and microphone only render in iOS or Android native preview.
                  </Text>
                </View>
              )}
            </View>
          </View>

          <View className="overflow-hidden rounded-[28px] border border-border bg-card">
            <View className="flex-row items-center justify-between px-5 py-4">
              <Text className="text-base font-bold text-foreground">Remote guest</Text>
              <StatusPill label={remoteUid ? `UID ${remoteUid}` : 'WAITING'} tone={remoteUid ? 'green' : 'yellow'} />
            </View>
            <View className="h-72 bg-neutral-900">
              {isSupported && remoteUid ? (
                <RemoteVideoView style={{ flex: 1 }} canvas={{ uid: remoteUid }} />
              ) : (
                <View className="flex-1 items-center justify-center px-6">
                  <Icon name="UsersRound" size={40} color="#FFFFFF" />
                  <Text className="mt-4 text-center text-base font-bold text-white">Waiting for someone else to join</Text>
                  <Text className="mt-2 text-center text-sm text-white/80">
                    Join the same channel from a second device or simulator to see remote video here.
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <View className="mt-5 rounded-[28px] border border-dashed border-border bg-background p-5">
          <Text className="text-base font-bold text-foreground">Setup notes</Text>
          <Text className="mt-3 text-sm leading-6 text-muted-foreground">
            Add EXPO_PUBLIC_AGORA_APP_ID, optional EXPO_PUBLIC_AGORA_TOKEN, and optional EXPO_PUBLIC_AGORA_CHANNEL_NAME in app environment variables. Then open this screen in native preview.
          </Text>
          <Text className="mt-3 text-sm leading-6 text-muted-foreground">
            For temporary testing, Agora tokens can expire. If you use one and joining stops working later, refresh the token and try again.
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
