import React from 'react';
import { ImageBackground, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LOGIN_BG, LOGIN_TEXT, PersonVector } from '@/assets';
import { Box, HStack, Image, LinearGradient, Pressable, VStack } from '@/components/ui';
import { AppleLoginButton, AppText, GoogleLoginButton } from '@/src/components';
import { useTheme } from '@/src/hooks';

const LoginPage = () => {
  const { ref } = useLocalSearchParams<{ ref?: string }>();

  const { colors } = useTheme();
  const { bottom } = useSafeAreaInsets();
  const { replace } = useRouter();

  const onSuccess = () => replace('/');

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
              style={{ paddingBottom: bottom + 16 }}
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
                <AppText color="title" className="text-center" size={16} lineHeight={26}>
                  Hikayeleri oku, kendi kararını ver.
                </AppText>
                <AppText
                  className="text-center tracking-x-tighter"
                  weight={600}
                  size={17}
                  lineHeight={24}
                  color="primary"
                >
                  Kim haklı, sen söyle.
                </AppText>
              </VStack>
              {/* Button Section  */}
              <VStack space="lg" className="w-full px-1 my-8">
                <GoogleLoginButton />
                <AppleLoginButton />
                <Pressable
                  onPress={onSuccess}
                  className="w-full h-button rounded-button bg-backgroud-500/25 border border-primary-500 px-6"
                >
                  <HStack space="lg" className="flex-1 items-center">
                    <PersonVector width={24} height={24} color={colors.primary} />
                    <AppText color="title" className="flex-1 text-center" size={14} weight={600}>
                      Hesapsız Devam Et
                    </AppText>
                  </HStack>
                </Pressable>
              </VStack>
              {/* Terms Text  */}
              <AppText color="title" className="w-11/12 text-center" size={13} weight={400}>
                Devam ederek,{' '}
                <AppText
                  color="primary"
                  weight={500}
                  onPress={() => Linking.openURL('https://kimhakli.tr/terms-of-use')}
                >
                  Kullanım Şartları
                </AppText>{' '}
                ve{' '}
                <AppText
                  color="primary"
                  weight={500}
                  onPress={() => Linking.openURL('https://kimhakli.tr/privacy-policy')}
                >
                  Gizlilik Politikası
                </AppText>
                {"'"}nı kabul etmiş olursunuz.
              </AppText>
            </Box>
          </LinearGradient>
        </Box>
      </ImageBackground>
    </Box>
  );
};

export default LoginPage;
