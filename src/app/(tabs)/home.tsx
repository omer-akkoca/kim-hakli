import React, { useMemo } from 'react';
import { Box } from '@/components/ui';
import {
  AppBackground,
  AppBannerAd,
  AppBar,
  AppFlatList,
  AppScrollView,
  AppText,
  HomeFeaturedSection,
  HomeSectionTitle,
  HomeSkeleton,
  HomeStoryCard,
} from '@/src/components';
import { useGetHomeStories } from '@/src/actions';
import { timeAgo } from '@/src/utils';
import { ADS } from '@/src/constants';

const HomePage = () => {
  const { data, isLoading } = useGetHomeStories();

  const { featured, latest, mostVoted } = useMemo(
    () => data ?? { featured: [], latest: [], mostVoted: [] },
    [data],
  );

  return (
    <AppBackground>
      <AppBar creditLabel title="Kim Haklı?"></AppBar>
      <Box className="flex-1">
        {isLoading ? (
          <HomeSkeleton />
        ) : (
          <AppScrollView safeBottom safeBottomNav bottomPadding topPadding>
            {/* Öne Çıkan Hikayeler */}
            <HomeFeaturedSection featured={featured} />
            <Box className="mb-6">
              {/* En Son Yayınlanan Hikayeler */}
              <HomeSectionTitle title="Son Yayına Alınanlar" />
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
            <Box className="mb-6">
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
            <AppBannerAd unitId={ADS.banner.home} />
          </AppScrollView>
        )}
      </Box>
    </AppBackground>
  );
};

export default HomePage;
