import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/src/store';
import { Avatar, AvatarImage, Box, Divider, VStack } from '@/components/ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RightChevronVector } from '@/assets';
import { useLogOut } from '@/src/actions';
import { ProfileTabItem } from '@/src/components';

export default function ProfilePage() {
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const { mutate } = useLogOut();

  if (!isAuthenticated || !user) {
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
    <Box className="flex-1 bg-backgroud-500">
      <ScrollView
        contentContainerClassName="px-6 pb-6 gap-6"
        contentContainerStyle={{ paddingTop: top + 24 }}
      >
        <Box className="w-full h-72 justify-center items-center">
          <VStack space="4xl" className="items-center">
            <Avatar>
              <AvatarImage source={{ uri: user.photoURL! }} className="h-20 w-20" />
            </Avatar>
            <Text className="text-headline-500 font-bold text-2xl">{user.displayName}</Text>
          </VStack>
        </Box>
        <VStack space="2xl">
          <ProfileTabItem label="Açılan Hikayeler" icon={RightChevronVector} onPress={() => null} />
          <Divider className="bg-border-500" />
          <ProfileTabItem label="Profil Ayarları" icon={RightChevronVector} onPress={() => null} />
          <ProfileTabItem label="Abonelik" icon={RightChevronVector} onPress={() => null} />
          <ProfileTabItem label="Destek" icon={RightChevronVector} onPress={() => null} />
          <Divider className="bg-border-500" />
          <ProfileTabItem label="Çıkış Yap" onPress={() => mutate()} />
        </VStack>
      </ScrollView>
    </Box>
  );
}
