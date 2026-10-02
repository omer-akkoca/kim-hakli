import { useEffect, useRef, useState } from 'react';
import { AdEventType, RewardedAd, RewardedAdEventType } from 'react-native-google-mobile-ads';
import { ADS } from '@/src/constants';
import { useAppDispatch, increaseCredit } from '@/src/store';
import { useClaimAdReward } from '@/src/actions';
import { useToast } from './useToast';

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

  const { mutate } = useClaimAdReward();

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

        mutate(undefined, {
          onError: () => {
            show({
              type: 'error',
              title: 'Kredi eklenemedi.',
              description: 'Lütfen tekrar dene.',
            });
          },
          onSuccess: (data) => {
            if (data.success) {
              dispatch(increaseCredit(data.earned_credit));
              const title = `Tebrikler!`;
              const description = `İzleyerek +${data.earned_credit} kredi kazandın! Bugün ${data.remaining_ads} izleme hakkın kaldı.`;
              show({ type: 'credit', title, description, credit: `+${data.earned_credit}` });
            } else {
              show({
                type: 'warning',
                title: 'Günlük limite ulaştın.',
                description: 'Yarın yeniden reklam izleyerek kredi kazanabilirsin.',
              });
            }
          },
          onSettled: () => setIsRewarding(false),
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
