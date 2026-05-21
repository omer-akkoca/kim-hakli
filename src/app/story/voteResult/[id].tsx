import React, { useMemo } from 'react';
import { Box, Divider, HStack, VStack } from '@/components/ui';
import { useGetStoryById, useGetStoryImageUrls, useGetStoryVoteResults } from '@/src/actions';
import {
  AppBackground,
  AppLoading,
  AppText,
  DetailPrimaryButton,
  ResultCard,
  TotalVoteCard,
  WinnerResultCard,
} from '@/src/components';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView } from 'react-native';
import { BookOutlineVector, UsersVector } from '@/assets';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/src/constants';
import { formatStoryVoteCount } from '@/src/utils';

const StoryVoteResultPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { replace } = useRouter();
  const { top, bottom } = useSafeAreaInsets();

  const { data: story } = useGetStoryById(id);
  const { data: stats, isPending: statsLoading } = useGetStoryVoteResults(id);

  const avatarPaths = useMemo(
    () => stats?.map((item) => item.avatar_path).filter(Boolean) ?? [],
    [stats],
  );

  const { data: avatars = [] } = useGetStoryImageUrls({
    paths: avatarPaths,
  });

  if (statsLoading) {
    return (
      <AppBackground>
        <AppLoading fullScreen />
      </AppBackground>
    );
  }

  if (!story || !stats) return <></>;

  const resultsWithAvatar = stats.map((item) => ({
    ...item,
    avatar_url: avatars.find((img) => img.includes(item.avatar_path))!,
  }));

  const totalVote = Object.values(stats).reduce((sum, stat) => sum + stat.vote_count, 0);

  const winner = resultsWithAvatar[0];

  return (
    <AppBackground>
      <Box className="flex-1">
        <ScrollView
          contentContainerStyle={{
            paddingTop: top + 24,
            paddingBottom: bottom + 24,
            paddingHorizontal: 24,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Box className="items-center justify-center my-10">
            <AppText
              size={15}
              weight={700}
              className="tracking-10 text-primary-500 text-center mb-3"
              style={{
                textShadowColor: 'rgba(241,118,42,0.22)',
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 12,
              }}
            >
              SONUÇLAR
            </AppText>
            <Box className="relative mb-2.5">
              <AppText
                family="PlayfairDisplay"
                size={72}
                weight={700}
                lineHeight={74}
                className="-tracking-3 text-headline text-center"
                style={{
                  position: 'absolute',
                  textShadowColor: 'rgba(241,118,42,0.18)',
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 28,
                }}
              >
                Karar Verildi!
              </AppText>
              <AppText
                family="PlayfairDisplay"
                size={72}
                weight={700}
                lineHeight={74}
                className="-tracking-3 text-headline text-center"
                style={{
                  textShadowColor: 'rgba(0,0,0,0.32)',
                  textShadowOffset: { width: 0, height: 8 },
                  textShadowRadius: 24,
                }}
              >
                Karar Verildi!
              </AppText>
            </Box>
            <AppText size={15} className="-tracking-1 text-headline/60 mb-6">
              Topluluk oy verdi ve haklı olan belirlendi.
            </AppText>
            <Box
              className="w-10 h-1 bg-primary-500 rounded-full "
              style={{ boxShadow: '0 0 14px rgba(241,118,42,0.26)' }}
            />
          </Box>
          <VStack space="md">
            {winner ? <WinnerResultCard winner={winner} /> : null}
            {resultsWithAvatar
              .filter((e) => e.side_id !== winner.side_id)
              .map((e, i) => (
                <ResultCard key={i.toString()} side={e} />
              ))}
            <TotalVoteCard>
              <HStack className="items-center justify-between px-4 py-2">
                <HStack space="md" className="items-center">
                  <Box className="w-12 h-12 bg-background-500 rounded-lg items-center justify-center">
                    <UsersVector width={20} height={20} color={colors.primary} />
                  </Box>
                  <AppText
                    size={14}
                    lineHeight={20}
                    weight={500}
                    className="-tracking-1 text-whiteSmoke-500"
                  >
                    Toplam Oy
                  </AppText>
                </HStack>
                <AppText
                  size={28}
                  lineHeight={34}
                  weight={800}
                  className="-tracking-4 text-headline"
                  style={{
                    textShadowColor: 'rgba(0,0,0,0.22)',
                    textShadowOffset: { width: 0, height: 4 },
                    textShadowRadius: 12,
                  }}
                >
                  {formatStoryVoteCount(totalVote)}
                </AppText>
              </HStack>
            </TotalVoteCard>
          </VStack>
          <Divider className="h-[1px] w-full bg-white/10 my-4" />
          <DetailPrimaryButton
            icon={BookOutlineVector}
            label="Başka Hikaye Oku"
            onPress={() => replace('/home')}
          />
        </ScrollView>
      </Box>
    </AppBackground>
  );
};

export default StoryVoteResultPage;
