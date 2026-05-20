import { supabase } from '@/src/configs';
import { IFaq } from '@/src/types';

export const getFaqs = async (): Promise<IFaq[]> => {
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('is_active', true)
    .order('display_order', {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data ?? [];
};
