import { useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { AppBackground, AppLoading } from '@/src/components';

export default function ReferralDeepLink() {
  const { ref } = useLocalSearchParams<{ ref?: string }>();
  const { replace } = useRouter();

  useEffect(() => {
    if (ref) {
      replace({
        pathname: '/auth/login',
        params: { ref },
      });
    }
  }, [ref]);

  console.log('Referral code:', ref);

  return (
    <AppBackground>
      <AppLoading fullScreen />
    </AppBackground>
  );
}
