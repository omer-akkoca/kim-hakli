import React from 'react';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

interface AppBannerAdProps {
  unitId: string;
}

const AppBannerAd: React.FC<AppBannerAdProps> = ({ unitId }) => {
  if (!unitId) return null;

  return (
    <BannerAd
      unitId={__DEV__ ? TestIds.BANNER : unitId}
      size={BannerAdSize.INLINE_ADAPTIVE_BANNER}
    />
  );
};

export { AppBannerAd };
