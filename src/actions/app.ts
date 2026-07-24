import { useQuery } from '@tanstack/react-query';
import { getAppConfig, getLeaderBoard } from '@/src/services';

const appKeys = {
  appConfig: ['app-config'],
  leaderboard: ['leaderboard'],
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
  return useQuery({
    queryKey: appKeys.leaderboard,
    queryFn: getLeaderBoard,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
