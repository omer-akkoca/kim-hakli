import { useMutation, useQuery } from '@tanstack/react-query';
import {
  claimAdReward,
  getAllTimeLeaderBoard,
  getAppConfig,
  getMonthlyLeaderBoard,
} from '@/src/services';
import { useAuth } from '@/src/hooks/useAuth';

const appKeys = {
  appConfig: ['app-config'],
  allTimeLeaderboard: (totalCredits: number, userId?: string) => [
    'leaderboard',
    'alltime',
    userId,
    totalCredits,
  ],
  monthlyLeaderboard: (totalCredits: number, userId?: string) => [
    'leaderboard',
    'monthly',
    userId,
    totalCredits,
  ],
};

export const useGetAppConfig = () => {
  return useQuery({
    queryKey: appKeys.appConfig,
    queryFn: getAppConfig,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
  });
};

export const useGetAllTimeLeaderBoard = () => {
  const { user, total_credits } = useAuth();
  return useQuery({
    queryKey: appKeys.allTimeLeaderboard(total_credits, user?.id),
    queryFn: getAllTimeLeaderBoard,
    enabled: Boolean(user?.id),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export const useGetMonthlyLeaderBoard = () => {
  const { user, total_credits } = useAuth();
  return useQuery({
    queryKey: appKeys.monthlyLeaderboard(total_credits, user?.id),
    queryFn: getMonthlyLeaderBoard,
    enabled: Boolean(user?.id),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export const useClaimAdReward = () => {
  return useMutation({
    mutationFn: claimAdReward,
  });
};
