import { useMutation } from '@tanstack/react-query';
import { signInWithGoogle, signInWithApple ,signOut } from '@/src/services';
import { useRouter } from 'expo-router';

export const useGoogleSingIn = () => {
  return useMutation({ mutationFn: signInWithGoogle });
};

export const useAppleSingIn = () => {
  return useMutation({ mutationFn: signInWithApple });
};

export const useSignOut = () => {
  const { replace } = useRouter();
  return useMutation({ mutationFn: signOut, onSuccess: () => replace("/auth/login")});
};
