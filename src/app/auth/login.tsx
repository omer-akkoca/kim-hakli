import { View, Text, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { setUser, useAppDispatch } from '@/src/store';
import { IUser } from '@/src/types';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { redirect } = useLocalSearchParams<{ redirect?: string }>();

  const handleLogin = async () => {
    const fakeUser: IUser = {
      displayName: 'Ömer Akkoca',
      email: 'omerakkoca1042@gmail.com',
      photoURL: 'https://omerakkoca.com/static/media/home-profile.7694082619d7f4d8e844.jpeg',
    };

    dispatch(setUser(fakeUser as any));

    if (redirect) {
      router.replace(String(redirect));
      return;
    }

    router.replace('/home');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
      <Text style={{ fontSize: 24, marginBottom: 24 }}>Giriş Yap</Text>

      <Pressable onPress={handleLogin}>
        <Text>Demo login</Text>
      </Pressable>
    </View>
  );
}
