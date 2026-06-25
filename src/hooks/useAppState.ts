import { useCallback, useEffect, useState } from 'react';
import { storage } from '@/src/utils';
import { STORAGE_KEYS } from '@/src/constants';

const useAppState = () => {
  const [loading, setLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  useEffect(() => {
    const boot = async () => {
      setLoading(true);
      await checkOnboarding();
      setLoading(false);
    };
    boot();
  }, []);

  const checkOnboarding = useCallback(async () => {
    try {
      const value = await storage.get<boolean>(STORAGE_KEYS.HAS_SEEN_ONBOARDING);
      if (value) {
        setHasSeenOnboarding(value);
      } else {
        setHasSeenOnboarding(false);
      }
    } catch {
      setHasSeenOnboarding(true);
    }
  }, []);


  return { loading, hasSeenOnboarding };
};

export { useAppState };
