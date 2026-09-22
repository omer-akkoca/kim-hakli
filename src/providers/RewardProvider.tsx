import React, { PropsWithChildren, useCallback, useMemo, useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { RewardAnimation } from '@/assets';
import { Box, VStack } from '@/components/ui';
import { RewardContext, RewardData } from '@/src/contexts';
import { AppText } from '@/src/components';
import { width } from '@/src/constants';
import { useTheme } from '@/src/hooks';

type RewardProviderProps = PropsWithChildren;

const LOTTIE_DURATION = 1120;
const FADE_DURATION = 500;
const FADE_DELAY = LOTTIE_DURATION - FADE_DURATION;

const RewardProvider: React.FC<RewardProviderProps> = ({ children }) => {
  const { colors } = useTheme();

  const [reward, setReward] = useState<RewardData | null>(null);
  const onSuccessRef = useRef<(() => void) | null>(null);

  const overlayOpacity = useSharedValue(1);

  const showReward = useCallback(
    (data: RewardData, onSuccess?: () => void) => {
      overlayOpacity.value = 1;
      onSuccessRef.current = onSuccess ?? null;

      setReward(data);

      overlayOpacity.value = withDelay(
        FADE_DELAY,
        withTiming(0, {
          duration: FADE_DURATION,
          easing: Easing.out(Easing.cubic),
        }),
      );
    },
    [overlayOpacity],
  );

  const hideReward = useCallback(() => {
    setReward(null);
    onSuccessRef.current?.();
    onSuccessRef.current = null;
  }, []);

  const overlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  const value = useMemo(
    () => ({
      reward,
      showReward,
      hideReward,
    }),
    [hideReward, reward, showReward],
  );

  return (
    <RewardContext.Provider value={value}>
      {children}

      {reward ? (
        <Animated.View
          style={[styles.overlay, overlayAnimatedStyle, { backgroundColor: colors.modalBackdrop }]}
        >
          <Box className="items-center justify-center">
            <LottieView
              autoPlay
              loop={false}
              source={RewardAnimation}
              style={styles.lottie}
              onAnimationFinish={hideReward}
            />

            <VStack className="items-center -mt-5">
              <AppText
                size={42}
                lineHeight={50}
                weight={800}
                color="primary"
                className="-tracking-1 text-center"
              >
                +{reward.amount}
              </AppText>

              <AppText
                size={24}
                lineHeight={30}
                weight={700}
                color="headline"
                className="-tracking-1 text-center"
              >
                Puan Kazandın!
              </AppText>
            </VStack>
          </Box>
        </Animated.View>
      ) : null}
    </RewardContext.Provider>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    elevation: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottie: {
    width,
    height: width,
  },
});

export { RewardProvider };
