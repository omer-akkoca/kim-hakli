import { supabase } from '@/src/configs';
import { VoteHistory } from '@/src/types';
import { GET_MY_STORY_VOTE_SIDE_ID, GET_USER_VOTE_HISTORY } from '@/src/constants';

export const getVoteHistory = async (userId: string): Promise<VoteHistory[]> => {
  const { data, error } = await supabase.rpc(GET_USER_VOTE_HISTORY, {
    p_user_id: userId,
  });

  if (error) {
    throw error;
  }

  return data ?? [];
};

export const getVotedStorySideId = async (storyId?: string): Promise<string> => {
  const { data, error } = await supabase.rpc(GET_MY_STORY_VOTE_SIDE_ID, {
    p_story_id: storyId,
  });

  if (error) {
    throw error;
  }

  return data ?? null;
};
