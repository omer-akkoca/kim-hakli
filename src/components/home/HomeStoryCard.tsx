import React, { PropsWithChildren } from 'react';
import { usePathname, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Box, LinearGradient, Pressable, VStack } from '@/components/ui';
import { width } from '@/src/constants';
import { IStory } from '@/src/types';
import { getCoverImageUrl } from '@/src/utils';
import { setToStoryDetail, useAppDispatch } from '@/src/store';
import { useTheme } from '@/src/hooks';
import { AppSkeleton } from '../ui';

interface HomeStoryCardProps extends PropsWithChildren {
  story: IStory;
}

const cardWidth = width / 4;
const cardHeight = (cardWidth / 9) * 16;

const HomeStoryCard: React.FC<HomeStoryCardProps> = ({ story, children }) => {
  const { push } = useRouter();
  const { colors } = useTheme();
  const pathName = usePathname();
  const dispatch = useAppDispatch();

  const coverImage = getCoverImageUrl(story.id);

  const handleRoute = () => {
    dispatch(setToStoryDetail(pathName));
    push(`/story/${story.id}`);
  };

  return (
    <Pressable
      onPress={handleRoute}
      className="rounded-xl overflow-hidden"
      style={{
        width: cardWidth,
        height: cardHeight,
        backgroundColor: colors.background,
        borderWidth: 1.75,
        borderColor: colors.white_5,
      }}
    >
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
    </Pressable>
  );
};

const HomeSkeletonCard: React.FC = () => {
  const { colors } = useTheme();
  return (
    <Box
      className="border rounded-xl overflow-hidden"
      style={{
        backgroundColor: colors.background,
        boxShadow: colors.white_5,
        width: cardWidth,
        height: cardHeight,
      }}
    >
      <AppSkeleton />
    </Box>
  );
};

export { HomeStoryCard, HomeSkeletonCard };
