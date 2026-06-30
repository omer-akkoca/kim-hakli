import { supabase } from '@/src/configs';
import {
  DeleteAccountResponse,
  IUser,
  UnlockedStory,
  UpdateProfileParams,
  UpdateReferralSourceParams,
  UserStoryStats,
} from '@/src/types';
import { DELETE_ACCOUNT, GET_USER_UNLOCKED_STORIES } from '@/src/constants';
import { uploadAvatar } from './storage';

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

export const updateReferralSource = async ({
  userId,
  referralSource,
}: UpdateReferralSourceParams) => {
  const { data, error } = await supabase
    .from('users')
    .update({
      referral_source: referralSource,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)
    .select('*')
    .single();

  if (error) throw new Error(error.message || 'Bilgi güncellenirken hata oluştu.');

  return data;
};

export const updateProfile = async ({
  userId,
  fullName,
  photo,
}: UpdateProfileParams): Promise<IUser> => {
  const payload: {
    full_name: string;
    avatar_path?: string | null;
    updated_at: string;
  } = {
    full_name: fullName,
    updated_at: new Date().toISOString(),
  };

  if (photo !== undefined) {
    const avatarPath = await uploadAvatar(userId, photo);
    payload.avatar_path = avatarPath;
  }

  const { data, error } = await supabase
    .from('users')
    .update(payload)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message || 'Profil güncellenemedi.');
  }

  return data;
};

export const getAvatarUrl = async (avatarPath: string): Promise<string> => {
  const { data, error } = await supabase.storage
    .from('avatars')
    .createSignedUrl(avatarPath, 60 * 60);

  if (error) {
    throw new Error(error.message || 'Profil fotoğrafı alınamadı.');
  }

  return data.signedUrl;
};