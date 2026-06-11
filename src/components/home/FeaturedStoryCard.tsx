import React from 'react';
import { ImageBackground } from 'react-native';
import { Box, HStack, LinearGradient, Pressable, VStack } from '@/components/ui';
import { colors, width } from '@/src/constants';
import { StoryWithCoverUrl } from '@/src/types';
import { AppText } from '../ui/AppText';
import { CreditBadge } from '../ui/CreditBadge';
import { AppIconButton } from '../ui/AppIconButton';
import { useAuth, useBookmark } from '@/src/hooks';
import { useRouter } from 'expo-router';

const scale = (width - 64) / 9;
const containerWidth = width;
const containerHeight = scale * 13;
const itemWidth = scale * 9;
const itemHeight = scale * 13;

interface FeaturedStoryCardProps {
  story: StoryWithCoverUrl;
  featuredLength: number;
  activeIndex: number;
}

const FeaturedStoryCard: React.FC<FeaturedStoryCardProps> = ({
  story,
  featuredLength,
  activeIndex,
}) => {
  const { push } = useRouter();
  const { BookmarkIcon, toggleBookmark, loading } = useBookmark(story.id);
  const { user } = useAuth();

  return (
    <Box style={{ width: containerWidth, height: containerHeight }} className="items-center">
      <Pressable
        onPress={() => push(`/story/${story.id}`)}
        style={{
          width: itemWidth,
          height: itemHeight,
          boxShadow: '0 5px 15px rgba(0,0,0,0.22)',
        }}
        className="overflow-hidden rounded-3xl"
      >
        <ImageBackground
          source={{ uri: story.cover_image_url }}
          className="flex-1"
          resizeMode="cover"
          blurRadius={5}
          style={{ borderRadius: 24 }}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.72)', '#000']}
            locations={[0, 0.8, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            className="flex-1"
          >
            <Box className="w-full flex-1 justify-between" style={{ padding: 20 }}>
              <HStack className="items-center justify-between">
                <CreditBadge credit={story.credit_cost} withBg />
                {user ? (
                  <AppIconButton
                    icon={BookmarkIcon}
                    onPress={toggleBookmark}
                    disabled={loading}
                    color={colors.headline}
                    width={22}
                    height={22}
                    className="w-credit-label h-credit-label bg-credit-bg items-center justify-center rounded-full border border-white/5"
                  />
                ) : null}
              </HStack>
              <VStack space="md">
                <VStack space="sm">
                  <AppText
                    size={26}
                    lineHeight={36}
                    weight={600}
                    className="text-center text-headline -tracking-2 mx-auto w-3/4"
                    numberOfLines={2}
                    style={{
                      textShadowColor: 'rgba(0,0,0,0.34)',
                      textShadowOffset: { width: 0, height: 4 },
                      textShadowRadius: 18,
                    }}
                  >
                    {story.title}
                  </AppText>
                  <AppText
                    size={12}
                    weight={500}
                    numberOfLines={3}
                    className="text-whiteSmoke-500/75 text-center"
                  >
                    {story.description}
                  </AppText>
                </VStack>
                <HStack space="sm" className="w-full items-center justify-center">
                  {Array.from({ length: featuredLength }).map((_, i) => {
                    const active = activeIndex === i;
                    return (
                      <Box
                        key={i.toString()}
                        className={`${active ? 'bg-primary-500' : 'bg-secondary-500'} w-2 h-2 rounded-full`}
                      />
                    );
                  })}
                </HStack>
              </VStack>
            </Box>
          </LinearGradient>
        </ImageBackground>
      </Pressable>
    </Box>
  );
};

export { FeaturedStoryCard };
