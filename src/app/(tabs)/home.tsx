import React, { useEffect, useMemo, useRef } from 'react';
import { Box, HStack, VStack } from '@/components/ui';
import {
  AppBackground,
  AppBannerAd,
  AppBar,
  AppFlatList,
  AppNamedLogo,
  AppScrollView,
  CreditLabel,
  HomeSectionTitle,
  HomeSkeleton,
  HomeSlider,
  HomeStoryCard,
  PublishedDateBadge,
} from '@/src/components';
import { useGetClosingStory, useGetHomeStories } from '@/src/actions';
import { ADS, appBarHeight } from '@/src/constants';
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
      <AppBar>
        <HStack
          style={{ height: appBarHeight, paddingHorizontal: 24 }}
          className="items-center justify-between"
        >
          <AppNamedLogo fontSize={14} imageSize={24} />
          <CreditLabel />
        </HStack>
      </AppBar>
      <Box className="flex-1">
        <AppScrollView bottomPadding topPadding>
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
                        <PublishedDateBadge created_at={item.created_at} />
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
                        <PublishedDateBadge created_at={item.created_at} />
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
                        <PublishedDateBadge
                          created_at={item.created_at}
                          text={`${item.vote_count.toString()} Oy`}
                        />
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
