import { supabase } from '@/src/configs';
import {
  GetStoriesParams,
  GetStoryScenesResponse,
  ICategory,
  IStory,
  IStorySide,
  SearchStoriesParams,
  StoryVoteResult,
  UnlockStoryResponse,
  VoteStoryResponse,
  GetStoryAccessParams,
  GetStoryAccessResponse,
  GetHomeStoriesResponse,
  StoryWithVoteCount,
  GetStoryImagesResponse,
} from '@/src/types';
import {
  GET_HOME_STORIES,
  GET_STORY_ACCESS,
  GET_STORY_VOTE_RESULTS,
  UNLOCK_STORY,
  VOTE_STORY,
} from '@/src/constants';
import { attachSignedImageUrls } from './storage';

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
    .in('status', ['published', 'closing', 'completed'])
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

export const getStoryImageUrls = async (paths: string[]): Promise<GetStoryImagesResponse[]> => {
  const { data, error } = await supabase.storage
    .from('story-assets')
    .createSignedUrls(paths, 60 * 60);

  if (error) throw error;

  const value = data.map((e) => ({ path: e.path!, signedUrl: e.signedUrl! }));

  return value;
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
    .in('status', ['published', 'closing', 'completed'])
    .ilike('title', `%${trimmedQuery}%`)
    .order('created_at', {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message || 'Hikaye arama sırasında hata oluştu.');
  }

  return data ?? [];
};

export const getHomeStories = async (): Promise<GetHomeStoriesResponse> => {
  const { data, error } = await supabase.rpc(GET_HOME_STORIES);

  const defaultMessage = 'Hikayeler çekilirken hata oluştu.';
  if (error) throw new Error(error.message || defaultMessage);

  return data;
};

export const getStoryAccess = async (
  params: GetStoryAccessParams,
): Promise<GetStoryAccessResponse> => {
  const { data, error } = await supabase
    .rpc(GET_STORY_ACCESS, { p_story_id: params.storyId })
    .single();

  const defaultMessage = 'Hikaye erişim bilgileriniz çekilirken bir hata meydana geldi';
  if (error) throw new Error(error.message || defaultMessage);

  return data as GetStoryAccessResponse;
};

export const getClosingStory = async (userId?: string): Promise<StoryWithVoteCount | null> => {
  const { data, error } = await supabase
    .rpc('get_closing_story', {
      p_user_id: userId,
    })
    .single();

  if (error) throw error;

  return data as StoryWithVoteCount | null;
};
