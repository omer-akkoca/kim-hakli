import React from 'react';
import { Box, HStack } from '@/components/ui';
import { AppText } from '../ui/AppText';
import { ChartVector, CrossVector, VoteVector } from '@/assets';
import { useHasVoted } from '@/src/actions';
import { useRouter } from 'expo-router';
import { DetailIconButton, DetailPrimaryButton } from './DetailButton';
import { storyReadActionBarHeight } from '@/src/constants';
import { useAuth } from '@/src/hooks';

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

  const { user } = useAuth();

  const { data: voted, isPending: votedLoading = true } = useHasVoted({
    storyId,
    userId: user?.id,
  });

  const handleNavigate = () => {
    if (voted) {
      push(`/story/voteResult/${storyId}`);
    } else {
      push(`/story/vote/${storyId}`);
    }
  };

  return (
    <HStack space="lg" className="px-4" style={{ height: storyReadActionBarHeight }}>
      <Box className="items-center justify-center">
        <DetailIconButton icon={CrossVector} onPress={back} />
      </Box>
      <DetailPrimaryButton
        icon={voted ? ChartVector : VoteVector}
        label={voted ? 'Sonucu Gör' : 'Kim Haklı Oy Ver'}
        onPress={handleNavigate}
        loading={votedLoading}
        flex
      />
      <Box className="items-center justify-center" style={{ width: 52 }}>
        <AppText size={14} weight={600} className="text-headline">
          {activeIndex + 1}/{length}
        </AppText>
      </Box>
    </HStack>
  );
};

export { StoryReadActionButtons };
