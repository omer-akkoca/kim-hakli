import { AppBackground, AppLoading } from '@/src/components';
import { Redirect } from 'expo-router';
import { useAuth, useAppState } from '@/src/hooks';

const IndexPage = () => {
  const { hasSeenOnboarding } = useAppState();
  const { isAuthenticated, authLoading, user } = useAuth();

  if (authLoading || hasSeenOnboarding === null) {
    return (
      <AppBackground>
        <AppLoading fullScreen />
      </AppBackground>
    );
  }

  if (!hasSeenOnboarding) {
    return <Redirect withAnchor href="/onboarding" />;
  }

  if (!isAuthenticated) {
    return <Redirect withAnchor href="/home" />;
  }

  if (user && !user.referral_source) {
    return <Redirect withAnchor href="/referral_source" />;
  }

  if (user && (!user.full_name || !user.gender)) {
    return <Redirect withAnchor href="/complete_profile" />;
  }

  return <Redirect withAnchor href="/home" />;
};

export default IndexPage;
