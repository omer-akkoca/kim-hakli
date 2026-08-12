import { supabase } from "../configs";
import { GetLeaderBoardResponse, IAppConfig, ILeaderBoardUser } from "../types";
import { mapLeaderBoardProfiles } from "./storage";

export const getAppConfig = async (): Promise<IAppConfig> => {
  const { data, error } = await supabase
    .from('app_config')
    .select('version, latest_version, minimum_required_version, update_message, android_version, ios_version')
    .single();

  if (error) throw error;

  return data;
};


export const getLeaderBoard = async (): Promise<GetLeaderBoardResponse> => {
  const { data, error } = await supabase.rpc('get_leaderboard', {
    p_limit: 10,
  });

  if (error) throw error;

  const leaderboard = await mapLeaderBoardProfiles((data.leaderboard ?? []) as ILeaderBoardUser[])

  return {
    current_user_rank: data.current_user_rank,
    leaderboard,
  };
};