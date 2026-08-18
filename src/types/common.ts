import { CREDIT_FILTERS } from '../constants/values';

export interface ICategory {
  id: string;
  code: string;
  name: string;
  created_at: string;
}

export interface IFaq {
  id: string;
  question: string;
  answer: string;
  display_order: number;
}

export type CreditFilter = (typeof CREDIT_FILTERS)[number]['value'];

export type ToastType = 'error' | 'success';
export type ShowToastProps = {
  type?: ToastType;
  title: string;
  description: string;
  duration?: number;
};

export interface IAppConfig {
  version: string;
  latest_version: string;
  minimum_required_version: string;
  update_message: string;
  android_version: string;
  ios_version: string;
}

export interface ILeaderBoardUser {
  id: string;
  full_name: string;
  avatar_path?: string;
  avatar_url?: string;
  credit_count: number;
  order: number;
}

export interface ILeaderBoardProfile {
  id: string;
  full_name: string;
  credit_count: number;
  avatar?: string | null;
  order: number;
}

export type leaderBoardPeriod = 'all' | 'month'; 