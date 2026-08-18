import { useQuery } from '@tanstack/react-query';
import { getAllTimeLeaderBoard, getAppConfig, getMonthlyLeaderBoard } from '@/src/services';
import { useAuth } from '@/src/hooks/useAuth';

const appKeys = {
  appConfig: ['app-config'],
  leaderboard: (userId?: string) => ['leaderboard', userId],
  allTimeLeaderboard: (userId?: string) => ['leaderboard', "alltime", userId],
  monthlyLeaderboard: (userId?: string) => ['leaderboard', "montly", userId, ],
};

export const useGetAppConfig = () => {
  return useQuery({
    queryKey: appKeys.appConfig,
    queryFn: getAppConfig,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const useGetAllTimeLeaderBoard = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: appKeys.allTimeLeaderboard(user?.id),
    queryFn: getAllTimeLeaderBoard,
    enabled: Boolean(user?.id),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export const useGetMonthlyLeaderBoard = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: appKeys.monthlyLeaderboard(user?.id),
    queryFn: getMonthlyLeaderBoard,
    enabled: Boolean(user?.id),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

