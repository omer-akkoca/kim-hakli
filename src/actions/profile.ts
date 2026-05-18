import { useMutation, useQuery } from '@tanstack/react-query';
import { getProfile, getUserStoryStats } from '@/src/services';
import { GetProfileParams } from '@/src/types';

export const userKeys = {
  userStoryStats: (userId: string) => ['users', userId, 'story-stats'] as const,
};

export const useGetProfile = () => {
  return useMutation({
    mutationFn: (props: GetProfileParams) => getProfile(props.userId),
  });
};

export const useGetUserStoryStats = (userId?: string) => {
  return useQuery({
    queryKey: userKeys.userStoryStats(userId ?? ''),
    queryFn: getUserStoryStats,
    enabled: !!userId,
  });
};
