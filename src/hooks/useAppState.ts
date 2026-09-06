import { useAppSelector } from '@/src/store';

const useAppState = () => {
  const { hasSeenOnboarding, toStoryDetail, hasSeenReward } = useAppSelector(state => state.app)

  return { hasSeenOnboarding, toStoryDetail, hasSeenReward };
};

export { useAppState };
