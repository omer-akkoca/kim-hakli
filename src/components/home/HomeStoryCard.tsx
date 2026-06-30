import React, { PropsWithChildren } from 'react';
import { Image, ImageBackground } from 'react-native';
import { LinearGradient, Pressable, VStack } from '@/components/ui';
import { width } from '@/src/constants';
import { StoryWithCoverUrl } from '@/src/types';
import { AppText } from '../ui/AppText';
import { useRouter } from 'expo-router';

interface HomeStoryCardProps extends PropsWithChildren {
  story: StoryWithCoverUrl;
}

const cardWidth = width / 3.5;
const cardHeight = (cardWidth / 9) * 16;

const HomeStoryCard: React.FC<HomeStoryCardProps> = ({ story, children }) => {
  const { push } = useRouter();

  return (
    <Pressable
      onPress={() => push(`/story/${story.id}`)}
      className="bg-background-500 border border-white/5 rounded-xl overflow-hidden"
      style={{ boxShadow: '0 5px 15px rgba(0,0,0,0.22)' }}
    >
      <ImageBackground
        source={{ uri: story.cover_image_url }}
        style={{ width: cardWidth, height: cardHeight }}
        resizeMode="cover"
        blurRadius={2}
      >
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
      </ImageBackground>
      <Image />
    </Pressable>
  );
};

export { HomeStoryCard };
