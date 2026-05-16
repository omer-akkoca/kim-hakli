import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/src/services';

export const categoryKeys = {
  all: ['categories'] as const,
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 15,
  });
};
