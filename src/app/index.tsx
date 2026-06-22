import { AppBackground, AppLoading } from '@/src/components';
import { Redirect } from 'expo-router';
import { useAuth, useAppState } from '@/src/hooks';
import '@/src/configs/google';

const IndexPage = () => {
  const { loading, hasSeenOnboarding, referralSource } = useAppState();
  const { isAuthenticated, authLoading } = useAuth();

  if (loading || authLoading) {
    return (
      <AppBackground>
        <AppLoading fullScreen />
      </AppBackground>
    );
  }

  if (!hasSeenOnboarding) return <Redirect href="/onboarding" />;

  if (!isAuthenticated) return <Redirect href="/home" />;

  if (!referralSource) return <Redirect href="/referral_source" />;

  return <Redirect href="/home" />;
};

export default IndexPage;
