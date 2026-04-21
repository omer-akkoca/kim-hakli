import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { storage } from '@/src/utils';
import { STORAGE_KEYS } from '@/src/constants';

export default function IndexPage() {
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
