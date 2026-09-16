import { useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { AppBackground, AppLoading } from '@/src/components';
import { setRefCode, useAppDispatch } from '@/src/store';
import { useAuth } from '@/src/hooks';

const ReferralDeepLink = () => {
  const { ref } = useLocalSearchParams<{ ref?: string }>();
  const { replace } = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  useEffect(() => {
    if (!ref) return;

    dispatch(setRefCode(ref));

    if (user) {
      replace('/(tabs)/profile');
      return;
    }

    replace({
      pathname: '/auth/login',
      params: { ref },
    });
  }, [ref, user]);

  return (
    <AppBackground>
      <AppLoading fullScreen />
    </AppBackground>
  );
};

export default ReferralDeepLink;
