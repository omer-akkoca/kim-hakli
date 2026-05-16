import { supabase } from '@/src/configs';
import { ICategory } from '@/src/types';

export const getCategories = async (): Promise<ICategory[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    throw new Error(error.message || 'Kategoriler çekilirken hata oluştu.');
  }

  return data ?? [];
};
