import { supabase } from '../configs';
import { GET_ALL_TIME_LEADERBOARD, GET_MONTHLY_LEADERBOARD } from '../constants';
import { GetLeaderBoardResponse, IAppConfig } from '../types';
import { mapLeaderBoardProfiles } from './storage';

export const getAppConfig = async (): Promise<IAppConfig> => {
  const { data, error } = await supabase
    .from('app_config')
    .select(
      'version, latest_version, minimum_required_version, update_message, android_version, ios_version',
    )
    .single();

  if (error) throw error;

  return data;
};

export const getAllTimeLeaderBoard = async (): Promise<GetLeaderBoardResponse> => {
  const { data, error } = await supabase.rpc(GET_ALL_TIME_LEADERBOARD);

  if (error) throw error;

  const leaderboard = await mapLeaderBoardProfiles(data?.leaderboard ?? []);

  const [currentUser] = await mapLeaderBoardProfiles(data?.current_user ? [data.current_user] : []);

  return {
    leaderboard,
    current_user: currentUser ?? null,
  };
};

export const getMonthlyLeaderBoard = async (): Promise<GetLeaderBoardResponse> => {
  const { data, error } = await supabase.rpc(GET_MONTHLY_LEADERBOARD);

  if (error) throw error;

  const leaderboard = await mapLeaderBoardProfiles(data?.leaderboard ?? []);

  const [currentUser] = await mapLeaderBoardProfiles(data?.current_user ? [data.current_user] : []);

  return {
    leaderboard,
    current_user: currentUser ?? null,
  };
};