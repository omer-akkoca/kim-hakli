import React from 'react';
import { useRouter } from 'expo-router';
import { GoogleVector } from '@/assets';
import { HStack, Pressable } from '@/components/ui';
import { useGoogleSingIn } from '@/src/actions';
import { useToast } from '@/src/hooks';
import { AppLoading, AppText } from '../ui';

const GoogleLoginButton = () => {
  const router = useRouter();
  const { show } = useToast();

  const { mutate, isPending } = useGoogleSingIn();

  const onSuccess = () => router.replace('/');

  const handleGoogle = async () => {
    mutate(undefined, {
      onError: (error) => {
        show({
          type: 'error',
          title: 'Giriş yapılamadı',
          description: error.message,
        });
      },
      onSuccess: () => {
        onSuccess();
        show({
          type: 'success',
          title: 'Hoş geldin!',
          description: 'Google hesabınla başarıyla giriş yaptın.',
        });
      },
    });
  };

  return (
    <Pressable onPress={handleGoogle} className="w-full h-button rounded-button bg-white px-6">
      {isPending ? (
        <AppLoading fullScreen size={'small'} />
      ) : (
        <HStack space="lg" className="flex-1 items-center">
          <GoogleVector width={24} height={24} />
          <AppText className="flex-1 text-center text-black" size={14} weight={600}>
            Google ile Devam Et
          </AppText>
        </HStack>
      )}
    </Pressable>
  );
};

export { GoogleLoginButton };
