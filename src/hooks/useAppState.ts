import { useAppSelector } from '@/src/store';

const useAppState = () => {
  const { hasSeenOnboarding, toStoryDetail, hasSeenReward, refCode } = useAppSelector(state => state.app)

  return { hasSeenOnboarding, toStoryDetail, hasSeenReward, refCode };
};

export { useAppState };
