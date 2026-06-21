import React, { useCallback } from 'react';
import { ListRenderItemInfo, Image as RnImage } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  SharedValue,
} from 'react-native-reanimated';
import { Box, LinearGradient, Pressable, VStack } from '@/components/ui';
import { colors, width } from '@/src/constants';
import { IStorySideWithImage } from '@/src/types';
import { BlurView } from 'expo-blur';
import { AppText } from '../ui/AppText';
import { TickVector } from '@/assets';

interface VoteSidesCarouselProps {
  sides: IStorySideWithImage[];
  selectedSide: string;
  setSelectedSide: (side: string) => void;
}

const ITEM_WIDTH = width * 0.7;
const ITEM_HEIGHT = ITEM_WIDTH * 1.5;
const SPACING = 16;

const VoteSidesCarousel: React.FC<VoteSidesCarouselProps> = ({
  sides,
  selectedSide,
  setSelectedSide,
}) => {
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  const renderItem = useCallback(
    ({ index, item }: ListRenderItemInfo<IStorySideWithImage>) => (
      <VoteSegment
        item={item}
        index={index}
        scrollX={scrollX}
        active={item.id === selectedSide}
        setSelectedSide={setSelectedSide}
      />
    ),
    [selectedSide],
  );

  return (
    <Box style={{ height: ITEM_HEIGHT + 32 }}>
      <Animated.FlatList
        data={sides}
        keyExtractor={(item) => item.avatar_path}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: (width - ITEM_WIDTH) / 2 }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        renderItem={renderItem}
      />
    </Box>
  );
};

interface SegmentProps {
  item: IStorySideWithImage;
  index: number;
  scrollX: SharedValue<number>;
  active: boolean;
  setSelectedSide: (sideId: string) => void;
}

const VoteSegment: React.FC<SegmentProps> = ({ item, index, scrollX, active, setSelectedSide }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * (ITEM_WIDTH + SPACING),
      index * (ITEM_WIDTH + SPACING),
      (index + 1) * (ITEM_WIDTH + SPACING),
    ];

    const scale = interpolate(scrollX.value, inputRange, [0.85, 1, 0.85], Extrapolation.CLAMP);
    const opacity = interpolate(scrollX.value, inputRange, [0.6, 1, 0.6], Extrapolation.CLAMP);

    return { transform: [{ scale }], opacity };
  });

  return (
    <Animated.View
      style={[
        {
          width: ITEM_WIDTH,
          height: ITEM_HEIGHT + 32,
          paddingTop: 16,
        },
        animatedStyle,
      ]}
    >
      <Pressable
        onPress={() => setSelectedSide(item.id)}
        style={[
          {
            width: ITEM_WIDTH,
            height: ITEM_HEIGHT,
            boxShadow: active ? '0 0 14px rgba(241,118,42,0.24)' : '0 10px 24px rgba(0,0,0,0.22)',
          },
        ]}
        className={`bg-background-500/75 rounded-xl border overflow-hidden ${active ? 'border-primary-500' : 'border-white/10'}`}
      >
        <BlurView intensity={18} tint="dark" className="flex-1">
          <LinearGradient
            colors={['rgba(124,144,164,0.05)', 'rgba(124,144,164,0)']}
            locations={[0, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            className="flex-1"
          >
            <Box className="flex-1 relative">
              <Box className="w-full" style={{ height: ITEM_WIDTH }}>
                <RnImage
                  source={{ uri: item.avatar_url }}
                  className="flex-1 rounded-tr-xl rounded-tl-xl"
                  resizeMode="cover"
                />
              </Box>
              <VStack space="md" className="flex-1 px-4 items-center justify-center">
                <AppText
                  size={20}
                  lineHeight={26}
                  weight={600}
                  className="text-headline text-center"
                >
                  {item.title}
                </AppText>
                {item.description ? (
                  <AppText size={14} weight={500} className="text-whiteSmoke-500/50 text-center">
                    {item.description}
                  </AppText>
                ) : null}
              </VStack>
              {active ? (
                <Box
                  className="absolute top-4 right-4 h-11 w-11 bg-primary-500 rounded-full border border-primary-300 items-center justify-center"
                  style={{ boxShadow: '0 5px 10px rgba(0,0,0,0.24)' }}
                >
                  <TickVector width={24} height={24} color={colors.headline} />
                </Box>
              ) : null}
            </Box>
          </LinearGradient>
        </BlurView>
      </Pressable>
    </Animated.View>
  );
};

export { VoteSidesCarousel };
