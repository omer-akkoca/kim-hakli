import React from 'react';
import { CreditVector, WatchVector } from '@/assets';
import { HStack } from '@/components/ui';
import { colors } from '@/src/constants';
import { useRewardedAd } from '@/src/hooks';
import { AppCard } from './AppCard';
import { AppText } from './AppText';
import { AppLoading } from './AppLoading';

const WatchAdBadge = () => {
  const { watchAndEarn, isDisabled, isLoading } = useRewardedAd();

  if (isDisabled) return <></>;

  return (
    <AppCard onPress={isDisabled ? undefined : watchAndEarn}>
      <HStack space="md" className="h-12 px-3 items-center justify-center">
        {isLoading ? (
          <AppLoading size="small" />
        ) : (
          <>
            <WatchVector width={24} height={24} color={colors.primary} />
            <AppText className="flex-1 text-headline">İzle ve kazan.</AppText>
            <HStack space="sm" className=" items-center">
              <CreditVector width={14} height={14} />
              <AppText size={12} lineHeight={14} weight={600} className="text-headline">
                +3
              </AppText>
            </HStack>
          </>
        )}
      </HStack>
    </AppCard>
  );
};

export { WatchAdBadge };
