import { View, Text } from 'react-native';
import { Redirect } from 'expo-router';
import { useAppSelector } from '@/src/store';

export default function ProfilePage() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Redirect href="/auth/login?redirect=/profile" />;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profil Sayfası</Text>
    </View>
  );
}
