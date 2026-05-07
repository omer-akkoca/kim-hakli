import { Box, HStack, Image, LinearGradient, Pressable, VStack } from '@/components/ui';
import { useGoogleSingIn } from '@/src/actions';
import { useRouter } from 'expo-router';
import { ImageBackground, Platform } from 'react-native';
import { AppleVector, GoogleVector, LOGIN_BG, LOGIN_TEXT, PersonVector } from '@/assets';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/src/constants';
import { AppText } from '@/src/components';

export default function LoginPage() {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();

  const { mutate } = useGoogleSingIn();

  const onSuccess = () => router.replace('/(tabs)/home');

  const handleGoogle = async () => {
    mutate(undefined, { onSuccess: onSuccess });
  };

  const handleApple = async () => {
    // apple login
  };

  return (
    <Box className="flex-1">
      <ImageBackground source={LOGIN_BG} className="flex-1">
        <Box className="flex-1 bg-backgroud-500/55">
          <LinearGradient
            colors={['rgba(28,31,48,0)', 'rgba(28,31,48,0.92)']}
            locations={[0, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            className="flex-1"
          >
            <Box
              className="flex-1 px-7 justify-end items-center"
              style={{ paddingBottom: bottom + 8 }}
            >
              {/* App Name Title */}
              <Image
                source={LOGIN_TEXT}
                className="w-11/12 h-52"
                resizeMode="contain"
                alt="logo-text"
              />
              {/* Content Area */}
              <VStack className="mt-3">
                <AppText className="text-loginText text-center" size={16} lineHeight={26}>
                  Hikayeleri oku, kendi kararını ver.
                </AppText>
                <AppText
                  className="text-primary-500 text-center tracking-x-tighter"
                  weight={600}
                  size={17}
                  lineHeight={24}
                >
                  Kim haklı, sen söyle.
                </AppText>
              </VStack>
              {/* Button Section  */}
              <VStack space="lg" className="w-full px-1 my-8">
                <Pressable
                  onPress={handleGoogle}
                  className="w-full h-button rounded-button bg-white px-6"
                >
                  <HStack space="lg" className="flex-1 items-center">
                    <GoogleVector width={24} height={24} />
                    <AppText className="flex-1 text-center text-black" size={14} weight={600}>
                      Google ile Devam Et
                    </AppText>
                  </HStack>
                </Pressable>
                {Platform.OS === 'ios' ? (
                  <Pressable
                    onPress={handleApple}
                    className="w-full h-button rounded-button bg-white px-6"
                  >
                    <HStack space="lg" className="flex-1 items-center">
                      <AppleVector width={24} height={24} color={colors.apple} />
                      <AppText className="flex-1 text-center text-black" size={14} weight={600}>
                        Apple ile Devam Et
                      </AppText>
                    </HStack>
                  </Pressable>
                ) : null}
                <Pressable
                  onPress={onSuccess}
                  className="w-full h-button rounded-button bg-backgroud-500/25 border border-primary-500 px-6"
                >
                  <HStack space="lg" className="flex-1 items-center">
                    <PersonVector width={24} height={24} color={colors.primary} />
                    <AppText className="flex-1 text-center text-white" size={14} weight={600}>
                      Hesapsız Devam Et
                    </AppText>
                  </HStack>
                </Pressable>
              </VStack>
              {/* Terms Text  */}
              <AppText className="w-11/12 text-loginText text-center" size={13} weight={400}>
                Devam ederek,{' '}
                <AppText className="text-primary-500" weight={500}>
                  Kullanım Şartları
                </AppText>{' '}
                ve{' '}
                <AppText className="text-primary-500" weight={500}>
                  Gizlilk Politikası
                </AppText>
                {"'"}nı kabul etmiş olursunuz.
              </AppText>
            </Box>
          </LinearGradient>
        </Box>
      </ImageBackground>
    </Box>
  );
}
