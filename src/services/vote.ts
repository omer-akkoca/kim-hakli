import { supabase } from '@/src/configs';
import { VoteHistory } from '@/src/types';
import { GET_USER_VOTE_HISTORY } from '@/src/constants';

export const getVoteHistory = async (userId: string): Promise<VoteHistory[]> => {
  const { data, error } = await supabase.rpc(GET_USER_VOTE_HISTORY, {
    p_user_id: userId,
  });

  if (error) {
    throw error;
  }

  return data ?? [];
};
