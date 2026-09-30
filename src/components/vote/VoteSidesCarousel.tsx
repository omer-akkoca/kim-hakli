import React, { useCallback } from 'react';
import { ListRenderItemInfo } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  SharedValue,
} from 'react-native-reanimated';
import { Image } from 'expo-image';
import { TickVector } from '@/assets';
import { Box, VStack } from '@/components/ui';
import { width } from '@/src/constants';
import { IStorySideWithImage } from '@/src/types';
import { useTheme } from '@/src/hooks';
import { AppCard, AppText } from '../ui';

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
  const { colors } = useTheme();

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
      <AppCard
        flex
        onPress={() => setSelectedSide(item.id)}
        style={{
          width: ITEM_WIDTH,
          height: ITEM_HEIGHT,
          boxShadow: active ? '0 0 14px rgba(241,118,42,0.24)' : colors.shadow,
          borderWidth: 1.75,
          borderColor: active ? colors.primary : colors.appCardBorder,
        }}
      >
        <Box className="flex-1 relative">
          <Box className="w-full overflow-hidden" style={{ height: ITEM_WIDTH }}>
            <Image
              source={item.avatar_url}
              contentFit="cover"
              cachePolicy="memory-disk"
              transition={200}
              recyclingKey={item.id}
              style={{ flex: 1 }}
            />
          </Box>
          <VStack space="md" className="flex-1 px-4 items-center justify-center">
            <AppText
              size={20}
              lineHeight={26}
              weight={600}
              color="headline"
              className="text-center"
            >
              {item.title}
            </AppText>
            {item.description ? (
              <AppText size={14} weight={500} color="headline_90" className="text-center">
                {item.description}
              </AppText>
            ) : null}
          </VStack>
          {active ? (
            <Box
              className="absolute rounded-full items-center justify-center"
              style={{
                boxShadow: colors.shadow,
                backgroundColor: colors.primary,
                width: 44,
                height: 44,
                top: ITEM_WIDTH - 22,
                left: ITEM_WIDTH / 2 - 22,
              }}
            >
              <TickVector width={28} height={28} color={colors.title} />
            </Box>
          ) : null}
        </Box>
      </AppCard>
    </Animated.View>
  );
};

export { VoteSidesCarousel };
