import React, { useEffect, useMemo } from 'react';
import { Box, Divider, VStack } from '@/components/ui';
import { useGetStoryById, useGetStoryImageUrls, useGetStoryVoteResults } from '@/src/actions';
import {
  AppBackground,
  AppBannerAd,
  AppLoading,
  AppScrollView,
  AppText,
  DetailPrimaryButton,
  DetailSecondaryButton,
  HeaderTitle,
  ResultCard,
  StoryCountDown,
  VoteCountCard,
  WinnerResultCard,
} from '@/src/components';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { RightChevronVector, ShareVector } from '@/assets';
import { ADS } from '@/src/constants';
import { handleShareStory, requestNativeAppReview } from '@/src/utils';
import { useAppSelector } from '@/src/store';
import { BannerAdSize } from 'react-native-google-mobile-ads';

const StoryVoteResultPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { replace, dismissTo } = useRouter();

  const toStoryDetail = useAppSelector((state) => state.app.toStoryDetail);

  const { data: story } = useGetStoryById(id);
  const { data: stats = [], isPending: statsLoading, refetch } = useGetStoryVoteResults(id);

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
        onRefresh={refetch}
      >
        <VStack space="xl" className="w-full mb-6">
          <AppText
            size={15}
            weight={700}
            className="tracking-10 text-primary-500 text-center"
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
            <AppText size={15} className="-tracking-1 text-headline/60 text-center">
              Topluluk oy verdi ve haklı olan belirlendi.
            </AppText>
          </StoryCountDown>
          <Box
            className="w-10 h-1 bg-primary-500 rounded-full self-center"
            style={{ boxShadow: '0 0 14px rgba(241,118,42,0.26)' }}
          />
        </VStack>
        <VStack space="md" className="w-full mb-6">
          {winner ? <WinnerResultCard winner={winner} /> : null}
          {restSides.map((e, i) => (
            <ResultCard key={i.toString()} side={e} />
          ))}
          <VoteCountCard voteCount={totalVote} />
        </VStack>
        <Divider className="h-[1px] w-full bg-white/10 mb-6" />
        <VStack space="lg" className="mb-6">
          <DetailPrimaryButton
            icon={ShareVector}
            label="Paylaş"
            onPress={() => handleShareStory(story)}
          />
          <DetailSecondaryButton
            icon={RightChevronVector}
            label="Devam Et"
            onPress={handleContinue}
          />
        </VStack>
        <AppBannerAd unitId={ADS.banner.vote_result} size={BannerAdSize.INLINE_ADAPTIVE_BANNER} />
      </AppScrollView>
    </AppBackground>
  );
};

export default StoryVoteResultPage;
