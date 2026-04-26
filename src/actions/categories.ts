import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../services';

export const categoryKeys = {
  all: ['categories'] as const,
};

export const useCategories = () => {
  return useQuery({
    queryKey: categoryKeys.all,
    queryFn: () => getCategories(),
    staleTime: 1000 * 60 * 60,
  });
};
