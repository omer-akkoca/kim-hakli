import { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  deleteAccount,
  getAvatarUrl,
  getCanApplyReferralCode,
  getMyTotalCredits,
  getProfile,
  getUserStoryStats,
  getUserUnlockedStories,
  updateProfile,
  updateReferralSource,
} from '@/src/services';
import { GetAvatarUrlParams, GetProfileParams, UpdateReferralSourceParams } from '@/src/types';
import { setProfilePhoto, setTotalCredits, useAppDispatch, useAppSelector } from '@/src/store';

export const profileKeys = {
  userStoryStats: (userId: string) => ['users', userId, 'story-stats'] as const,
  unlockedStories: (userId: string) => ['users', userId, 'unlocked-stories'] as const,
  deleteAccount: () => ['users', 'delete-account'] as const,
  avatar: (userId?: string, avatarPath?: string) => ['user', 'avatar', userId, avatarPath] as const,
  canApplyReferralCode: (userId?: string) => ['user', 'can-apply-referral-code', userId] as const,
  getMyTotalCredits: (userId?: string) => ['user', 'my-total-credits', userId] as const,
};

export const useGetProfile = () => {
  return useMutation({
    mutationFn: (props: GetProfileParams) => getProfile(props.userId),
  });
};

export const useGetUserStoryStats = (userId?: string) => {
  return useQuery({
    queryKey: profileKeys.userStoryStats(userId ?? ''),
    queryFn: getUserStoryStats,
    enabled: !!userId,
  });
};

export const useGetUserUnlockedStories = () => {
  const user = useAppSelector((state) => state.auth.user);
  const userId = user ? user.id : '';
  return useQuery({
    queryKey: profileKeys.unlockedStories(userId),
    queryFn: () => getUserUnlockedStories(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useDeleteAccount = () => {
  return useMutation({
    mutationKey: profileKeys.deleteAccount(),
    mutationFn: deleteAccount,
  });
};

export const useUpdateReferralSource = () => {
  return useMutation({
    mutationFn: (params: UpdateReferralSourceParams) => updateReferralSource(params),
  });
};

export const useUpdateProfile = () => {
  return useMutation({ mutationFn: updateProfile });
};

export const useGetAvatarUrl = ({ userId, avatarPath }: GetAvatarUrlParams) => {
  const dispatch = useAppDispatch();

  const query = useQuery({
    queryKey: profileKeys.avatar(userId, avatarPath ?? ''),
    queryFn: () => getAvatarUrl(avatarPath!),
    enabled: !!userId && !!avatarPath,
    staleTime: 55 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      dispatch(setProfilePhoto(query.data));
    }
  }, [query.isSuccess, query.data]);

  return query;
};

export const useCanApplyReferralCode = (userId?: string) => {
  return useQuery({
    queryKey: profileKeys.canApplyReferralCode(userId),
    queryFn: getCanApplyReferralCode,
    enabled: !!userId,
  });
};

export const useGetMyTotalCredits = (userId?: string) => {
  const dispatch = useAppDispatch();

  const { data } = useQuery({
    queryKey: profileKeys.getMyTotalCredits(userId),
    queryFn: getMyTotalCredits,
    enabled: !!userId,
    staleTime: 55 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      const { total_credits } = data;
      dispatch(setTotalCredits(total_credits));
    }
  }, [data]);
};
