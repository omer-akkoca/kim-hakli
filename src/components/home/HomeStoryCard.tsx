import React, { PropsWithChildren } from 'react';
import { Box, LinearGradient, Pressable, VStack } from '@/components/ui';
import { width } from '@/src/constants';
import { IStory } from '@/src/types';
import { usePathname, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { AppText } from '../ui/AppText';
import { AppSkeleton } from '../ui/AppSkeleton';
import { getCoverImageUrl } from '@/src/utils';
import { useDispatch } from 'react-redux';
import { setToStoryDetail } from '@/src/store';

interface HomeStoryCardProps extends PropsWithChildren {
  story: IStory;
}

const cardWidth = width / 3.5;
const cardHeight = (cardWidth / 9) * 16;

const HomeStoryCard: React.FC<HomeStoryCardProps> = ({ story, children }) => {
  const { push } = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch();

  const coverImage = getCoverImageUrl(story.id);

  const handleRoute = () => {
    dispatch(setToStoryDetail(pathName));
    push(`/story/${story.id}`);
  };

  return (
    <Pressable
      onPress={handleRoute}
      className="bg-background-500 border border-white/5 rounded-xl overflow-hidden"
      style={{
        width: cardWidth,
        height: cardHeight,
        //boxShadow: '0 5px 15px rgba(0,0,0,0.22)',
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
        blurRadius={1}
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
          <AppText
            size={12}
            lineHeight={16}
            weight={500}
            className="-tracking-2 text-headline text-center"
          >
            {story.title}
          </AppText>

          {children}
        </VStack>
      </LinearGradient>
    </Pressable>
  );
};

const HomeSkeletonCard: React.FC = () => {
  return (
    <Box
      className="bg-background-500 border border-white/5 rounded-xl overflow-hidden"
      style={{ boxShadow: '0 5px 15px rgba(0,0,0,0.22)', width: cardWidth, height: cardHeight }}
    >
      <AppSkeleton />
    </Box>
  );
};

export { HomeStoryCard, HomeSkeletonCard };
