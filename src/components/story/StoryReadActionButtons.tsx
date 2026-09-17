import React, { useMemo } from 'react';
import { useRouter } from 'expo-router';
import { ChartVector, CrossVector, VoteVector } from '@/assets';
import { Box, HStack } from '@/components/ui';
import { useStoryAccess } from '@/src/actions';
import { storyReadActionBarHeight } from '@/src/constants';
import { useAuth } from '@/src/hooks';
import { StoryStatus } from '@/src/types';
import { StoryReadCounter } from './StoryReadCounter';
import { AppIconButton, AppPrimaryButton } from '../ui';

interface StoryReadActionButtonsProps {
  storyId: string;
  storyStatus: StoryStatus;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  length: number;
}

const StoryReadActionButtons: React.FC<StoryReadActionButtonsProps> = ({
  storyId,
  storyStatus,
  activeIndex,
  length,
}) => {
  const { push, back } = useRouter();
  const { user } = useAuth();

  const { data, isLoading } = useStoryAccess({ storyId, userId: user?.id });

  const voted = useMemo(() => (data ? data.voted : false), [data]);

  const handleNavigate = () => {
    if (storyStatus === 'completed') {
      push(`/story/voteResult/${storyId}`);
      return;
    }
    if (data) {
      if (data.voted) {
        push(`/story/voteResult/${storyId}`);
      } else {
        push(`/story/vote/${storyId}`);
      }
    }
  };

  return (
    <HStack space="lg" className="px-4" style={{ height: storyReadActionBarHeight }}>
      <Box className="items-center justify-center">
        <AppIconButton icon={CrossVector} onPress={back} withBg color="title" />
      </Box>
      {storyStatus === 'completed' ? (
        <AppPrimaryButton icon={VoteVector} label={'Sonucu Gör'} onPress={handleNavigate} flex />
      ) : (
        <AppPrimaryButton
          icon={voted ? ChartVector : VoteVector}
          label={voted ? 'Sonucu Gör' : 'Kim Haklı Oy Ver'}
          onPress={handleNavigate}
          loading={isLoading}
          flex
        />
      )}

      <Box className="items-center justify-center">
        <StoryReadCounter activeIndex={activeIndex} length={length} />
      </Box>
    </HStack>
  );
};

export { StoryReadActionButtons };
