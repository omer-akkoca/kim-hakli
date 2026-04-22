import { Box, Button, ButtonText, Text } from '@/components/ui';
import AntDesign from '@expo/vector-icons/AntDesign';
import { signInWithGoogle } from '@/src/services';

export default function LoginPage() {
  const handleLogin = async () => {
    await signInWithGoogle();
  };

  return (
    <Box className="flex-1 justify-center items-center px-6 bg-white">
      <Box className="w-full max-w-md p-6 rounded-2xl bg-white shadow-md">
        <Text className="text-2xl font-bold text-center mb-3">Giriş Yap</Text>

        <Text className="text-gray-500 text-center mb-6">
          Bu sayfayı görüntülemek için giriş yapmalısın.
        </Text>

        <Button onPress={handleLogin} className="bg-black h-11 rounded-lg">
          <AntDesign name="google" size={20} color="white" />
          <ButtonText className="text-white text-center font-semibold">Giriş Yap</ButtonText>
        </Button>
      </Box>
    </Box>
  );
}
