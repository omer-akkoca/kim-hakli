import React from 'react';
import { Platform } from 'react-native';
import { HStack, Pressable } from '@/components/ui';
import { AppleVector } from '@/assets';
import { useAppleSingIn } from '@/src/actions';
import { AppLoading } from '../ui/AppLoading';
import { AppText } from '../ui/AppText';
import { useToast } from '@/src/hooks';
import { useRouter } from 'expo-router';

const AppleLoginButton = () => {
  const router = useRouter();
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
    <Pressable onPress={handleApple} className="w-full h-button rounded-button bg-white px-6">
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
