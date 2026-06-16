import React, { PropsWithChildren, useCallback, useMemo, useRef, useState } from 'react';
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { ShowToastProps, ToastType } from '@/src/types';
import { ToastContext } from '@/src/contexts';
import { Box, HStack, Pressable } from '@/components/ui';
import { CrossVector, ErrorCircleVector, SuccessCircleVector, WarningCircleVector } from '@/assets';
import { AppText } from '../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants';
import { StyleSheet } from 'react-native';

type ToastObject = { type: ToastType; title: string; description: string };

const ToastProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [toast, setToast] = useState<ToastObject | null>(null);
  const translateY = useSharedValue(-120);
  const opacity = useSharedValue(0);
  const timerRef = useRef<number | null>(null);

  const clearToast = useCallback(() => setToast(null), []);

  const hide = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    opacity.value = withTiming(0, { duration: 300 });
    translateY.value = withTiming(-120, { duration: 300 }, (finished) => {
      if (finished) scheduleOnRN(clearToast);
    });
  }, [translateY, opacity, clearToast]);

  const show = useCallback(
    ({ type = 'success', title, description, duration = 5000 }: ShowToastProps) => {
      if (timerRef.current) clearTimeout(timerRef.current);

      setToast({ type, title, description });

      translateY.value = -120;
      opacity.value = 0;

      translateY.value = withTiming(0, { duration: 350, easing: Easing.out(Easing.cubic) });
      opacity.value = withTiming(1, { duration: 250 });

      timerRef.current = setTimeout(hide, duration);
    },
    [translateY, opacity, hide],
  );

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <ToastView toast={toast} translateY={translateY} opacity={opacity} onDismiss={hide} />
    </ToastContext.Provider>
  );
};

const ToastView: React.FC<{
  toast: ToastObject | null;
  translateY: SharedValue<number>;
  opacity: SharedValue<number>;
  onDismiss: () => void;
}> = ({ toast, translateY, opacity, onDismiss }) => {
  const { top } = useSafeAreaInsets();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const bgColor = useMemo(
    () => (toast ? (toast?.type === 'error' ? '#2A1215' : '#102A1C') : colors.tranparent),
    [toast],
  );

  const iconColor = useMemo(
    () => (toast ? (toast?.type === 'error' ? '#F87171' : '#4ADE80') : colors.tranparent),
    [toast],
  );

  const Icon = useMemo(
    () =>
      toast
        ? toast?.type === 'error'
          ? ErrorCircleVector
          : SuccessCircleVector
        : WarningCircleVector,
    [toast],
  );

  if (!toast) return null;

  return (
    <Animated.View
      className="absolute rounded-lg py-2 px-3 z-50"
      style={[styles.wrapper, { backgroundColor: bgColor, top: top }, animatedStyle]}
    >
      <HStack className="items-center" space="md">
        <HStack className="flex-1 items-center" space="md">
          <Icon width={20} height={20} color={iconColor} />
          <Box style={{ flex: 1 }}>
            {toast.title ? (
              <AppText size={14} weight={700} className="text-headline">
                {toast.title}
              </AppText>
            ) : null}
            {toast.description ? (
              <AppText size={12} weight={400} className="text-whiteSmoke-500/75">
                {toast.description}
              </AppText>
            ) : null}
          </Box>
        </HStack>
        <Pressable onPress={onDismiss}>
          <CrossVector width={20} height={20} color={colors.headline} />
        </Pressable>
      </HStack>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    left: 24,
    right: 24,
    gap: 12,
    zIndex: 9999,
  },
});

export { ToastProvider };
