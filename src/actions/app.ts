import { useQuery } from '@tanstack/react-query';
import { getAppConfig } from '../services';

const appKeys = {
    appConfig: ['app-config']
};

export const useGetAppConfig = () => {
  return useQuery({
    queryKey: appKeys.appConfig,
    queryFn: getAppConfig,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};