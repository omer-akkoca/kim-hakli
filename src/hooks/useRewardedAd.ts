import { useEffect, useRef, useState } from 'react';
import { AdEventType, RewardedAd, RewardedAdEventType } from 'react-native-google-mobile-ads';
import { ADS } from '@/src/constants';
import { supabase } from '@/src/configs';
import { useToast } from '@/src/hooks/';
import { useAppDispatch, increaseCredit } from '@/src/store';

type AdRewardResult = {
  success: boolean;
  remaining_ads: number;
  credit_count: number;
};

const REWARDED_AD_MAX_AGE_MS = 55 * 60 * 1000;

export const useRewardedAd = () => {
  const dispatch = useAppDispatch();
  const { show } = useToast();

  const rewardedAdRef = useRef(RewardedAd.createForAdRequest(ADS.rewarded));

  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isWatching, setIsWatching] = useState(false);
  const [isRewarding, setIsRewarding] = useState(false);

  const isLoading = isWatching || isRewarding;
  const isDisabled = !isLoaded || isLoading;

  useEffect(() => {
    const rewardedAd = rewardedAdRef.current;

    const clearRefreshTimer = () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
        refreshTimerRef.current = null;
      }
    };

    const loadAd = () => {
      clearRefreshTimer();
      setIsLoaded(false);
      rewardedAd.load();
    };

    const unsubscribeLoaded = rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setIsLoaded(true);

      clearRefreshTimer();

      refreshTimerRef.current = setTimeout(() => {
        loadAd();
      }, REWARDED_AD_MAX_AGE_MS);
    });

    const unsubscribeReward = rewardedAd.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      async () => {
        setIsRewarding(true);

        const { data, error } = await supabase.rpc('claim_ad_reward');

        setIsRewarding(false);

        if (error) {
          show({
            type: 'error',
            title: 'Kredi eklenemedi.',
            description: 'Lütfen tekrar dene.',
          });
          return;
        }

        const result = data as AdRewardResult;

        if (result.success) {
          dispatch(increaseCredit(3));
          show({
            type: 'success',
            title: '+3 kredi kazandın!',
            description: `Bugün ${result.remaining_ads} reklam hakkın kaldı.`,
          });
          return;
        }

        show({
          type: 'warning',
          title: 'Günlük limite ulaştın.',
          description: 'Yarın yeniden reklam izleyerek kredi kazanabilirsin.',
        });
      },
    );

    const unsubscribeClosed = rewardedAd.addAdEventListener(AdEventType.CLOSED, () => {
      setIsWatching(false);
      loadAd();
    });

    const unsubscribeError = rewardedAd.addAdEventListener(AdEventType.ERROR, () => {
      clearRefreshTimer();
      setIsWatching(false);
      setIsLoaded(false);
    });

    loadAd();

    return () => {
      clearRefreshTimer();
      unsubscribeLoaded();
      unsubscribeReward();
      unsubscribeClosed();
      unsubscribeError();
    };
  }, [dispatch, show]);

  const watchAndEarn = async () => {
    if (isDisabled) return;

    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }

    setIsWatching(true);
    setIsLoaded(false);

    try {
      await rewardedAdRef.current.show();
    } catch {
      setIsWatching(false);
      rewardedAdRef.current.load();
    }
  };

  return {
    watchAndEarn,
    isLoading,
    isDisabled,
  };
};
