import React from 'react';
import { Box, VStack } from '@/components/ui';
import { AppScrollView } from '../ui';
import { HomeSectionTitle } from './HomeSectionTitle';
import { HomeSkeletonCard } from './HomeStoryCard';

const HomeSkeleton: React.FC = () => {
  return (
    <VStack space="xl">
      <Box>
        <HomeSectionTitle title="Öne Çıkan Hikayeler" />
        <AppScrollView horizontal paddingHorizontal={24} gap={12}>
          {[...Array(6).keys()].map((e) => (
            <HomeSkeletonCard key={e} />
          ))}
        </AppScrollView>
      </Box>
      <Box>
        <HomeSectionTitle title="Son Yayına Alınanlar" />
        <AppScrollView horizontal paddingHorizontal={24} gap={12}>
          {[...Array(6).keys()].map((e) => (
            <HomeSkeletonCard key={e} />
          ))}
        </AppScrollView>
      </Box>
      <Box>
        <HomeSectionTitle title="En Çok Oylanan Hikayeler" />
        <AppScrollView horizontal paddingHorizontal={24} gap={12}>
          {[...Array(6).keys()].map((e) => (
            <HomeSkeletonCard key={e} />
          ))}
        </AppScrollView>
      </Box>
    </VStack>
  );
};

export { HomeSkeleton };
