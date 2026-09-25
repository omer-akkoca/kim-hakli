import React from 'react';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

import { Box } from '@/components/ui';

interface AppBannerAdProps {
  unitId: string;
  size?: BannerAdSize;
  collapsible?: 'top' | 'bottom';
}

const AppBannerAd: React.FC<AppBannerAdProps> = ({
  unitId,
  size = BannerAdSize.BANNER,
  collapsible,
}) => {
  if (!unitId) return null;

  return (
    <Box className="w-full items-center justify-center">
      <BannerAd
        unitId={__DEV__ ? TestIds.BANNER : unitId}
        size={size}
        requestOptions={
          collapsible
            ? {
                networkExtras: {
                  collapsible,
                },
              }
            : undefined
        }
      />
    </Box>
  );
};

export { AppBannerAd };
