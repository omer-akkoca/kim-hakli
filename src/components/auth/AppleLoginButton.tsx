import React from 'react';
import { Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { AppleVector } from '@/assets';
import { HStack, Pressable } from '@/components/ui';
import { useAppleSingIn } from '@/src/actions';
import { useTheme, useToast } from '@/src/hooks';
import { AppText, AppLoading } from '../ui';

const AppleLoginButton = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const { show } = useToast();

  const { mutate, isPending } = useAppleSingIn();

  const onSuccess = () => router.replace('/');

  const handleApple = () => {
    mutate(undefined, {
      onError: (error: Error) => {
        show({
          type: 'error',
          title: 'Giriş yapılamadı',
          description: error.message,
        });
      },
      onSuccess: (result) => {
        if (result.cancelled) return;

        onSuccess();

        show({
          type: 'success',
          title: 'Hoş geldin!',
          description: 'Apple hesabınla başarıyla giriş yaptın.',
        });
      },
    });
  };

  if (Platform.OS === 'android') return null;

  return (
    <Pressable
      onPress={handleApple}
      style={{ backgroundColor: colors.white }}
      className="w-full h-button rounded-button px-6"
    >
      {isPending ? (
        <AppLoading fullScreen size={'small'} />
      ) : (
        <HStack space="lg" className="flex-1 items-center">
          <AppleVector width={24} height={24} />
          <AppText className="flex-1 text-center text-black" size={14} weight={600}>
            Apple ile Devam Et
          </AppText>
        </HStack>
      )}
    </Pressable>
  );
};

export { AppleLoginButton };
