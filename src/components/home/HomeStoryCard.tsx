import React, { PropsWithChildren } from 'react';
import { usePathname, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { LinearGradient, VStack } from '@/components/ui';
import { width } from '@/src/constants';
import { IStory } from '@/src/types';
import { getCoverImageUrl } from '@/src/utils';
import { setToStoryDetail, useAppDispatch } from '@/src/store';
import { AppCard, AppSkeleton } from '../ui';

interface HomeStoryCardProps extends PropsWithChildren {
  story: IStory;
}

const cardWidth = width / 3.5;
const cardHeight = (cardWidth / 9) * 15;

const HomeStoryCard: React.FC<HomeStoryCardProps> = ({ story, children }) => {
  const { push } = useRouter();
  const pathName = usePathname();
  const dispatch = useAppDispatch();

  const coverImage = getCoverImageUrl(story.id);

  const handleRoute = () => {
    dispatch(setToStoryDetail(pathName));
    push(`/story/${story.id}`);
  };

  return (
    <AppCard onPress={handleRoute} style={{ width: cardWidth, height: cardHeight }}>
      <Image
        source={coverImage}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
        contentFit="cover"
        cachePolicy="memory-disk"
        recyclingKey={story.id}
        transition={200}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.72)', '#000']}
        locations={[0, 0.8, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="flex-1"
      >
        <VStack space="sm" className="flex-1 justify-end p-2">
          {children}
        </VStack>
      </LinearGradient>
    </AppCard>
  );
};

const HomeSkeletonCard: React.FC = () => {
  return (
    <AppCard style={{ width: cardWidth, height: cardHeight }}>
      <AppSkeleton />
    </AppCard>
  );
};

export { HomeStoryCard, HomeSkeletonCard };
