import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getStories,
  getStoryById,
  hasVoted,
  isStoryUnlocked,
  unlockStoryFunction,
} from '@/src/services';
import { GetStoriesParams } from '../types';

export const storyKeys = {
  all: ['stories'] as const,
  list: (params?: GetStoriesParams) => ['stories', 'list', params] as const,
  detail: (id: string) => ['stories', id] as const,
  scenes: (id: string) => ['stories', id, 'scenes'] as const,
  unlocked: (userId: string, storyId: string) => ['stories', storyId, 'unlocked', userId] as const,
  hasVoted: (userId: string, storyId: string) => ['stories', storyId, 'hasVoted', userId] as const,
  unlockStory: (storyId: string) => ['stories', storyId, 'unlockStory'] as const,
};

export const useStories = (params?: GetStoriesParams) => {
  return useQuery({
    queryKey: storyKeys.list(params),
    queryFn: () => getStories(params),
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

export const useIsStoryUnlocked = (userId: string, storyId: string) => {
  return useQuery({
    queryKey: storyKeys.unlocked(userId, storyId),
    queryFn: () => isStoryUnlocked(userId, storyId),
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

export const useUnlockStory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ storyId }: { storyId: string }) => unlockStoryFunction({ storyId }),
    onSuccess: async (_, { storyId }) => {
      const keysToInvalidate = [storyKeys.detail(storyId), storyKeys.unlockStory(storyId)];
      await Promise.all(
        keysToInvalidate.map((queryKey) => queryClient.invalidateQueries({ queryKey })),
      );
    },
  });
};
