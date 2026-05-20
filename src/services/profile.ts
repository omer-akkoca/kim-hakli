import { DeleteAccountResponse, IUser, UnlockedStory, UserStoryStats } from '@/src/types';
import { supabase } from '@/src/configs';
import { DELETE_ACCOUNT, GET_USER_UNLOCKED_STORIES } from '../constants';

export const getProfile = async (userId: string): Promise<IUser | null> => {
  try {
    const { data: profile } = await supabase.from('users').select('*').eq('id', userId).single();
    return profile;
  } catch {
    throw new Error('Profil bilgileri çekilirken hata oluştu.');
  }
};

export const getUserStoryStats = async (): Promise<UserStoryStats> => {
  const { data, error } = await supabase.rpc('get_user_story_stats');

  if (error) throw error;

  return data as UserStoryStats;
};

export const getUserUnlockedStories = async (userId: string): Promise<UnlockedStory[]> => {
  const { data, error } = await supabase.rpc(GET_USER_UNLOCKED_STORIES, { p_user_id: userId });

  if (error) throw error;

  return data ?? [];
};

export const deleteAccount = async (): Promise<DeleteAccountResponse> => {
  const { data, error } = await supabase.functions.invoke(DELETE_ACCOUNT);

  if (error) throw error;

  return data as DeleteAccountResponse;
};