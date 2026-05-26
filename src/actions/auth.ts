import { useMutation } from '@tanstack/react-query';
import { signInWithGoogle, signOut } from '@/src/services';
import { useRouter } from 'expo-router';

export const useGoogleSingIn = () => {
  return useMutation({ mutationFn: signInWithGoogle });
};

export const useSignOut = () => {
  const { replace } = useRouter();
  return useMutation({ mutationFn: signOut, onSuccess: () => replace("/auth/login")});
};
