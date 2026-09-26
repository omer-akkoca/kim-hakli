import { useQuery } from '@tanstack/react-query';
import { getStoryVoteResults, getVotedStorySideId, getVoteHistory } from '@/src/services';

export const voteKeys = {
  voteResults: (storyId: string) => ['stories', storyId, 'vote-results'] as const,
  voteHistory: (userId?: string) => ['stories', 'vote-history', userId] as const,
  getVotedSideId: (storyId?: string, userId?: string) =>
    ['vote', 'voted-side', storyId, userId] as const,
};

export const useGetStoryVoteResults = (storyId: string) => {
  return useQuery({
    queryKey: voteKeys.voteResults(storyId),
    queryFn: () => getStoryVoteResults(storyId!),
    enabled: !!storyId,
  });
};

export const useGetVoteHistory = (userId?: string) => {
  return useQuery({
    queryKey: voteKeys.voteHistory(userId),
    queryFn: () => getVoteHistory(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};

export const useGetVotedStorySideId = (storyId?: string, userId?: string) => {
  return useQuery({
    queryKey: voteKeys.getVotedSideId(storyId, userId),
    queryFn: () => getVotedStorySideId(storyId),
    enabled: !!userId && !!storyId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};
