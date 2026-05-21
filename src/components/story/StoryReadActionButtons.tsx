import React, { useCallback } from 'react';
import { Box, HStack } from '@/components/ui';
import { readActionBarHeight } from '@/src/constants';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../ui/AppText';
import { ChartVector, CrossVector, VoteVector } from '@/assets';
import { useHasVoted } from '@/src/actions';
import { useAppSelector } from '@/src/store';
import { useFocusEffect, useRouter } from 'expo-router';
import { DetailIconButton, DetailPrimaryButton } from './DetailButton';

interface StoryReadActionButtonsProps {
  storyId: string;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  length: number;
}

const StoryReadActionButtons: React.FC<StoryReadActionButtonsProps> = ({
  storyId,
  activeIndex,
  length,
}) => {
  const { push, back } = useRouter();
  const { bottom } = useSafeAreaInsets();

  const { user } = useAppSelector((state) => state.auth);

  const { mutateAsync: hasVoted, data: voted, isPending: votedLoading = true } = useHasVoted();

  useFocusEffect(
    useCallback(() => {
      const checkStoryStatus = async () => {
        if (!user?.id || !storyId) return;
        await hasVoted({ userId: user.id, storyId });
      };
      checkStoryStatus();
    }, [user?.id, storyId]),
  );

  const handleNavigate = () => {
    if (voted) {
      push(`/story/voteResult/${storyId}`);
    } else {
      push(`/story/vote/${storyId}`);
    }
  };

  return (
    <Box
      className="w-full bg-dreamless-sleep/75 border-t border-white/10 overflow-hidden"
      style={{ height: readActionBarHeight + bottom }}
    >
      <Box className="flex-1  bg-bottom-nav-bar">
        <BlurView intensity={18} tint="dark" className="flex-1">
          <HStack
            className="flex-1 items-center justify-center px-4"
            style={{ marginBottom: bottom }}
            space="lg"
          >
            <Box className="items-center justify-center">
              <DetailIconButton icon={CrossVector} onPress={back} />
            </Box>
            <DetailPrimaryButton
              icon={voted ? ChartVector : VoteVector}
              label={voted ? 'Sonucu Gör' : 'Kim Haklı Oy Ver'}
              onPress={handleNavigate}
              loading={votedLoading}
            />
            <Box className="items-center justify-center" style={{ width: 52 }}>
              <AppText size={14} weight={600} className="text-headline">
                {activeIndex + 1}/{length}
              </AppText>
            </Box>
          </HStack>
        </BlurView>
      </Box>
    </Box>
  );
};

export { StoryReadActionButtons };
