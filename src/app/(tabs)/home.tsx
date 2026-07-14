import React, { useMemo } from 'react';
import { Box } from '@/components/ui';
import {
  AppBackground,
  AppBar,
  AppFlatList,
  AppScrollView,
  AppText,
  HomeFeaturedSection,
  HomeSectionTitle,
  HomeSkeleton,
  HomeStoryCard,
} from '@/src/components';
import { useGetFeaturedStories, useGetLatestStories, useGetMostVotedStories } from '@/src/actions';
import { timeAgo } from '@/src/utils';

const HomePage = () => {
  const { data: latest = [], isLoading: latestLoding } = useGetLatestStories();
  const { data: mostVoteds = [], isLoading: mostVotedLoading } = useGetMostVotedStories();
  const { data: featured = [], isLoading: featuredLoading } = useGetFeaturedStories();

  const loading = useMemo(
    () => latestLoding || mostVotedLoading || featuredLoading,
    [latestLoding, mostVotedLoading, featuredLoading],
  );

  return (
    <AppBackground>
      <AppBar creditLabel title="Kim Haklı?" />
      <Box className="flex-1">
        {loading ? (
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
            <Box>
              <HomeSectionTitle title="En Çok Oylanan Hikayeler" />
              <AppFlatList
                data={mostVoteds}
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
          </AppScrollView>
        )}
      </Box>
    </AppBackground>
  );
};

export default HomePage;
