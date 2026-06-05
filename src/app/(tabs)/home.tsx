import React, { useMemo } from 'react';
import { Box } from '@/components/ui';
import {
  AppBackground,
  AppBar,
  AppLoading,
  AppScrollView,
  AppText,
  HomeFeaturedSection,
  HomeSectionTitle,
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
          <AppLoading fullScreen />
        ) : (
          <AppScrollView safeBottom safeBottomNav bottomPadding topPadding>
            {/* Öne Çıkan Hikayeler */}
            <HomeFeaturedSection featured={featured} />
            <Box className="mb-6">
              {/* En Son Yayınlanan Hikayeler */}
              <HomeSectionTitle title="Son Yayına Alınanlar" />
              <AppScrollView horizontal paddingHorizontal={24} gap={12}>
                {latest.map((e) => (
                  <HomeStoryCard key={e.id} story={e}>
                    <Box className="w-3/4 bg-primary-500/80 py-0.5 px-1 mx-auto rounded-md">
                      <AppText
                        size={10}
                        lineHeight={12}
                        weight={600}
                        className="text-headline text-center capitalize"
                        numberOfLines={1}
                      >
                        {timeAgo(e.created_at)}
                      </AppText>
                    </Box>
                  </HomeStoryCard>
                ))}
              </AppScrollView>
            </Box>
            {/* En Çok Oy Verilen */}
            <Box>
              <HomeSectionTitle title="En Çok Oylanan Hikayeler" />
              <AppScrollView horizontal paddingHorizontal={24} gap={12}>
                {mostVoteds.map((e) => (
                  <HomeStoryCard key={e.id} story={e}>
                    <Box className="w-3/4 bg-primary-500/80 py-0.5 px-1 mx-auto rounded-md">
                      <AppText
                        size={10}
                        lineHeight={12}
                        weight={600}
                        className="text-headline text-center capitalize"
                        numberOfLines={1}
                      >
                        {e.vote_count} Oy
                      </AppText>
                    </Box>
                  </HomeStoryCard>
                ))}
              </AppScrollView>
            </Box>
          </AppScrollView>
        )}
      </Box>
    </AppBackground>
  );
};

export default HomePage;
