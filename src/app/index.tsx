import { useEffect, useState } from 'react';
import { Box, Spinner } from '@/components/ui';
import { AppBackground } from '@/src/components';
import { Redirect } from 'expo-router';
import { storage } from '@/src/utils';
import { colors, STORAGE_KEYS } from '@/src/constants';
import { useFonts } from 'expo-font';
import '@/src/configs/google';

export default function IndexPage() {
  useFonts({
    'Inter-Regular': require('../../assets/fonts/inter/Inter-Regular.ttf'),
    'Inter-Medium': require('../../assets/fonts/inter/Inter-Medium.ttf'),
    'Inter-SemiBold': require('../../assets/fonts/inter/Inter-SemiBold.ttf'),
    'Inter-Bold': require('../../assets/fonts/inter/Inter-Bold.ttf'),
    'Inter-ExtraBold': require('../../assets/fonts/inter/Inter-ExtraBold.ttf'),
    'Inter-Black': require('../../assets/fonts/inter/Inter-Black.ttf'),
    'PlayfairDisplay-Regular': require('../../assets/fonts/playfair-display/PlayfairDisplay-Regular.ttf'),
    'PlayfairDisplay-Medium': require('../../assets/fonts/playfair-display/PlayfairDisplay-Medium.ttf'),
    'PlayfairDisplay-SemiBold': require('../../assets/fonts/playfair-display/PlayfairDisplay-SemiBold.ttf'),
    'PlayfairDisplay-Bold': require('../../assets/fonts/playfair-display/PlayfairDisplay-Bold.ttf'),
    'PlayfairDisplay-ExtraBold': require('../../assets/fonts/playfair-display/PlayfairDisplay-ExtraBold.ttf'),
    'PlayfairDisplay-Black': require('../../assets/fonts/playfair-display/PlayfairDisplay-Black.ttf'),
  });

  const [loading, setLoading] = useState(true);
  const [seenOnboarding, setSeenOnboarding] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await storage.get<boolean>(STORAGE_KEYS.HAS_SEEN_ONBOARDING);
        setSeenOnboarding(value === true);
      } finally {
        setLoading(false);
      }
    };
    checkOnboarding();
  }, []);

  if (loading) {
    return (
      <AppBackground>
        <Box className="flex-1 items-center justify-center">
          <Spinner color={colors.primary} size="large" />
        </Box>
      </AppBackground>
    );
  }

  if (!seenOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/home" />;
}
