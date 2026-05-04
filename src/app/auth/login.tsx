import { Box, Button, ButtonText, Image, Text, VStack } from '@/components/ui';
import { useGoogleSingIn } from '@/src/actions';
import { useRouter } from 'expo-router';
import { ImageBackground, Platform } from 'react-native';
import { AppleVector, GoogleVector, LOGIN_BG, LOGIN_TEXT } from '@/assets';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/src/constants';

export default function LoginPage() {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();

  const { mutate } = useGoogleSingIn();

  const onSuccess = () => router.push('/(tabs)/home');

  const handleGoogle = async () => {
    mutate(undefined, { onSuccess: onSuccess });
  };

  const handleApple = async () => {
    // apple login
  };

  return (
    <Box className="flex-1">
      <ImageBackground source={LOGIN_BG} className="flex-1">
        <Box className="flex-1 bg-backgroud-500/80" style={{ paddingBottom: bottom }}>
          <Box className="flex-1 p-6 justify-end gap-6">
            <Box className="flex-1 justify-center items-center">
              <Image
                source={LOGIN_TEXT}
                className="w-3/4 h-60"
                resizeMode="contain"
                alt="kim-hakli"
              />
            </Box>
            <VStack space="md" className="items-center">
              <Text className="text-4xl text-headline-500 font-bold">Hoş Geldiniz</Text>
              <Text className="text-text-500 text-center font-medium w-11/12">
                Gündemdeki olayları okumak, kim haklı karar vermek ve toplumun ne düşündüğünü görmek
                için giriş yap.
              </Text>
            </VStack>
            <VStack space="md">
              <Button onPress={handleGoogle} className="bg-text-500 h-14 rounded-xl">
                <GoogleVector width={20} height={20} />
                <ButtonText className="text-backgroud-500">Google ile Devam Et</ButtonText>
              </Button>
              {Platform.OS === 'ios' ? (
                <Button onPress={handleApple} className="bg-black h-14 rounded-xl">
                  <AppleVector width={20} height={20} color={colors.text} />
                  <ButtonText className="text-text-500">Apple ile Devam Et</ButtonText>
                </Button>
              ) : null}
              <Button onPress={onSuccess} className="bg-primary-500 h-14 rounded-xl">
                <ButtonText className="text-text-500">Hesap Olmadan Devam Et</ButtonText>
              </Button>
            </VStack>
          </Box>
        </Box>
      </ImageBackground>
    </Box>
  );
}
