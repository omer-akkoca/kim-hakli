import { supabase } from '@/src/configs';
import {
  StoryWithCoverUrl,
  GetStoriesParams,
  GetStoryScenesResponse,
  HasUnlockedStoryParams,
  HasVotedStoryParams,
  ICategory,
  IStory,
  IStorySide,
  SearchStoriesParams,
  StoryVoteResult,
  UnlockStoryResponse,
  VoteStoryResponse,
  StoryWithVoteCount,
} from '@/src/types';
import { GET_STORY_VOTE_RESULTS, UNLOCK_STORY, VOTE_STORY } from '@/src/constants';
import { attachSignedCoverUrls, attachSignedImageUrls } from './storage';

export const getStories = async (params?: GetStoriesParams): Promise<IStory[]> => {
  const page = params?.page ?? 0;
  const limit = params?.limit ?? 10;

  const from = page * limit;
  const to = from + limit - 1;

  let query = supabase
    .from('stories')
    .select(
      `
      *,
      story_categories!inner (
        categories!inner (
          code
        )
      )
    `,
    )
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .range(from, to);

  if (params?.artStyle && params.artStyle !== 'all') {
    query = query.eq('art_style', params.artStyle);
  }

  if (params?.categoryCode) {
    query = query.eq('story_categories.categories.code', params.categoryCode);
  }

  if (params?.creditFilter === 'free') {
    query = query.eq('credit_cost', 0);
  }

  if (params?.creditFilter === 'paid') {
    query = query.gt('credit_cost', 0);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message || 'Hikayeler çekilirken hata oluştu.');
  }

  return (data ?? []) as IStory[];
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

export const getStoryScenes = async (storyId: string): Promise<GetStoryScenesResponse[]> => {
  const { data, error } = await supabase
    .from('story_scenes')
    .select('*')
    .eq('story_id', storyId)
    .order('scene_order', {
      ascending: true,
    });

  if (error) throw new Error(error.message || 'Hikaye sahneleri çekilirken hata oluştu.');

  return await attachSignedImageUrls(data ?? []);
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
    throw new Error(error.message || 'Hikaye arama sırasında hata oluştu.');
  }

  return data ?? [];
};

export const getFeaturedStories = async (): Promise<StoryWithCoverUrl[]> => {
  const { data, error, status } = await supabase
    .from('stories')
    .select('*')
    .eq('status', 'published')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(8);
  console.log("error: ", error)
  console.log("data: ", data)
    console.log("status: ", status)

  if (error) throw new Error(error.message || 'Öne çıkan hikayeler çekilirken hata oluştu.');

  return await attachSignedCoverUrls(data ?? []);
};

export const getLatestStories = async (): Promise<StoryWithCoverUrl[]> => {
  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(6);

  if (error) throw new Error(error.message || 'Son eklenen hikayeler çekilirken hata oluştu.');

  return await attachSignedCoverUrls(data ?? []);
};

export const getMostVotedStories = async (): Promise<StoryWithVoteCount[]> => {
  const { data, error } = await supabase.rpc('get_most_voted_stories');

  const defaultMessage = 'En çok oy alan hikayeler çekilirken hata oluştu.';
  if (error) throw new Error(error.message || defaultMessage,);

  return await attachSignedCoverUrls(data ?? []);
};