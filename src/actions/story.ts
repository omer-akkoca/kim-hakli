import { useMutation, useQuery } from '@tanstack/react-query';
import {
  GetStoriesParams,
  GetStoryImageUrlParams,
  HasUnlockedStoryParams,
  HasVotedStoryParams,
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
} from '@/src/services';

export const storyKeys = {
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
};

export const useGetStories = (params?: GetStoriesParams) => {
  return useQuery({
    queryKey: storyKeys.list(params),
    queryFn: () => getStories(params),
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

export const useUnlockStory = () => {
  return useMutation({
    mutationKey: storyKeys.unlockStory(),
    mutationFn: ({ storyId }: UnlockStoryParams) => unlockStory(storyId),
  });
};

export const useHasUnlockedStory = ({ userId, storyId }: HasUnlockedStoryParams) => {
  return useQuery({
    queryKey: storyKeys.unlocked(userId ?? '', storyId ?? ''),
    queryFn: () => hasUnlockedStory({ userId: userId!, storyId: storyId! }),
    enabled: !!userId && !!storyId,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: 'always',
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });
};

export const useHasVoted = ({ userId, storyId }: HasVotedStoryParams) => {
  return useQuery({
    queryKey: storyKeys.hasVoted(userId, storyId),
    queryFn: () => hasVotedStory({ userId, storyId }),
    enabled: !!userId && !!storyId,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: 'always',
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
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

export const useVoteStory = () => {
  return useMutation({ mutationFn: voteStory });
};

export const useGetStoryVoteResults = (storyId: string) => {
  return useQuery({
    queryKey: storyKeys.voteResults(storyId),
    queryFn: () => getStoryVoteResults(storyId!),
    enabled: !!storyId,
  });
};
