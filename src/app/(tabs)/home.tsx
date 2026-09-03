import React, { useEffect, useMemo, useRef } from 'react';
import { Box, VStack } from '@/components/ui';
import {
  AppBackground,
  AppBannerAd,
  AppBar,
  AppFlatList,
  AppScrollView,
  AppText,
  HomeSectionTitle,
  HomeSkeleton,
  HomeSlider,
  HomeStoryCard,
} from '@/src/components';
import { useGetClosingStory, useGetHomeStories } from '@/src/actions';
import { timeAgo } from '@/src/utils';
import { ADS } from '@/src/constants';
import { BannerAdSize } from 'react-native-google-mobile-ads';
import { usePathname, useRouter } from 'expo-router';
import { useAuth } from '@/src/hooks';

const HomePage = () => {
  const { push } = useRouter();
  const pathname = usePathname();
  const openedStoryIdRef = useRef<string | null>(null);
  const { user } = useAuth();

  const { data, isLoading } = useGetHomeStories();
  const { data: closingStory } = useGetClosingStory(user?.id);

  const { featured, latest, mostVoted } = useMemo(
    () => data ?? { featured: [], latest: [], mostVoted: [] },
    [data],
  );

  useEffect(() => {
    const profileCompleted = user
      ? !!(user.referral_source && user.full_name && user.gender)
      : true;

    if (
      !closingStory ||
      !profileCompleted ||
      pathname === '/daily_vote' ||
      openedStoryIdRef.current === closingStory.id
    ) {
      return;
    }

    openedStoryIdRef.current = closingStory.id;
    push('/daily_vote');
  }, [closingStory?.id, pathname, user?.referral_source, user?.full_name, user?.gender, push]);

  return (
    <AppBackground>
      <AppBar creditLabel title="Kim Haklı?" />
      <Box className="flex-1">
        <AppScrollView safeBottom safeBottomNav bottomPadding topPadding>
          <VStack space="xl">
            <HomeSlider />
            {isLoading ? (
              <HomeSkeleton />
            ) : (
              <>
                {/* Öne Çıkan Hikayeler */}
                <Box>
                  <HomeSectionTitle title="Öne Çıkan Hikayeler" />
                  <AppFlatList
                    data={featured}
                    keyExtractor={(e) => e.id}
                    horizontal
                    paddingHorizontal={24}
                    gap={12}
                    renderItem={({ item }) => (
                      <HomeStoryCard story={item}>
                        <Box className="w-3/4 bg-primary-500/80 py-0.5 px-1 mx-auto rounded-md">
                          <AppText
                            size={10}
                            lineHeight={12}
                            weight={600}
                            className="text-headline text-center capitalize"
                            numberOfLines={1}
                          >
                            {timeAgo(item.created_at)}
                          </AppText>
                        </Box>
                      </HomeStoryCard>
                    )}
                  />
                </Box>
                {/* En Son Yayınlanan Hikayeler */}
                <Box>
                  <HomeSectionTitle title="Son Yayına Alınan Hikayeler" />
                  <AppFlatList
                    data={latest}
                    keyExtractor={(e) => e.id}
                    horizontal
                    paddingHorizontal={24}
                    gap={12}
                    renderItem={({ item }) => (
                      <HomeStoryCard story={item}>
                        <Box className="w-3/4 bg-primary-500/80 py-0.5 px-1 mx-auto rounded-md">
                          <AppText
                            size={10}
                            lineHeight={12}
                            weight={600}
                            className="text-headline text-center capitalize"
                            numberOfLines={1}
                          >
                            {timeAgo(item.created_at)}
                          </AppText>
                        </Box>
                      </HomeStoryCard>
                    )}
                  />
                </Box>
                {/* En Çok Oy Verilen */}
                <Box>
                  <HomeSectionTitle title="En Çok Oylanan Hikayeler" />
                  <AppFlatList
                    data={mostVoted}
                    keyExtractor={(e) => e.id}
                    horizontal
                    paddingHorizontal={24}
                    gap={12}
                    renderItem={({ item }) => (
                      <HomeStoryCard story={item}>
                        <Box className="w-3/4 bg-primary-500/80 py-0.5 px-1 mx-auto rounded-md">
                          <AppText
                            size={10}
                            lineHeight={12}
                            weight={600}
                            className="text-headline text-center capitalize"
                            numberOfLines={1}
                          >
                            {item.vote_count} Oy
                          </AppText>
                        </Box>
                      </HomeStoryCard>
                    )}
                  />
                </Box>
                <AppBannerAd unitId={ADS.banner.home} size={BannerAdSize.INLINE_ADAPTIVE_BANNER} />
              </>
            )}
          </VStack>
        </AppScrollView>
      </Box>
    </AppBackground>
  );
};

export default HomePage;
