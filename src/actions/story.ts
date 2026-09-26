import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  GetStoriesParams,
  GetStoryAccessParams,
  SearchStoriesParams,
  UnlockStoryParams,
} from '@/src/types';
import {
  getStories,
  getStoryById,
  getStoryCategories,
  unlockStory,
  getStoryScenes,
  getStoryImageUrls,
  getStorySides,
  voteStory,
  searchStories,
  getHomeStories,
  getStoryAccess,
  getClosingStory,
} from '@/src/services';

const storyKeys = {
  list: (params?: GetStoriesParams) => ['stories', 'list', params] as const,
  categories: (id: string) => ['stories', id, 'categories'] as const,
  detail: (id: string) => ['stories', id] as const,
  unlockStory: () => ['stories', 'unlockStory'] as const,
  scenes: (id: string) => ['stories', id, 'scenes'] as const,
  storyImages: (paths: string[]) => ['storage', 'story-images', ...paths] as const,
  sides: (id: string) => ['stories', id, 'sides'] as const,
  search: (query: string) => ['stories', 'search', query] as const,
  homeStories: () => ['stories', 'most-voted', 'featured', 'latest'] as const,
  storyAccess: ({ storyId, userId }: GetStoryAccessParams) => [
    'story-access',
    userId ?? '',
    storyId ?? '',
  ],
  closing: (userId?: string) => ['stories', 'closing', userId ?? 'anonymous'] as const,
};

const STORY_LIMIT = 11;

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

export const useUnlockStory = (userId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: storyKeys.unlockStory(),
    mutationFn: ({ storyId }: UnlockStoryParams) => unlockStory(storyId),
    onSuccess: (_, variables) => {
      if (!userId) return;
      queryClient.setQueryData(storyKeys.storyAccess({ storyId: variables.storyId, userId }), {
        unlocked: true,
        voted: false,
      });
    },
  });
};

export const useStoryAccess = ({ storyId, userId }: GetStoryAccessParams) => {
  return useQuery({
    queryKey: storyKeys.storyAccess({ storyId, userId }),
    queryFn: () => getStoryAccess({ storyId, userId }),
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
    staleTime: 50 * 60 * 1000,
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
      queryClient.setQueryData(storyKeys.storyAccess({ storyId: variables.storyId, userId }), {
        unlocked: true,
        voted: true,
      });
    },
  });
};

export const useSearchStories = (params: SearchStoriesParams) => {
  return useQuery({
    queryKey: storyKeys.search(params.query),
    queryFn: () => searchStories(params),
    enabled: !!params.query.trim(),
    staleTime: 1000 * 60 * 2,
    placeholderData: keepPreviousData,
  });
};

export const useGetHomeStories = () => {
  return useQuery({
    queryKey: storyKeys.homeStories(),
    queryFn: getHomeStories,
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetClosingStory = (userId?: string) => {
  return useQuery({
    queryKey: storyKeys.closing(userId),
    queryFn: () => getClosingStory(userId),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
