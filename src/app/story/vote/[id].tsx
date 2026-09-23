import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CrossVector, VerifyVector, VoteVector } from '@/assets';
import { Box, HStack, VStack } from '@/components/ui';
import {
  AppBackground,
  AppIconButton,
  AppPrimaryButton,
  AppText,
  HeaderTitle,
  VoteSidesCarousel,
} from '@/src/components';
import {
  useGetStoryById,
  useGetStoryImageUrls,
  useGetStorySides,
  useVoteStory,
} from '@/src/actions';
import { useAuth, useReward, useTheme } from '@/src/hooks';
import { increaseCredit, useAppDispatch } from '@/src/store';

export default function StoryVotePage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { colors } = useTheme();
  const { back, replace } = useRouter();
  const { top } = useSafeAreaInsets();
  const { user } = useAuth();
  const { showReward } = useReward();
  const dispatch = useAppDispatch();

  const [selectedSide, setSelectedSide] = useState<string>('');

  const { data: story } = useGetStoryById(id);
  const { data: sides = [] } = useGetStorySides(id);

  const avatarPaths = sides?.map((scene) => scene.avatar_path) ?? [];

  const { data: signedAvatars = [] } = useGetStoryImageUrls({ paths: avatarPaths });

  const sidesWithAvatar = sides.map((side) => ({
    ...side,
    avatar_url: signedAvatars.find((img) => img.includes(side.avatar_path))!,
  }));

  const { mutate, isPending } = useVoteStory(user?.id);

  const handleVote = async () => {
    mutate(
      { sideId: selectedSide, storyId: id },
      {
        onSuccess: (data) => {
          if (data.success) {
            replace(`/story/voteResult/${id}`);
            showReward({ amount: 6 }, () => dispatch(increaseCredit(6)));
          }
        },
      },
    );
  };

  if (!story) return <></>;

  return (
    <AppBackground>
      <Box className="flex-1 relative">
        <HStack
          space="lg"
          className="absoluteleft-0 right-0 px-6 items-center justify-between z-20"
          style={{ top: top + 8 }}
        >
          <Box />
          <AppIconButton icon={CrossVector} onPress={back} withBg color="title" />
        </HStack>
        <Box className="flex-1 justify-center items-center gap-10 z-10">
          <VStack className="w-full px-6">
            <HeaderTitle title="Kim Haklı?" fontSize={40} />
            <AppText color="headline_90" className="text-center">
              Hikayeye göre kimin haklı olduğuna sen karar ver.
            </AppText>
          </VStack>

          <VoteSidesCarousel
            sides={sidesWithAvatar}
            selectedSide={selectedSide}
            setSelectedSide={setSelectedSide}
          />

          <VStack space="md" className="w-full px-6">
            <AppPrimaryButton
              label="Oy Ver"
              disabled={!!!selectedSide}
              loading={isPending}
              onPress={handleVote}
              icon={VoteVector}
            />
            <HStack space="sm" className="items-center justify-center">
              <VerifyVector width={16} height={16} color={colors.headline_75} />
              <AppText size={10} weight={600} color="headline_75" className="text-center">
                Oyunla topluluğa yön ver, hikayenin gidişatını etkile.
              </AppText>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </AppBackground>
  );
}
