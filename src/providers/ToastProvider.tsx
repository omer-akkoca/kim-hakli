import React, { PropsWithChildren, useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import {
  CreditVector,
  CrossVector,
  ErrorCircleVector,
  SuccessCircleVector,
  WarningCircleVector,
} from '@/assets';
import { Box, HStack, Pressable } from '@/components/ui';
import { ShowToastProps, ToastType } from '@/src/types';
import { ToastContext } from '@/src/contexts';
import { AppText } from '@/src/components';
import { useTheme } from '@/src/hooks';

type ToastObject = {
  type: ToastType;
  title: string;
  description: string;
  credit?: string;
};

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
    ({ type = 'success', title, description, credit, duration = 5000 }: ShowToastProps) => {
      if (timerRef.current) clearTimeout(timerRef.current);

      setToast({ type, title, description, credit });

      translateY.value = -120;
      opacity.value = 0;

      translateY.value = withTiming(0, {
        duration: 350,
        easing: Easing.out(Easing.cubic),
      });
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
  const { colors } = useTheme();
  const { top } = useSafeAreaInsets();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const backgroundColor = useMemo(() => {
    if (!toast) return colors.transparent;
    if (toast.type === 'error') return '#2A1215';
    if (toast.type === 'warning') return '#2A2112';
    if (toast.type === 'credit') return colors.appCardBg;
    return '#102A1C';
  }, [toast]);

  const borderColor = useMemo(() => {
    if (!toast) return colors.transparent;
    if (toast.type === 'error') return '#2A1215';
    if (toast.type === 'warning') return '#2A2112';
    if (toast.type === 'credit') return colors.appCardBorder;
    return '#102A1C';
  }, [toast]);

  const iconColor = useMemo(() => {
    if (!toast) return colors.transparent;
    if (toast.type === 'error') return '#F87171';
    if (toast.type === 'warning') return '#FBBF24';
    if (toast.type === 'credit') return colors.reversed_headline;
    return '#4ADE80';
  }, [toast]);

  const Icon = useMemo(() => {
    if (!toast) return WarningCircleVector;
    if (toast.type === 'error') return ErrorCircleVector;
    if (toast.type === 'warning') return WarningCircleVector;
    if (toast.type === 'credit') return CreditVector;
    return SuccessCircleVector;
  }, [toast]);

  const titleColor: 'headline' | 'title' = useMemo(() => {
    if (!toast) return 'title';
    if (toast.type === 'credit') return 'headline';
    return 'title';
  }, [toast]);

  const descColor: 'headline_82' | 'title_75' = useMemo(() => {
    if (!toast) return 'title_75';
    if (toast.type === 'credit') return 'headline_82';
    return 'title_75';
  }, [toast]);

  const crossColor = useMemo(() => {
    if (!toast) return colors.transparent;
    if (toast.type === 'credit') return colors.headline;
    return colors.title;
  }, [toast]);

  const renderDescription = () => {
    if (!toast) return null;
    if (toast.type !== 'credit' || toast.credit === undefined) {
      return (
        <AppText size={12} weight={400} color={descColor}>
          {toast.description}
        </AppText>
      );
    }

    const creditText = String(toast.credit);
    const [before, after] = toast.description.split(creditText);

    return (
      <AppText size={12} weight={400} color={descColor}>
        {before}
        <AppText size={12} weight={700} color="primary">
          {creditText}
        </AppText>
        {after}
      </AppText>
    );
  };

  if (!toast) return null;

  return (
    <Animated.View
      className="absolute rounded-2xl py-2 px-3 z-50"
      style={[
        styles.wrapper,
        { backgroundColor, top, borderColor, borderWidth: 1, boxShadow: colors.shadow },
        animatedStyle,
      ]}
    >
      <HStack className="items-center" space="md">
        <HStack className="flex-1 items-center" space="md">
          <Icon width={20} height={20} color={iconColor} />
          <Box style={{ flex: 1 }}>
            {toast.title ? (
              <AppText size={14} weight={700} color={titleColor}>
                {toast.title}
              </AppText>
            ) : null}
            {toast.description ? renderDescription() : null}
          </Box>
        </HStack>
        <Pressable onPress={onDismiss}>
          <CrossVector width={20} height={20} color={crossColor} />
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
