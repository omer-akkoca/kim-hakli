import { useAppSelector } from '../store';

const useAppState = () => {
  const { hasSeenOnboarding, toStoryDetail } = useAppSelector(state => state.app)

  return { hasSeenOnboarding, toStoryDetail };
};

export { useAppState };
