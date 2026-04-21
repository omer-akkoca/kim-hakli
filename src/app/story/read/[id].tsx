import { View, Text } from 'react-native';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { useAppSelector } from '@/src/store';

export default function StoryReadPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Redirect href={`/auth/login?redirect=/story/read/${id}`} />;
  }

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: 'center' }}>
      <Text style={{ fontSize: 24 }}>Hikaye Okuma Sayfası</Text>
      <Text>Hikaye ID: {id}</Text>
    </View>
  );
}
