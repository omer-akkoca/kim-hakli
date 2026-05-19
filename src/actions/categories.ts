import { useEffect } from 'react';
import { getCategories } from '@/src/services';
import { setCategories, useAppDispatch } from '@/src/store';
import { useQuery } from '@tanstack/react-query';

export const categoryKeys = {
  all: ['categories'] as const,
};

export const useGetCategories = () => {
  const dispatch = useAppDispatch();

  const query = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 15,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      dispatch(setCategories(query.data));
    }
  }, [query.isSuccess, query.data, dispatch]);

  return query;
};
