import React, { useMemo } from 'react';
import { Platform, Share } from 'react-native';
import { Box, Divider, HStack, VStack } from '@/components/ui';
import { useGetStoryById, useGetStoryImageUrls, useGetStoryVoteResults } from '@/src/actions';
import {
  AppBackground,
  AppBannerAd,
  AppCard,
  AppLoading,
  AppScrollView,
  AppText,
  DetailPrimaryButton,
  DetailSecondaryButton,
  ResultCard,
  WinnerResultCard,
} from '@/src/components';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { RightChevronVector, ShareVector, UsersVector } from '@/assets';
import { ADS, colors } from '@/src/constants';
import { formatStoryVoteCount } from '@/src/utils';
import { useAppSelector } from '@/src/store';
import { BannerAdSize } from 'react-native-google-mobile-ads';

const StoryVoteResultPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { replace, dismissTo, canDismiss } = useRouter();

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

  const handleShareStory = async () => {
    if (!story) return;

    const storyUrl = `https://kimhakli.tr/story/${story.id}`;

    await Share.share(
      Platform.OS === 'ios'
        ? {
            url: storyUrl,
          }
        : {
            message: storyUrl,
          },
    );
  };

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
        //safeBottom
        paddingHorizontal={24}
        loading={statsLoading}
        onRefresh={refetch}
      >
        <Box className="items-center justify-center mb-10">
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
        <VStack space="md" className="w-full">
          {winner ? <WinnerResultCard winner={winner} /> : null}
          {restSides.map((e, i) => (
            <ResultCard key={i.toString()} side={e} />
          ))}
          <AppCard>
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
          </AppCard>
        </VStack>
        <Divider className="h-[1px] w-full bg-white/10 my-4" />
        <VStack space="lg">
          <DetailPrimaryButton icon={ShareVector} label="Paylaş" onPress={handleShareStory} />
          <DetailSecondaryButton
            icon={RightChevronVector}
            label="Devam Et"
            onPress={() => (canDismiss() ? dismissTo(toStoryDetail as any) : replace('/'))}
          />
        </VStack>
        <Divider className="h-[1px] w-full bg-white/10 my-4" />
        <Box className="-mx-6">
          <AppBannerAd unitId={ADS.banner.vote_result} size={BannerAdSize.INLINE_ADAPTIVE_BANNER} />
        </Box>
      </AppScrollView>
    </AppBackground>
  );
};

export default StoryVoteResultPage;
