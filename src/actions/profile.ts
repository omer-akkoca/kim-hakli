import { useMutation } from '@tanstack/react-query';
import { getProfile } from '@/src/services/profile';
import { GetProfileParams } from '@/src/types';

export const useGetProfile = () => {
  return useMutation({
    mutationFn: (props: GetProfileParams) => getProfile(props.userId),
  });
};
