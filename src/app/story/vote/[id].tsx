import React, { useState } from 'react';
import { Box, HStack, VStack } from '@/components/ui';
import {
  AppBackground,
  AppText,
  DetailIconButton,
  DetailPrimaryButton,
  VoteSidesCarousel,
} from '@/src/components';
import { CrossVector, VerifyVector, VoteVector } from '@/assets';
import {
  useGetStoryById,
  useGetStoryImageUrls,
  useGetStorySides,
  useVoteStory,
} from '@/src/actions';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/src/constants';

export default function StoryVotePage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { back, replace } = useRouter();
  const { top } = useSafeAreaInsets();

  const [selectedSide, setSelectedSide] = useState<string>('');

  const { data: story } = useGetStoryById(id);
  const { data: sides = [] } = useGetStorySides(id);

  const avatarPaths = sides?.map((scene) => scene.avatar_path) ?? [];

  const { data: signedAvatars = [] } = useGetStoryImageUrls({ paths: avatarPaths });

  const sidesWithAvatar = sides.map((side) => ({
    ...side,
    avatar_url: signedAvatars.find((img) => img.includes(side.avatar_path))!,
  }));

  const { mutate, isPending } = useVoteStory();

  const handleVote = async () => {
    mutate(
      { sideId: selectedSide, storyId: id },
      {
        onSuccess: (data) => {
          if (data.success) {
            replace(`/story/voteResult/${id}`);
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
          className="absolute left-0 top-0 right-0 px-6 items-center justify-between"
          style={{ paddingTop: top }}
        >
          <Box />
          <DetailIconButton icon={CrossVector} onPress={back} />
        </HStack>
        <Box className="flex-1 justify-center items-center gap-10">
          <VStack className="w-full px-6">
            <AppText
              family="PlayfairDisplay"
              size={40}
              lineHeight={75}
              weight={700}
              className="w-full text-headline -tracking-1 text-center"
              style={{
                textShadowColor: 'rgba(241,118,42,0.35)',
                textShadowOffset: { width: 0, height: 4 },
                textShadowRadius: 18,
              }}
            >
              Kim Haklı?
            </AppText>
            <AppText className="text-whiteSmoke-500/60 text-center">
              Hikayeye göre kimin haklı olduğuna sen karar ver.
            </AppText>
          </VStack>

          <VoteSidesCarousel
            sides={sidesWithAvatar}
            selectedSide={selectedSide}
            setSelectedSide={setSelectedSide}
          />

          <VStack space="md" className="w-full px-6">
            <DetailPrimaryButton
              label="Oy Ver"
              disabled={!!!selectedSide}
              loading={isPending}
              onPress={handleVote}
              icon={VoteVector}
            />
            <HStack space="sm" className="items-center justify-center">
              <VerifyVector width={16} height={16} color={colors.whiteSmoke_50} />
              <AppText size={10} weight={600} className="text-whiteSmoke-500/50 text-center">
                Oyunla topluluğa yön ver, hikayenin gidişatını etkile.
              </AppText>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </AppBackground>
  );
}
