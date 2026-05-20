import { useQuery } from '@tanstack/react-query';
import { getFaqs } from '@/src/services/faq';

const queryKeys = {
  faqs: ['faqs'] as const,
};

export const useGetFaqs = () => {
  return useQuery({
    queryKey: queryKeys.faqs,
    queryFn: getFaqs,
    staleTime: 1000 * 60 * 60,
  });
};
