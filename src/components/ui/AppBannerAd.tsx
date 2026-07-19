import { Box } from '@/components/ui';
import React from 'react';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

interface AppBannerAdProps {
  unitId: string;
  size?: BannerAdSize;
}

const AppBannerAd: React.FC<AppBannerAdProps> = ({ unitId, size = BannerAdSize.BANNER }) => {
  if (!unitId) return null;

  return (
    <Box className="w-full items-center justify-center">
      <BannerAd unitId={__DEV__ ? TestIds.BANNER : unitId} size={size} />
    </Box>
  );
};

export { AppBannerAd };
