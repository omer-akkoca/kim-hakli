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

type AdRewardResult = {
  success: boolean;
  remaining_ads: number;
  credit_count: number;
};

export const useRewardedAd = () => {
  const dispatch = useDispatch();
  const { show } = useToast();

  const rewardedAdRef = useRef(
    RewardedAd.createForAdRequest(ADS.rewarded),
  );

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

    const unsubscribeClosed = rewardedAd.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setIsWatching(false);
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
  }, [dispatch, show]);

  const watchAndEarn = async () => {
    if (isDisabled) {
      return;
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