import { useMutation } from '@tanstack/react-query';
import { savePushToken } from '@/src/services';

export const useSavePushToken = () => {
  return useMutation({
    mutationFn: savePushToken,
  });
};
