import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/src/store';

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return (
      <View className="flex-1 justify-center items-center px-6 bg-white">
        <View className="w-full max-w-md p-6 rounded-2xl bg-white shadow-md">
          <Text className="text-2xl font-bold text-center mb-3">Profil</Text>

          <Text className="text-gray-500 text-center mb-6">
            Bu sayfayı görüntülemek için giriş yapmalısın.
          </Text>

          <Pressable
            onPress={() => router.push('/auth/login?redirect=/profile')}
            className="bg-black py-3 rounded-lg"
          >
            <Text className="text-white text-center font-semibold">Giriş Yap</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl font-bold">Profil Sayfası</Text>
    </View>
  );
}
