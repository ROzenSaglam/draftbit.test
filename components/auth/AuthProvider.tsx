import * as React from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase, type AppUserRow, type ProfileRow } from '@/lib/supabase';

type AuthContextValue = {
  initialized: boolean;
  session: Session | null;
  authUser: User | null;
  appUser: AppUserRow | null;
  profile: ProfileRow | null;
  refreshUserData: () => Promise<void>;
  ensureUserRow: (user: User) => Promise<AppUserRow>;
  signOut: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [initialized, setInitialized] = React.useState(false);
  const [session, setSession] = React.useState<Session | null>(null);
  const [authUser, setAuthUser] = React.useState<User | null>(null);
  const [appUser, setAppUser] = React.useState<AppUserRow | null>(null);
  const [profile, setProfile] = React.useState<ProfileRow | null>(null);

  const ensureUserRow = React.useCallback(async (user: User) => {
    const { data: existingUser, error: existingUserError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (existingUserError) {
      throw existingUserError;
    }

    if (existingUser) {
      return existingUser;
    }

    const { data: firstProfile, error: profileLookupError } = await supabase
      .from('profiles')
      .select('id')
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (profileLookupError) {
      throw profileLookupError;
    }

    const { data: createdUser, error: createUserError } = await supabase
      .from('users')
      .insert({
        id: user.id,
        email: user.email ?? '',
        display_name:
          typeof user.user_metadata?.display_name === 'string'
            ? user.user_metadata.display_name
            : (user.email?.split('@')[0] ?? null),
        profile_id: firstProfile?.id ?? null,
      })
      .select('*')
      .single();

    if (createUserError) {
      throw createUserError;
    }

    return createdUser;
  }, []);

  const loadUserData = React.useCallback(async (user: User | null) => {
    if (!user) {
      setAppUser(null);
      setProfile(null);
      return;
    }

    const userRow = await ensureUserRow(user);

    setAppUser(userRow ?? null);

    if (!userRow?.profile_id) {
      setProfile(null);
      return;
    }

    const { data: profileRow, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userRow.profile_id)
      .maybeSingle();

    if (profileError) {
      throw profileError;
    }

    setProfile(profileRow ?? null);
  }, []);

  React.useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Failed to get session', error);
      }

      if (!isMounted) {
        return;
      }

      const nextSession = data.session ?? null;
      setSession(nextSession);
      setAuthUser(nextSession?.user ?? null);

      try {
        await loadUserData(nextSession?.user ?? null);
      } catch (loadError) {
        console.error('Failed to load user data', loadError);
      } finally {
        if (isMounted) {
          setInitialized(true);
        }
      }
    };

    bootstrap();

    const { data: listener } = supabase.auth.onAuthStateChange((_, nextSession) => {
      setSession(nextSession);
      setAuthUser(nextSession?.user ?? null);
      void loadUserData(nextSession?.user ?? null);
      setInitialized(true);
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, [loadUserData]);

  const value = React.useMemo<AuthContextValue>(
    () => ({
      initialized,
      session,
      authUser,
      appUser,
      profile,
      refreshUserData: async () => loadUserData(authUser),
      ensureUserRow,
      signOut: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
          throw error;
        }
      },
    }),
    [appUser, authUser, ensureUserRow, initialized, loadUserData, profile, session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }

  return context;
}
