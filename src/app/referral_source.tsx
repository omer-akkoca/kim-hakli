import React, { useCallback, useState } from 'react';
import { Image as RnImage } from 'react-native';
import { Box, HStack, VStack } from '@/components/ui';
import { AppBackground, AppCard, AppText, DetailPrimaryButton } from '@/src/components';
import { LOGIN_TEXT, SendVector } from '@/assets';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { H, STORAGE_KEYS, width } from '../constants';
import { referralList } from '../constants/values';
import { useUpdateReferralSource } from '../actions';
import { useAuth, useToast } from '../hooks';
import { useRouter } from 'expo-router';
import { storage } from '../utils';

const ReferralSource = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { user } = useAuth();
  const { show } = useToast();
  const router = useRouter();

  const [source, setSource] = useState('');

  const { mutate, isPending } = useUpdateReferralSource();

  const handleSend = useCallback(() => {
    if (user) {
      mutate(
        { userId: user?.id, referralSource: source },
        {
          onSuccess: async () => {
            await storage.set(STORAGE_KEYS.REFERRAL_SOURCE, true);
            router.replace('/(tabs)/home');
            show({
              title: 'Teşekkürler 🧡',
              description: 'Cevabın başarıyla kaydedildi.',
            });
          },
          onError: (error) => {
            show({
              title: 'Bir hata oluştu',
              description: error.message,
            });
          },
        },
      );
    }
  }, [user, source]);

  return (
    <AppBackground>
      <Box className="flex-1 px-6" style={{ paddingTop: top, paddingBottom: bottom + 24 }}>
        <Box className="flex-1 items-center justify-center gap-6">
          <RnImage
            source={LOGIN_TEXT}
            style={{ width, height: H(156) }}
            resizeMode="contain"
            alt="logo-text"
          />
          <VStack space="sm">
            <AppText size={16} lineHeight={22} className="text-headline text-center -tracking-2">
              Aramıza hoş geldin!
            </AppText>
            <AppText size={16} lineHeight={22} className="text-headline text-center -tracking-2">
              Seni bize ulaştıran yeri merak ediyoruz.
            </AppText>
          </VStack>

          <HStack space="md" className="items-center justify-center flex-wrap">
            {referralList.map((e) => {
              const active = e.value === source;
              return (
                <AppCard
                  key={e.value}
                  onPress={() => setSource(e.value)}
                  className={active ? 'border-primary-500' : ''}
                >
                  <Box className="px-4 py-2">
                    <AppText
                      weight={500}
                      className={`${active ? 'text-primary-500' : 'text-whiteSmoke-500/75'}`}
                    >
                      {e.label}
                    </AppText>
                  </Box>
                </AppCard>
              );
            })}
          </HStack>
        </Box>
        <DetailPrimaryButton
          icon={SendVector}
          label="Gönder"
          onPress={handleSend}
          disabled={!!!source}
          loading={isPending}
        />
      </Box>
    </AppBackground>
  );
};

export default ReferralSource;
