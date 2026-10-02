import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQueryClient } from '@tanstack/react-query';
import { CrossVector, LeftChevronVector, LoopVector, VerifyVector, VoteVector } from '@/assets';
import { Box, HStack, VStack } from '@/components/ui';
import {
  AppBackground,
  AppIconButton,
  AppLoading,
  AppPrimaryButton,
  AppStateScreen,
  AppText,
  HeaderTitle,
  VoteSidesCarousel,
} from '@/src/components';
import { useGetStoryImageUrls, useGetStorySides, useVoteStory, voteKeys } from '@/src/actions';
import { useAuth, useTheme, useToast } from '@/src/hooks';
import { increaseCredit, useAppDispatch } from '@/src/store';
import { DEFAULT_SIDE_IMAGE } from '@/src/constants';

export default function StoryVotePage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { colors } = useTheme();
  const { back, replace } = useRouter();
  const { top } = useSafeAreaInsets();
  const { user } = useAuth();
  const { show } = useToast();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const [selectedSide, setSelectedSide] = useState<string>('');

  const { data: sides = [], refetch, error, isLoading } = useGetStorySides(id);

  const avatarPaths = sides?.map((scene) => scene.avatar_path) ?? [];

  const { data: signedAvatars = [] } = useGetStoryImageUrls({ paths: avatarPaths });

  const sidesWithAvatar = sides.map((side) => ({
    ...side,
    avatar_url:
      signedAvatars.find((img) => img.path === side.avatar_path)?.signedUrl ?? DEFAULT_SIDE_IMAGE,
  }));

  const { mutate, isPending } = useVoteStory(user?.id);

  const handleVote = async () => {
    mutate(
      { sideId: selectedSide, storyId: id },
      {
        onSuccess: (result) => {
          const { earned_credit, success } = result;
          if (success) {
            const description = `Hikaye oylayarak +${earned_credit} kredi kazandın.`;
            show({ type: 'credit', title: 'Tebrikler', description, credit: `+${earned_credit}` });
            dispatch(increaseCredit(earned_credit));
            queryClient.invalidateQueries({
              queryKey: voteKeys.voteHistory(),
            });
            queryClient.invalidateQueries({
              queryKey: voteKeys.voteResults(id),
            });
            replace(`/story/voteResult/${id}`);
          }
        },
        onError: (error) => {
          show({ type: 'error', title: 'Hata Oluştu', description: error.message });
        },
      },
    );
  };

  if (isLoading) {
    return (
      <AppBackground>
        <AppLoading fullScreen />
      </AppBackground>
    );
  }

  if (!sides)
    return (
      <AppStateScreen
        title="Hikaye Tarafları Bulunamadı"
        description={error?.message}
        primaryButton={{ icon: LoopVector, label: 'Tekrar Dene', onPress: refetch }}
        secondaryButton={{ icon: LeftChevronVector, label: 'Geri Dön', onPress: back }}
      />
    );

  return (
    <AppBackground>
      <Box className="flex-1 relative">
        <HStack
          space="lg"
          className="absolute left-0 right-0 px-6 items-center justify-between z-20"
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
