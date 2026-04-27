import { useMutation } from '@tanstack/react-query';
import { signInWithGoogle } from '../services';

export const useGoogleSingIn = () => {
  return useMutation({
    mutationFn: signInWithGoogle,
  });
};
