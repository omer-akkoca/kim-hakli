import { supabase } from '@/src/configs';
import {
  GetStoriesParams,
  HasUnlockedStoryParams,
  HasVotedStoryParams,
  ICategory,
  IStory,
  IStoryScene,
  IStorySide,
  SearchStoriesParams,
  StoryVoteResult,
  UnlockStoryResponse,
  VoteStoryResponse,
} from '@/src/types';
import { GET_STORY_VOTE_RESULTS, UNLOCK_STORY, VOTE_STORY } from '@/src/constants';

export const getStories = async (params?: GetStoriesParams ): Promise<IStory[]> => {
  let query = supabase
    .from('stories')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (params?.artStyle && params.artStyle !== 'all') {
    query = query.eq('art_style', params.artStyle);
  }

  const { data, error } = await query;

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

export const unlockStory = async (storyId: string): Promise<UnlockStoryResponse> => {
  const { data, error } = await supabase.rpc(UNLOCK_STORY, { p_story_id: storyId });
  if (error) throw error;
  return data;
};

export const hasUnlockedStory = async ({
  userId,
  storyId,
}: HasUnlockedStoryParams): Promise<boolean> => {
  const { data, error } = await supabase
    .from('user_unlocked_stories')
    .select('story_id')
    .eq('user_id', userId)
    .eq('story_id', storyId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message || 'Hikaye kilit kontrolü yapılırken hata oluştu.');
  }

  return !!data;
};

export const hasVotedStory = async ({ userId, storyId }: HasVotedStoryParams): Promise<boolean> => {
  const { data, error } = await supabase
    .from('story_votes')
    .select('story_id')
    .eq('user_id', userId)
    .eq('story_id', storyId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message || 'Oy kontrolü yapılırken hata oluştu.');
  }

  return !!data;
};

export const getStoryScenes = async (storyId: string): Promise<IStoryScene[]> => {
  const { data, error } = await supabase
    .from('story_scenes')
    .select('*')
    .eq('story_id', storyId)
    .order('scene_order', { ascending: true });

  if (error) {
    throw new Error(error.message || 'Hikaye sahneleri çekilirken hata oluştu.');
  }

  return data ?? [];
};

export const getStoryImageUrls = async (paths: string[]) => {
  const { data, error } = await supabase.storage
    .from('story-assets')
    .createSignedUrls(paths, 60 * 60);

  if (error) throw error;

  return data.map((e) => e.signedUrl ?? '');
};

export const getStorySides = async (storyId: string): Promise<IStorySide[]> => {
  const { data, error } = await supabase
    .from('story_sides')
    .select('*')
    .eq('story_id', storyId)
    .order('side_order', { ascending: true });

  if (error) {
    throw new Error(error.message || 'Hikaye tarafları çekilirken hata oluştu.');
  }

  return data ?? [];
};

export const voteStory = async ({
  storyId,
  sideId,
}: {
  storyId: string;
  sideId: string;
}): Promise<VoteStoryResponse> => {
  const { data, error } = await supabase.rpc(VOTE_STORY, {
    p_story_id: storyId,
    p_side_id: sideId,
  });

  if (error) throw error;

  return data as VoteStoryResponse;
};

export const getStoryVoteResults = async (storyId: string): Promise<StoryVoteResult[]> => {
  const { data, error } = await supabase.rpc(GET_STORY_VOTE_RESULTS, {
    p_story_id: storyId,
  });

  if (error) throw error;

  return data as StoryVoteResult[];
};

export const searchStories = async (params: SearchStoriesParams): Promise<IStory[]> => {
  const { query } = params;
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .eq('status', 'published')
    .ilike('title', `%${trimmedQuery}%`)
    .order('created_at', {
      ascending: false,
    });

  if (error) {
    throw new Error(
      error.message ||
        'Hikaye arama sırasında hata oluştu.',
    );
  }

  return data ?? [];
};