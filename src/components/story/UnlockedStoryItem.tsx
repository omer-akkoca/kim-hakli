import React from 'react';
import { AppCard } from '../ui/AppCard';
import { HStack, VStack } from '@/components/ui';
import { AppText } from '../ui/AppText';
import { UnlockedStory } from '@/src/types';
import { CalendarVector, CreditVector, RightChevronVector } from '@/assets';
import { colors } from '@/src/constants';
import { timeAgo } from '@/src/utils';
import { useRouter } from 'expo-router';

interface UnlockedStoryItemProps {
  item: UnlockedStory;
}

const UnlockedStoryItem: React.FC<UnlockedStoryItemProps> = ({ item }) => {
  const { push } = useRouter();
  return (
    <AppCard onPress={() => push(`/story/${item.story_id}`)}>
      <HStack space="sm" className="items-center p-4">
        <VStack space="md" className="flex-1">
          <AppText
            size={16}
            lineHeight={22}
            weight={600}
            className="text-headline -tracking-2 flex-1"
            numberOfLines={1}
          >
            {item.title}
          </AppText>

          <HStack space="sm" className="items-center">
            <CreditVector width={14} height={14} />
            <AppText size={12} lineHeight={18} className="text-whiteSmoke-500/75 flex-1">
              Bu hikaye için{' '}
              <AppText size={12} lineHeight={18} className="text-primary-500" weight={500}>
                {item.credits_spent}
              </AppText>{' '}
              kredi harcadın.
            </AppText>
          </HStack>
          <HStack space="sm">
            <CalendarVector width={14} height={14} color={colors.whiteSmoke_50} />
            <AppText size={12} lineHeight={14} className="flex-1 text-whiteSmoke-500/50">
              {timeAgo(item.unlocked_at)}
            </AppText>
          </HStack>
        </VStack>
        <RightChevronVector width={16} height={16} color={colors.whiteSmoke_50} />
      </HStack>
    </AppCard>
  );
};

export { UnlockedStoryItem };
