import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  GetStoriesParams,
  GetStoryImageUrlParams,
  HasUnlockedStoryParams,
  HasVotedStoryParams,
  SearchStoriesParams,
  UnlockStoryParams,
} from '@/src/types';
import {
  getStories,
  getStoryById,
  getStoryCategories,
  getStoryImageUrl,
  unlockStory,
  hasUnlockedStory,
  hasVotedStory,
  getStoryScenes,
  getStoryImageUrls,
  getStorySides,
  voteStory,
  getStoryVoteResults,
  searchStories,
  getFeaturedStories,
  getLatestStories,
  getMostVotedStories,
} from '@/src/services';

const storyKeys = {
  all: ['stories'] as const,
  list: (params?: GetStoriesParams) => ['stories', 'list', params] as const,
  storyCoverImage: (path: string) => ['storage', 'story-image', path] as const,
  categories: (id: string) => ['stories', id, 'categories'] as const,
  detail: (id: string) => ['stories', id] as const,
  unlocked: (userId: string, storyId: string) => ['stories', storyId, 'unlocked', userId] as const,
  hasVoted: (userId: string, storyId: string) => ['stories', storyId, 'hasVoted', userId] as const,
  unlockStory: () => ['stories', 'unlockStory'] as const,
  scenes: (id: string) => ['stories', id, 'scenes'] as const,
  storyImages: (paths: string[]) => ['storage', 'story-images', ...paths] as const,
  sides: (id: string) => ['stories', id, 'sides'] as const,
  voteResults: (storyId: string) => ['stories', storyId, 'vote-results'] as const,
  search: (query: string) => ['stories', 'search', query] as const,
  featured: () => ['stories', 'featured'] as const,
  latest: () => ['stories', 'latest'] as const,
  mostVoted: () => ['stories', 'most-voted'] as const,
};

const STORY_LIMIT = 10;

export const useGetStories = (params?: GetStoriesParams) => {
  return useInfiniteQuery({
    queryKey: storyKeys.list(params),

    queryFn: ({ pageParam = 0 }) =>
      getStories({
        ...params,
        page: pageParam,
        limit: STORY_LIMIT,
      }),

    initialPageParam: 0,

    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < STORY_LIMIT) {
        return undefined;
      }

      return allPages.length;
    },

    staleTime: 1000 * 60 * 5,
  });
};

export const useGetStoryCoverImageUrl = ({ path }: GetStoryImageUrlParams) => {
  return useQuery({
    queryKey: storyKeys.storyCoverImage(path),
    queryFn: () => getStoryImageUrl(path),
    enabled: !!path,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useGetStoryById = (id: string) => {
  return useQuery({
    queryKey: storyKeys.detail(id),
    queryFn: () => getStoryById(id),
    enabled: !!id,
  });
};

export const useGetStoryCategories = (storyId?: string) => {
  return useQuery({
    queryKey: storyKeys.categories(storyId ?? ''),
    queryFn: () => getStoryCategories(storyId!),
    enabled: !!storyId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useUnlockStory = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: storyKeys.unlockStory(),
    mutationFn: ({ storyId }: UnlockStoryParams) => unlockStory(storyId),
    onSuccess: (_, variables) => {
      if (!userId) return;
      queryClient.setQueryData(storyKeys.unlocked(userId, variables.storyId), true);
    },
  });
};

export const useHasUnlocked = ({ userId, storyId }: HasUnlockedStoryParams) => {
  return useQuery({
    queryKey: storyKeys.unlocked(userId ?? '', storyId ?? ''),
    queryFn: () => hasUnlockedStory({ userId: userId!, storyId: storyId! }),
    enabled: !!userId && !!storyId,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const useHasVoted = ({ userId, storyId }: HasVotedStoryParams) => {
  return useQuery({
    queryKey: storyKeys.hasVoted(userId ?? '', storyId ?? ''),
    queryFn: () => hasVotedStory({ userId: userId!, storyId: storyId! }),
    enabled: !!userId && !!storyId,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const useGetStoryScenes = (storyId: string) => {
  return useQuery({
    queryKey: storyKeys.scenes(storyId),
    queryFn: () => getStoryScenes(storyId),
    enabled: !!storyId,
  });
};

export const useGetStoryImageUrls = ({ paths }: { paths: string[] }) => {
  return useQuery({
    queryKey: storyKeys.storyImages(paths),
    queryFn: () => getStoryImageUrls(paths),
    enabled: paths.length > 0,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useGetStorySides = (storyId: string) => {
  return useQuery({
    queryKey: storyKeys.sides(storyId),
    queryFn: () => getStorySides(storyId),
    enabled: !!storyId,
  });
};

export const useVoteStory = (userId?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: voteStory,
    onSuccess: (_, variables) => {
      if (!userId) return;
      queryClient.setQueryData(storyKeys.hasVoted(userId, variables.storyId), true);
    },
  });
};

export const useGetStoryVoteResults = (storyId: string) => {
  return useQuery({
    queryKey: storyKeys.voteResults(storyId),
    queryFn: () => getStoryVoteResults(storyId!),
    enabled: !!storyId,
  });
};

export const useSearchStories = (params: SearchStoriesParams) => {
  return useQuery({
    queryKey: storyKeys.search(params.query),
    queryFn: () => searchStories(params),
    enabled: !!params.query.trim(),
    staleTime: 1000 * 60 * 2,
  });
};

export const useGetFeaturedStories = () => {
  return useQuery({
    queryKey: storyKeys.featured(),
    queryFn: getFeaturedStories,
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetLatestStories = () => {
  return useQuery({
    queryKey: storyKeys.latest(),
    queryFn: getLatestStories,
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetMostVotedStories = () => {
  return useQuery({
    queryKey: storyKeys.mostVoted(),
    queryFn: getMostVotedStories,
    staleTime: 1000 * 60 * 5,
  });
};