import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { storage } from '@/src/utils';
import { STORAGE_KEYS } from '@/src/constants';
import { useFonts } from 'expo-font';

/*import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
});*/

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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!seenOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/home" />;
}
