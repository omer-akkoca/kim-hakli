import { AppBackground, AppLoading } from '@/src/components';
import { Redirect } from 'expo-router';
import { useAuth, useAppState } from '@/src/hooks';
import '@/src/configs/google';

const IndexPage = () => {
  const { loading, hasSeenOnboarding } = useAppState();
  const { isAuthenticated, authLoading, user } = useAuth();

  if (loading || authLoading) {
    return (
      <AppBackground>
        <AppLoading fullScreen />
      </AppBackground>
    );
  }

  const renderScreen = () => {
    if (!hasSeenOnboarding) return <Redirect href="/onboarding" />;

    if (!isAuthenticated) return <Redirect href="/home" />;

    if (!user?.referral_source) return <Redirect href="/referral_source" />;

    return <Redirect href="/home" />;
  };

  return <AppBackground>{renderScreen()}</AppBackground>;
};

export default IndexPage;
