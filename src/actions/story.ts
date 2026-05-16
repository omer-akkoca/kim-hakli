import { useMutation, useQuery } from '@tanstack/react-query';
import {
  GetStoriesParams,
  GetStoryImageUrlParams,
  HasUnlockedStoryParams,
  UnlockStoryParams,
} from '@/src/types';
import {
  hasVoted,
  getStories,
  getStoryById,
  getStoryCategories,
  getStoryImageUrl,
  unlockStory,
  hasUnlockedStory,
} from '@/src/services';

export const storyKeys = {
  all: ['stories'] as const,
  list: (params?: GetStoriesParams) => ['stories', 'list', params] as const,
  storyCoverImage: (path: string) => ['storage', 'story-image', path] as const,
  categories: (id: string) => ['stories', id, 'categories'] as const,
  detail: (id: string) => ['stories', id] as const,
  scenes: (id: string) => ['stories', id, 'scenes'] as const,
  unlocked: (userId: string, storyId: string) => ['stories', storyId, 'unlocked', userId] as const,
  hasVoted: (userId: string, storyId: string) => ['stories', storyId, 'hasVoted', userId] as const,
  unlockStory: () => ['stories', 'unlockStory'] as const,
};

export const useGetStories = () => {
  return useQuery({
    queryKey: ['stories'],
    queryFn: () => getStories(),
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetStoryCoverImageUrl = ({ path }: GetStoryImageUrlParams) => {
  return useQuery({
    queryKey: storyKeys.storyCoverImage(path),
    queryFn: () => getStoryImageUrl(path),
    enabled: !!path,
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
  });
};

export const useHasVoted = (userId: string, storyId: string) => {
  return useQuery({
    queryKey: storyKeys.hasVoted(userId, storyId),
    queryFn: () => hasVoted(userId, storyId),
    enabled: !!userId && !!storyId,
  });
};
