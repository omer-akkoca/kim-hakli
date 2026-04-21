import { useRouter } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import { STORAGE_KEYS } from '@/src/constants';
import { storage } from '@/src/utils';

export default function OnboardingPage() {
  const router = useRouter();

  const handleContinue = async () => {
    const result = await storage.set(STORAGE_KEYS.HAS_SEEN_ONBOARDING, true);
    if (result) {
      router.replace('/home');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
      <Text style={{ fontSize: 28, marginBottom: 16 }}>Hoş geldin</Text>
      <Text style={{ fontSize: 16, marginBottom: 32 }}>
        Uygulamada hikayeleri keşfedebilir, detaylara bakabilir, giriş yaptıktan sonra okumaya devam
        edebilirsin.
      </Text>

      <Pressable onPress={handleContinue}>
        <Text>Devam Et</Text>
      </Pressable>
    </View>
  );
}
