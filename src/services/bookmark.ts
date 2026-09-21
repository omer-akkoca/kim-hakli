import { supabase } from '@/src/configs';
import { BookmarkParams, IStory } from '../types';

export const getBookmarkedStoryIds = async (userId: string): Promise<string[]> => {
  const { data, error } = await supabase
    .from('saved_stories')
    .select('story_id')
    .eq('user_id', userId);

  if (error) {
    throw error;
  }

  console.log(data);

  return data.map((item) => item.story_id);
};

export const addBookmarkStory = async ({ userId, storyId }: BookmarkParams) => {
  const { error } = await supabase.from('saved_stories').insert({
    user_id: userId,
    story_id: storyId,
  });

  if (error) {
    throw error;
  }

  return storyId;
};

export const removeBookmarkStory = async ({ userId, storyId }: BookmarkParams) => {
  const { error } = await supabase
    .from('saved_stories')
    .delete()
    .eq('user_id', userId)
    .eq('story_id', storyId);

  if (error) {
    throw error;
  }

  return storyId;
};

export const getStoriesByIds = async (storyIds: string[]): Promise<IStory[]> => {
  if (storyIds.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from('stories')
    .select(
      `
      id,
      title,
      description,
      art_style,
      credit_cost,
      status,
      is_featured,
      created_at,
      updated_at,
      cover_image_path
    `,
    )
    .in('id', storyIds);

  if (error) {
    throw error;
  }

  return data as IStory[];
};
