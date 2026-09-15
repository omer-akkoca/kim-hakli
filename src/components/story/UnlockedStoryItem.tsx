import React from 'react';
import { useDispatch } from 'react-redux';
import { usePathname, useRouter } from 'expo-router';
import { CalendarVector, CreditVector, RightChevronVector } from '@/assets';
import { HStack, VStack } from '@/components/ui';
import { UnlockedStory } from '@/src/types';
import { timeAgo } from '@/src/utils';
import { setToStoryDetail } from '@/src/store';
import { useTheme } from '@/src/hooks';
import { AppText, AppCard } from '../ui';

interface UnlockedStoryItemProps {
  item: UnlockedStory;
}

const UnlockedStoryItem: React.FC<UnlockedStoryItemProps> = ({ item }) => {
  const { colors } = useTheme();
  const { push } = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch();

  const handleRoute = () => {
    dispatch(setToStoryDetail(pathName));
    push(`/story/${item.story_id}`);
  };

  return (
    <AppCard onPress={handleRoute}>
      <HStack space="sm" className="items-center p-4">
        <VStack space="md" className="flex-1">
          <AppText
            size={16}
            lineHeight={22}
            weight={600}
            color="headline"
            className="-tracking-2 flex-1"
            numberOfLines={1}
          >
            {item.title}
          </AppText>

          <HStack space="sm" className="items-center">
            <CreditVector width={14} height={14} />
            <AppText size={12} lineHeight={18} color="headline_75" className="flex-1">
              Bu hikaye için{' '}
              <AppText size={12} lineHeight={18} color="primary" weight={500}>
                {item.credits_spent}
              </AppText>{' '}
              kredi harcadın.
            </AppText>
          </HStack>
          <HStack space="sm">
            <CalendarVector width={14} height={14} color={colors.headline_50} />
            <AppText size={12} lineHeight={14} color="headline_50" className="flex-1">
              {timeAgo(item.unlocked_at)}
            </AppText>
          </HStack>
        </VStack>
        <RightChevronVector width={16} height={16} color={colors.headline_50} />
      </HStack>
    </AppCard>
  );
};

export { UnlockedStoryItem };
