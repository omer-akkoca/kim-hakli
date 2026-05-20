import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteAccount, getProfile, getUserStoryStats, getUserUnlockedStories } from '@/src/services';
import { GetProfileParams } from '@/src/types';
import { useAppSelector } from '../store';

export const userKeys = {
  userStoryStats: (userId: string) => ['users', userId, 'story-stats'] as const,
  unlockedStories: (userId: string) => ['users', userId, 'unlocked-stories'] as const,
  deleteAccount: () => ['users', 'delete-account'] as const,
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

export const useGetUserUnlockedStories = () => {
  const user = useAppSelector((state) => state.auth.user);
  const userId = user ? user.id : '';
  return useQuery({
    queryKey: userKeys.unlockedStories(userId),
    queryFn: () => getUserUnlockedStories(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useDeleteAccount = () => {
  return useMutation({
    mutationKey: userKeys.deleteAccount(),
    mutationFn: deleteAccount,
  });
};