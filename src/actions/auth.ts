import { useMutation } from '@tanstack/react-query';
import { signInWithGoogle, signOut } from '@/src/services';

export const useGoogleSingIn = () => {
  return useMutation({ mutationFn: signInWithGoogle });
};

export const useSignOut = () => {
  return useMutation({ mutationFn: signOut });
};
