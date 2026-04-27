import { Box, Button, ButtonText, Text } from '@/components/ui';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useGoogleSingIn } from '@/src/actions';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();

  const { mutate } = useGoogleSingIn();

  const handleLogin = async () => {
    mutate(undefined, { onSuccess: () => router.push('/(tabs)/home') });
  };

  return (
    <Box className="flex-1 justify-center items-center px-6 bg-white">
      <Box className="w-full max-w-md p-6 rounded-2xl bg-white shadow-md">
        <Text className="text-2xl font-bold text-center mb-3">{t('auth.login')}</Text>

        <Text className="text-gray-500 text-center mb-6">{t('auth.loginDesc')}</Text>

        <Button onPress={handleLogin} className="bg-primary-500 h-11 rounded-lg">
          <AntDesign name="google" size={20} color="white" />
          <ButtonText className="text-white text-center font-semibold">
            {t('auth.google')}
          </ButtonText>
        </Button>
      </Box>
    </Box>
  );
}
