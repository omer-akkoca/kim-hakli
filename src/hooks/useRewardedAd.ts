import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
} from 'react-native-google-mobile-ads';

import { ADS } from '@/src/constants';
import { supabase } from '@/src/configs';
import { useToast } from '@/src/hooks/useToast';
import { increaseCredit } from '@/src/store/slices/authSlice';
import { useReward } from './useReward';

type AdRewardResult = {
  success: boolean;
  remaining_ads: number;
  credit_count: number;
};

export const useRewardedAd = () => {
  const dispatch = useDispatch();
  const { show } = useToast();
  const { showReward } = useReward();

  const rewardedAdRef = useRef(
    RewardedAd.createForAdRequest(ADS.rewarded),
  );

  const adClosedRef = useRef(false);
  const shouldShowRewardRef = useRef(false);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isWatching, setIsWatching] = useState(false);
  const [isRewarding, setIsRewarding] = useState(false);

  const isLoading = isWatching || isRewarding;
  const isDisabled = !isLoaded || isLoading;

  useEffect(() => {
    const rewardedAd = rewardedAdRef.current;

    const loadAd = () => {
      setIsLoaded(false);
      rewardedAd.load();
    };

    const showRewardAfterAdClosed = () => {
      if (!adClosedRef.current || !shouldShowRewardRef.current) {
        return;
      }

      shouldShowRewardRef.current = false;

      setTimeout(() => {
        showReward({ amount: 3 });
      }, 350);
    };

    const unsubscribeLoaded = rewardedAd.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setIsLoaded(true);
      },
    );

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

          shouldShowRewardRef.current = true;
          showRewardAfterAdClosed();

          return;
        }

        show({
          type: 'warning',
          title: 'Günlük limite ulaştın.',
          description: 'Yarın yeniden reklam izleyerek kredi kazanabilirsin.',
        });
      },
    );

    const unsubscribeClosed = rewardedAd.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        adClosedRef.current = true;
        setIsWatching(false);

        showRewardAfterAdClosed();
        loadAd();
      },
    );

    const unsubscribeError = rewardedAd.addAdEventListener(
      AdEventType.ERROR,
      () => {
        setIsWatching(false);
        setIsLoaded(false);
      },
    );

    loadAd();

    return () => {
      unsubscribeLoaded();
      unsubscribeReward();
      unsubscribeClosed();
      unsubscribeError();
    };
  }, [dispatch, show, showReward]);

  const watchAndEarn = async () => {
    if (isDisabled) {
      return;
    }

    adClosedRef.current = false;
    shouldShowRewardRef.current = false;

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