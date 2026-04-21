import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function StoriesPage() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Hikayeler</Text>

      <Pressable onPress={() => router.push('/story/1')}>
        <Text>1 numaralı hikayeye git</Text>
      </Pressable>
    </View>
  );
}
