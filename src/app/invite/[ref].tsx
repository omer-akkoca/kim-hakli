import { useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { AppBackground, AppLoading } from '@/src/components';
import { setRefCode, useAppDispatch } from '@/src/store';

export default function ReferralDeepLink() {
  const { ref } = useLocalSearchParams<{ ref?: string }>();
  const { replace } = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (ref) {
      dispatch(setRefCode(ref));
      replace({
        pathname: '/auth/login',
        params: { ref },
      });
    }
  }, [ref]);

  return (
    <AppBackground>
      <AppLoading fullScreen />
    </AppBackground>
  );
}
