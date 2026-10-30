import { useMemo, useState } from 'react';
import { View } from 'react-native';
import type { AgoraConfig, AgoraConnectionState, AgoraParticipant } from './types';

type PlaceholderProps = {
  style?: object;
  canvas?: unknown;
};

function PlaceholderVideoView({ style }: PlaceholderProps) {
  return <View style={style} />;
}

type UseAgoraRtcResult = {
  isSupported: boolean;
  state: AgoraConnectionState;
  error: string | null;
  remoteUsers: AgoraParticipant[];
  LocalVideoView: typeof PlaceholderVideoView;
  RemoteVideoView: typeof PlaceholderVideoView;
  joinChannel: () => Promise<void>;
  leaveChannel: () => void;
};

export function useAgoraRtc(_config: AgoraConfig): UseAgoraRtcResult {
  const [state] = useState<AgoraConnectionState>('idle');

  return useMemo(
    () => ({
      isSupported: false,
      state,
      error: 'Agora native video is available in iOS and Android native preview only.',
      remoteUsers: [],
      LocalVideoView: PlaceholderVideoView,
      RemoteVideoView: PlaceholderVideoView,
      joinChannel: async () => {},
      leaveChannel: () => {},
    }),
    [state]
  );
}
