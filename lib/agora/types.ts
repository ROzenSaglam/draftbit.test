export type AgoraConfig = {
  appId: string;
  channelName: string;
  token: string | null;
  uid?: number;
};

export type AgoraConnectionState = 'idle' | 'ready' | 'joining' | 'joined' | 'error';

export type AgoraParticipant = {
  uid: number;
};
