import { useMutation, useQuery } from '@tanstack/react-query';
import {
  deleteAccount,
  getAvatarUrl,
  getCanApplyReferralCode,
  getProfile,
  getUserStoryStats,
  getUserUnlockedStories,
  updateProfile,
  updateReferralSource,
} from '@/src/services';
import { GetAvatarUrlParams, GetProfileParams, UpdateReferralSourceParams } from '@/src/types';
import { setProfilePhoto, useAppDispatch, useAppSelector } from '../store';
import { useEffect } from 'react';

export const userKeys = {
  userStoryStats: (userId: string) => ['users', userId, 'story-stats'] as const,
  unlockedStories: (userId: string) => ['users', userId, 'unlocked-stories'] as const,
  deleteAccount: () => ['users', 'delete-account'] as const,
  avatarUrl: (params: GetAvatarUrlParams) => ['avatar-url', params.userId, params.avatarPath],
  canApplyReferralCode: (userId?: string) => ['user', userId, 'can-apply-referral-code'] as const,
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

export const useUpdateReferralSource = () => {
  return useMutation({
    mutationFn: (params: UpdateReferralSourceParams) => updateReferralSource(params),
  });
};

export const useUpdateProfile = () => {
  return useMutation({ mutationFn: updateProfile });
};

export const useGetAvatarUrl = ({
  userId,
  avatarPath,
}: GetAvatarUrlParams) => {
  const dispatch = useAppDispatch();

  const query = useQuery({
    queryKey: ['avatar-url', userId, avatarPath],
    queryFn: () => getAvatarUrl(avatarPath!),
    enabled: !!userId && !!avatarPath,
    staleTime: 1000 * 60 * 55,
    gcTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      dispatch(setProfilePhoto(query.data))
    }
  }, [query.isSuccess, query.data]);

  return query;
};

export const useCanApplyReferralCode = (userId?: string) => {
  return useQuery({
    queryKey: userKeys.canApplyReferralCode(userId),
    queryFn: getCanApplyReferralCode,
  });
};