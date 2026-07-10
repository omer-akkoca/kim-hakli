import React from 'react';
import { Box } from '@/components/ui';
import { AppScrollView } from '../ui/AppScrollView';
import { FeaturedSkeleton } from './FeaturedStoryCard';
import { HomeSectionTitle } from './HomeSectionTitle';
import { HomeSkeletonCard } from './HomeStoryCard';

const HomeSkeleton: React.FC = () => {
  return (
    <AppScrollView safeBottom safeBottomNav bottomPadding topPadding>
      <FeaturedSkeleton />
      <Box className="mt-6">
        <HomeSectionTitle title="Son Yayına Alınanlar" />
        <AppScrollView horizontal paddingHorizontal={24} gap={12}>
          {[...Array(6).keys()].map((e) => (
            <HomeSkeletonCard key={e} />
          ))}
        </AppScrollView>
      </Box>
      <Box className="mt-6">
        <HomeSectionTitle title="En Çok Oylanan Hikayeler" />
        <AppScrollView horizontal paddingHorizontal={24} gap={12}>
          {[...Array(6).keys()].map((e) => (
            <HomeSkeletonCard key={e} />
          ))}
        </AppScrollView>
      </Box>
    </AppScrollView>
  );
};

export { HomeSkeleton };
