import React from 'react';
import { RightChevronVector, WatchVector } from '@/assets';
import { HStack } from '@/components/ui';
import { useRewardedAd, useTheme } from '@/src/hooks';
import { AppCard } from './AppCard';
import { AppText } from './AppText';
import { AppLoading } from './AppLoading';

const WatchAdBadge = () => {
  const { colors } = useTheme();
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
            <AppText color="headline" className="flex-1">
              İzle ve kazan.
            </AppText>

            <RightChevronVector width={12} height={12} color={colors.headline} />
          </>
        )}
      </HStack>
    </AppCard>
  );
};

export { WatchAdBadge };
