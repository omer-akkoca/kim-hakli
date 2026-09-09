import { useQuery } from '@tanstack/react-query';
import { getVotedStorySideId, getVoteHistory } from '../services';
import { useAppSelector } from '../store';

const storyKeys = {
  voteHistory: (userId: string) => ['stories', 'vote-history', userId] as const,
  getVotedSideId: (storyId?: string, userId?: string) => ['getVotedSideId', userId, storyId] as const,
};

export const useGeVoteHistory = () => {
  const user = useAppSelector((state) => state.auth.user);
  const userId = user ? user.id : '';
  return useQuery({
    queryKey: storyKeys.voteHistory(userId ?? ''),
    queryFn: () => getVoteHistory(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};

export const useGetVotedStorySideId = (storyId?: string, userId?: string,) => {
  return useQuery({
    queryKey: storyKeys.getVotedSideId(storyId, userId),
    queryFn: () => getVotedStorySideId(storyId),
    enabled: !!userId && !!storyId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};
