import React, { useCallback, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Box, HStack, VStack } from '@/components/ui';
import { SendVector } from '@/assets';
import { referralList } from '@/src/constants';
import { useSignOut, useUpdateReferralSource } from '@/src/actions';
import { useAuth, useTheme, useToast } from '@/src/hooks';
import { setReferralSource, useAppDispatch } from '@/src/store';
import { AppBackground, AppCard, AppNamedLogo, AppPrimaryButton, AppText } from '@/src/components';

const ReferralSource = () => {
  const { colors } = useTheme();
  const { top, bottom } = useSafeAreaInsets();
  const { user } = useAuth();
  const { show } = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [source, setSource] = useState('');

  const { mutate: logout } = useSignOut();
  const { mutate, isPending } = useUpdateReferralSource();

  const handleSend = useCallback(() => {
    if (user) {
      mutate(
        { userId: user?.id, referralSource: source },
        {
          onSuccess: async () => {
            dispatch(setReferralSource(source));
            router.replace('/');
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
        <HStack className="items-center justify-between py-2">
          <Box />
          <AppText weight={600} color="headline_75" onPress={logout}>
            Çıkış Yap
          </AppText>
        </HStack>
        <Box className="flex-1 items-center justify-center gap-6">
          <AppNamedLogo fontSize={24} imageSize={40} />
          <VStack space="sm">
            <AppText size={16} lineHeight={22} color="headline" className="text-center -tracking-2">
              Aramıza hoş geldin!
            </AppText>
            <AppText size={16} lineHeight={22} color="headline" className="text-center -tracking-2">
              Seni bize ulaştıran yeri merak ediyoruz.
            </AppText>
          </VStack>

          <HStack space="lg" className="items-center justify-center flex-wrap">
            {referralList.map((e) => {
              const active = e.value === source;
              return (
                <AppCard
                  key={e.value}
                  onPress={() => setSource(e.value)}
                  style={{ borderColor: active ? colors.primary : colors.white_10 }}
                >
                  <Box className="px-4 py-2">
                    <AppText weight={500} color={active ? 'primary' : 'headline_75'}>
                      {e.label}
                    </AppText>
                  </Box>
                </AppCard>
              );
            })}
          </HStack>
        </Box>
        <AppPrimaryButton
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
