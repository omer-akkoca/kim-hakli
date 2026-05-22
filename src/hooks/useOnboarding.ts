import { useEffect, useState } from 'react';
import { storage } from '@/src/utils';
import { STORAGE_KEYS } from '@/src/constants';

const useOnboarding = () => {
  const [loading, setLoading] = useState(true);
  const [hasSeen, setHasSeen] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await storage.get<boolean>(STORAGE_KEYS.HAS_SEEN_ONBOARDING);
        setHasSeen(value === true);
      } finally {
        setLoading(false);
      }
    };
    checkOnboarding();
  }, []);

  return { loading, hasSeen };
};

export { useOnboarding };
