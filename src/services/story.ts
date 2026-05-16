import { supabase } from '@/src/configs';
import { ICategory, IStory } from '@/src/types';

export const getStories = async (): Promise<IStory[]> => {
  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message || 'Hikayeler çekilirken hata oluştu.');
  }

  return data ?? [];
};

export const getStoryImageUrl = async (path: string) => {
  const { data, error } = await supabase.storage
    .from('story-assets')
    .createSignedUrl(path, 60 * 60);

  if (error) {
    throw error;
  }

  return data.signedUrl;
};

export const getStoryById = async (storyId: string): Promise<IStory | null> => {
  const { data, error } = await supabase.from('stories').select('*').eq('id', storyId).single();

  if (error) {
    throw new Error(error.message || 'Hikaye detayı çekilirken hata oluştu.');
  }

  return data;
};

export const getStoryCategories = async (storyId: string): Promise<ICategory[]> => {
  const { data, error } = await supabase
    .from('story_categories')
    .select(
      `
      categories (
        id,
        code,
        name,
        created_at
      )
    `,
    )
    .eq('story_id', storyId);

  if (error) {
    throw new Error(error.message || 'Hikaye kategorileri çekilirken hata oluştu.');
  }

  return (
    data
      ?.map((item) => item.categories)
      .flat()
      .filter(Boolean) ?? []
  );
};
