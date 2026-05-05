import { useMutation } from '@tanstack/react-query';
import { logout, signInWithGoogle } from '@/src/services';
import { resetAuth, useAppDispatch } from '@/src/store';
import { useRouter } from 'expo-router';

export const useGoogleSingIn = () => {
  return useMutation({
    mutationFn: signInWithGoogle,
  });
};

export const useLogOut = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      dispatch(resetAuth());
      router.replace('/(tabs)/home');
    },
  });
};
