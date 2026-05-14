import React, { useState } from 'react';
import { CrossVector, VerifyVector } from '@/assets';
import { Box, HStack, LinearGradient, Pressable, VStack } from '@/components/ui';
import { useGetStoryById } from '@/src/actions';
import { AppBackground, AppText, DetailIconButton, VoteSidesCarousel } from '@/src/components';
import { submitVoteFunction } from '@/src/services';
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/src/constants';

export default function StoryVotePage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { back } = useRouter();
  const { top } = useSafeAreaInsets();

  const [selectedSide, setSelectedSide] = useState<string>('');

  const { data: story } = useGetStoryById(id);

  const handleVote = async () => {
    const { data } = await submitVoteFunction({ storyId: id, side: selectedSide });
    if (data.success) {
      router.replace(`/story/voteResult/${id}`);
    }
  };

  if (!story) return <></>;

  const sides = story.sides.filter((e) => Object.keys(story.votes).includes(e.name));

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
        <Box className="flex-1 justify-center items-center gap-8">
          <VStack className="w-full px-6">
            <AppText
              size={36}
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
            sides={sides}
            selectedSide={selectedSide}
            setSelectedSide={setSelectedSide}
          />

          <VStack space="md" className="w-full px-6">
            <Pressable
              className="h-button rounded-button overflow-hidden border border-white/10 disabled:opacity-50"
              style={{ boxShadow: '0 14px 34px rgba(241,118,42,0.26)' }}
              disabled={!!!selectedSide}
              onPress={handleVote}
            >
              <LinearGradient
                colors={['#FF8A2B', '#F1762A', '#D85E18']}
                locations={[0, 0.5, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="flex-1 items-center justify-center"
              >
                <AppText
                  size={16}
                  lineHeight={30}
                  weight={700}
                  className="text-headline text-center"
                  style={{
                    textShadowColor: 'rgba(0,0,0,0.22)',
                    textShadowOffset: { width: 0, height: 2 },
                    textShadowRadius: 8,
                  }}
                >
                  Oy Ver
                </AppText>
              </LinearGradient>
            </Pressable>
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
