import { AppBackground, AppLoading } from '@/src/components';
import { Redirect } from 'expo-router';
import { FONTS } from '@/src/constants';
import { useFonts } from 'expo-font';
import { useOnboarding } from '@/src/hooks';
import '@/src/configs/google';

export default function IndexPage() {
  useFonts(FONTS);
  const { loading, hasSeen } = useOnboarding();

  if (loading) {
    return (
      <AppBackground>
        <AppLoading fullScreen />
      </AppBackground>
    );
  }

  if (!hasSeen) return <Redirect href="/onboarding" />;

  return <Redirect href="/home" />;
}
