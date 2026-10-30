import { Redirect } from 'expo-router';
import { useAuth } from '@/components/auth/AuthProvider';

export default function Index() {
  const { session } = useAuth();

  return <Redirect href={session ? '/(tabs)' : '/sign-in'} />;
}
