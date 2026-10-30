import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  RtcSurfaceView,
} from 'react-native-agora';
import { Platform } from 'react-native';
import type { AgoraConfig, AgoraConnectionState, AgoraParticipant } from './types';

type UseAgoraRtcResult = {
  isSupported: boolean;
  state: AgoraConnectionState;
  error: string | null;
  remoteUsers: AgoraParticipant[];
  LocalVideoView: typeof RtcSurfaceView;
  RemoteVideoView: typeof RtcSurfaceView;
  joinChannel: () => Promise<void>;
  leaveChannel: () => void;
};

export function useAgoraRtc(config: AgoraConfig): UseAgoraRtcResult {
  const engineRef = useRef<IRtcEngine | null>(null);
  const [state, setState] = useState<AgoraConnectionState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [remoteUsers, setRemoteUsers] = useState<AgoraParticipant[]>([]);

  useEffect(() => {
    if (!config.appId) {
      setState('error');
      setError('Missing Agora App ID. Add EXPO_PUBLIC_AGORA_APP_ID in app settings.');
      return;
    }

    const engine = createAgoraRtcEngine();
    engineRef.current = engine;

    engine.initialize({
      appId: config.appId,
      channelProfile: ChannelProfileType.ChannelProfileCommunication,
    });
    engine.enableAudio();
    engine.enableVideo();
    engine.startPreview();

    const handleJoin = () => {
      setState('joined');
      setError(null);
    };

    const handleUserJoined = (_connection: unknown, uid: number) => {
      setRemoteUsers((current) => {
        if (current.some((item) => item.uid === uid)) {
          return current;
        }
        return [...current, { uid }];
      });
    };

    const handleUserOffline = (_connection: unknown, uid: number) => {
      setRemoteUsers((current) => current.filter((item) => item.uid !== uid));
    };

    const handleError = (err: number, message: string) => {
      setState('error');
      setError(message || `Agora error ${err}`);
    };

    engine.addListener('onJoinChannelSuccess', handleJoin);
    engine.addListener('onUserJoined', handleUserJoined);
    engine.addListener('onUserOffline', handleUserOffline);
    engine.addListener('onError', handleError);

    setState('ready');

    return () => {
      engine.leaveChannel();
      engine.stopPreview();
      engine.release();
      engineRef.current = null;
    };
  }, [config.appId]);

  const joinChannel = useCallback(async () => {
    if (!engineRef.current) {
      setState('error');
      setError('Agora engine is not ready yet.');
      return;
    }

    if (!config.channelName) {
      setState('error');
      setError('Missing channel name. Add EXPO_PUBLIC_AGORA_CHANNEL_NAME in app settings.');
      return;
    }

    setState('joining');
    setError(null);
    setRemoteUsers([]);

    const joinToken = config.token ?? '';

    engineRef.current.joinChannel(joinToken, config.channelName, config.uid ?? 0, {
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      publishCameraTrack: true,
      publishMicrophoneTrack: true,
      autoSubscribeAudio: true,
      autoSubscribeVideo: true,
    });
  }, [config.channelName, config.token, config.uid]);

  const leaveChannel = useCallback(() => {
    if (!engineRef.current) {
      return;
    }

    engineRef.current.leaveChannel();
    setRemoteUsers([]);
    setState('ready');
  }, []);

  return useMemo(
    () => ({
      isSupported: Platform.OS !== 'web',
      state,
      error,
      remoteUsers,
      LocalVideoView: RtcSurfaceView,
      RemoteVideoView: RtcSurfaceView,
      joinChannel,
      leaveChannel,
    }),
    [error, joinChannel, leaveChannel, remoteUsers, state]
  );
}
