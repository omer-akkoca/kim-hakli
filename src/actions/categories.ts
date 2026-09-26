import { getCategories } from '@/src/services';
import { useQuery } from '@tanstack/react-query';

export const categoryKeys = {
  all: ['categories'] as const,
};

export const useGetCategories = () => {
  const query = useQuery({
    queryKey: categoryKeys.all,
    queryFn: getCategories,
    staleTime: 1000 * 60 * 15,
  });

  return query;
};
