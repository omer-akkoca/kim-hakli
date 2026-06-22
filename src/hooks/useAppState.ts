import { useCallback, useEffect, useState } from 'react';
import { storage } from '@/src/utils';
import { STORAGE_KEYS } from '@/src/constants';

const useAppState = () => {
  const [loading, setLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [referralSource, setReferralSource] = useState(false);

  useEffect(() => {
    const boot = async () => {
      setLoading(true);
      await checkOnboarding();
      await checkReferralSource();
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

  const checkReferralSource = useCallback(async () => {
    try {
      const value = await storage.get<boolean>(STORAGE_KEYS.REFERRAL_SOURCE);
      if (value) {
        setReferralSource(value);
      } else {
        setReferralSource(false);
      }
    } catch {
      setReferralSource(false);
    }
  }, []);

  return { loading, hasSeenOnboarding, referralSource };
};

export { useAppState };
