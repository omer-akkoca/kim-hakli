import { AppBackground, AppLoading } from '@/src/components';
import { Redirect } from 'expo-router';
import { useAuth, useOnboarding } from '@/src/hooks';
import '@/src/configs/google';

const IndexPage = () => {
  const { loading, hasSeen } = useOnboarding();
  const { isAuthenticated } = useAuth();

  if (loading) {
    return (
      <AppBackground>
        <AppLoading fullScreen />
      </AppBackground>
    );
  }

  if (!hasSeen) return <Redirect href="/onboarding" />;

  if (!isAuthenticated) return <Redirect href="/home" />;

  return <Redirect href="/home" />;
};

export default IndexPage;
