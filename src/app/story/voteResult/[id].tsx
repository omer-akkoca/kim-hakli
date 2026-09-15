import React, { useEffect, useMemo } from 'react';
import { BannerAdSize } from 'react-native-google-mobile-ads';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { RightChevronVector, ShareVector } from '@/assets';
import { Box, Divider, VStack } from '@/components/ui';
import {
  useGetStoryById,
  useGetStoryImageUrls,
  useGetStoryVoteResults,
  useGetVotedStorySideId,
} from '@/src/actions';
import {
  AppBackground,
  AppBannerAd,
  AppLoading,
  AppPrimaryButton,
  AppScrollView,
  AppSecondaryButton,
  AppText,
  HeaderTitle,
  ResultCard,
  StoryCountDown,
  VoteCountCard,
  WinnerResultCard,
} from '@/src/components';
import { ADS } from '@/src/constants';
import { handleShareStory, requestNativeAppReview } from '@/src/utils';
import { useAppSelector } from '@/src/store';
import { useTheme } from '@/src/hooks';

const StoryVoteResultPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { replace, dismissTo } = useRouter();
  const { colors } = useTheme();

  const user = useAppSelector((state) => state.auth.user);
  const toStoryDetail = useAppSelector((state) => state.app.toStoryDetail);

  const { data: story, refetch: refetchStoryDetail } = useGetStoryById(id);
  const {
    data: stats = [],
    isPending: statsLoading,
    refetch: refetchVoteResult,
  } = useGetStoryVoteResults(id);
  const { data: votedSideId } = useGetVotedStorySideId(story?.id, user?.id);

  const avatarPaths = useMemo(
    () => stats?.map((item) => item.avatar_path).filter(Boolean) ?? [],
    [stats],
  );

  const { data: avatars = [] } = useGetStoryImageUrls({
    paths: avatarPaths,
  });

  const resultsWithAvatar = stats.map((item) => ({
    ...item,
    avatar_url: avatars.find((img) => img.includes(item.avatar_path))!,
  }));

  const totalVote = Object.values(stats).reduce((sum, stat) => sum + stat.vote_count, 0);

  const winner =
    resultsWithAvatar.length > 0 &&
    resultsWithAvatar[0].percentage !== resultsWithAvatar[1]?.percentage
      ? resultsWithAvatar[0]
      : null;

  const restSides = useMemo(() => {
    if (!winner) return resultsWithAvatar;
    return resultsWithAvatar.filter((e) => e.side_id !== winner.side_id);
  }, [resultsWithAvatar]);

  const handleContinue = () => {
    if (toStoryDetail) {
      dismissTo(toStoryDetail as any);
      return;
    }

    replace('/');
  };

  const onRefresh = () => {
    refetchStoryDetail();
    refetchVoteResult();
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      requestNativeAppReview();
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  if (statsLoading) {
    return (
      <AppBackground>
        <AppLoading fullScreen />
      </AppBackground>
    );
  }

  if (!story || !stats) return <></>;

  return (
    <AppBackground>
      <AppScrollView
        topPadding
        safeTop
        safeBottom
        bottomPadding
        paddingHorizontal={24}
        loading={statsLoading}
        onRefresh={onRefresh}
      >
        <VStack space="xl" className="w-full mb-6">
          <AppText
            size={15}
            weight={700}
            color="primary"
            className="tracking-10 text-center"
            style={{
              textShadowColor: 'rgba(241,118,42,0.22)',
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 12,
            }}
          >
            SONUÇLAR
          </AppText>
          <HeaderTitle
            title={story.status === 'completed' ? 'Karar Verildi!' : 'Oylama Devam Ediyor'}
          />
          <StoryCountDown closed_at={story.closed_at} status={story.status}>
            <AppText size={15} color="headline_75" className="-tracking-1 text-center">
              Topluluk oy verdi ve haklı olan belirlendi.
            </AppText>
          </StoryCountDown>
          <Box
            className="w-10 h-1 rounded-full self-center"
            style={{ boxShadow: colors.shadow, backgroundColor: colors.primary }}
          />
        </VStack>
        <VStack space="md" className="w-full mb-6">
          {winner ? <WinnerResultCard winner={winner} votedId={votedSideId} /> : null}
          {restSides.map((e, i) => (
            <ResultCard key={i.toString()} side={e} votedId={votedSideId} />
          ))}
          <VoteCountCard voteCount={totalVote} />
        </VStack>
        <Divider className="h-[1px] w-full bg-white/10 mb-6" />
        <VStack space="lg" className="mb-6">
          <AppPrimaryButton
            icon={ShareVector}
            label="Paylaş"
            onPress={() => handleShareStory(story)}
          />
          <AppSecondaryButton icon={RightChevronVector} label="Devam Et" onPress={handleContinue} />
        </VStack>
        <AppBannerAd unitId={ADS.banner.vote_result} size={BannerAdSize.INLINE_ADAPTIVE_BANNER} />
      </AppScrollView>
    </AppBackground>
  );
};

export default StoryVoteResultPage;
