import { useCountdown } from '@/src/hooks';
import React, { PropsWithChildren } from 'react';
import { AppCard } from '../ui/AppCard';
import { HStack, VStack } from '@/components/ui';
import { AppText } from '../ui/AppText';
import { StoryStatus } from '@/src/types';

interface StoryCountDownProps extends PropsWithChildren {
  closed_at: string | null;
  status: StoryStatus;
}

const StoryCountDown: React.FC<StoryCountDownProps> = ({ closed_at, status, children }) => {
  const countdown = useCountdown(closed_at);

  const countdownItems = countdown.isLessThan24Hours
    ? [
        { label: 'Saat', value: countdown.hours },
        { label: 'Dakika', value: countdown.minutes },
        { label: 'Saniye', value: countdown.seconds },
      ]
    : [
        { label: 'Gün', value: countdown.days },
        { label: 'Saat', value: countdown.hours },
        { label: 'Dakika', value: countdown.minutes },
      ];

  if (status === 'completed' || countdown.isFinished) {
    return children;
  }

  return (
    <HStack space="md" className="w-full">
      {countdownItems.map((item) => (
        <AppCard key={item.label} className="flex-1">
          <VStack space="md" className="items-center p-4">
            <AppText
              size={30}
              weight={700}
              lineHeight={38}
              className="text-center text-primary-500"
            >
              {String(item.value).padStart(2, '0')}
            </AppText>
            <AppText size={19} weight={500} lineHeight={25} className="text-headline text-center">
              {item.label}
            </AppText>
          </VStack>
        </AppCard>
      ))}
    </HStack>
  );
};

export { StoryCountDown };
