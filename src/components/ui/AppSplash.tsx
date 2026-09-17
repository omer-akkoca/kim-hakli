import React from 'react';
import { Platform } from 'react-native';
import { Image } from 'expo-image';
import { ANDROID_SPLASH, IOS_SPLASH } from '@/assets';
import { Box } from '@/components/ui';
import { W } from '@/src/constants';
import { useTheme } from '@/src/hooks';

const AppSplash = () => {
  const { colors } = useTheme();
  return (
    <Box
      className="flex-1 justify-center items-center"
      style={{ backgroundColor: colors.gunMetalGray }}
    >
      <Image
        source={Platform.OS === 'android' ? ANDROID_SPLASH : IOS_SPLASH}
        contentFit="cover"
        cachePolicy="memory-disk"
        transition={200}
        recyclingKey={'splash'}
        style={{ width: W(200), height: W(200) }}
      />
    </Box>
  );
};

export { AppSplash };
