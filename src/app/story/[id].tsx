import { View, Text, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAppSelector } from '@/src/store';

export default function StoryDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const handleReadStory = () => {
    if (!isAuthenticated) {
      router.push(`/auth/login?redirect=/story/read/${id}`);
      return;
    }

    router.push(`/story/read/${id}`);
  };

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Hikaye Detay</Text>
      <Text style={{ marginBottom: 24 }}>Hikaye ID: {id}</Text>

      <Pressable onPress={handleReadStory}>
        <Text>Hikayeyi Oku</Text>
      </Pressable>
    </View>
  );
}
