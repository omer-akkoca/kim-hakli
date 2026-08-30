import { useContext } from 'react';

import { RewardContext } from '@/src/contexts/';

const useReward = () => {
  const context = useContext(RewardContext);

  if (!context) {
    throw new Error('useReward, RewardProvider içinde kullanılmalıdır.');
  }

  return context;
};

export { useReward };