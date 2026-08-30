import { createContext } from 'react';

export interface RewardData {
  amount: number;
}

export interface RewardContextValue {
  reward: RewardData | null;
  showReward: (data: RewardData, onSuccess?: () => void) => void;
  hideReward: () => void;
}

export const RewardContext = createContext<RewardContextValue | null>(null);