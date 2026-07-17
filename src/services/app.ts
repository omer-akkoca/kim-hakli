import { supabase } from "../configs";
import { IAppConfig } from "../types";

export const getAppConfig = async (): Promise<IAppConfig> => {
  const { data, error } = await supabase
    .from('app_config')
    .select('version, update_message')
    .single();

  if (error) throw error;

  return data;
};