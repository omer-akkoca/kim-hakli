import { useQuery } from '@tanstack/react-query';
import { getAppConfig, getLeaderBoard } from '@/src/services';
import { useAuth } from '@/src/hooks';

const appKeys = {
  appConfig: ['app-config'],
  leaderboard: (userId?: string) => ['leaderboard', userId],
};

export const useGetAppConfig = () => {
  return useQuery({
    queryKey: appKeys.appConfig,
    queryFn: getAppConfig,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const useGetLeaderBoard = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: appKeys.leaderboard(user?.id),
    queryFn: getLeaderBoard,
    enabled: Boolean(user?.id),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};
