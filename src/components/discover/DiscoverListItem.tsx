import React, { useEffect, useState } from 'react';
import {
  NativeAd,
  NativeAdView,
  NativeAsset,
  NativeAssetType,
  NativeMediaView,
  TestIds,
} from 'react-native-google-mobile-ads';
import { Image } from 'expo-image';
import { Box, HStack } from '@/components/ui';
import { IStory } from '@/src/types';
import { ADS, width } from '@/src/constants';
import { AppText } from '../ui/AppText';

interface DiscoverNativeAdProps {
  order: number;
}

const itemWidth = (width - 48 - 8) / 2;
const itemHeight = (itemWidth / 9) * 14;

const DiscoverNativeAd: React.FC<DiscoverNativeAdProps> = ({ order }) => {
  const [nativeAd, setNativeAd] = useState<NativeAd | null>(null);

  useEffect(() => {
    let isMounted = true;
    let loadedAd: NativeAd | null = null;

    const loadAd = async () => {
      try {
        loadedAd = await NativeAd.createForAdRequest(
          __DEV__ ? TestIds.NATIVE : ADS.native.discover,
          {
            startVideoMuted: true,
          },
        );

        if (isMounted) {
          setNativeAd(loadedAd);
        } else {
          loadedAd.destroy();
        }
      } catch {}
    };

    loadAd();

    return () => {
      isMounted = false;
      loadedAd?.destroy();
    };
  }, []);

  if (!nativeAd) return null;

  return (
    <Box
      className="bg-background-500 border border-white/5 rounded-3xl overflow-hidden"
      style={{
        width: itemWidth,
        height: itemHeight,
        marginRight: order % 2 === 0 ? 8 : 0,
        boxShadow: '0 10px 30px rgba(0,0,0,0.22)',
      }}
    >
      <NativeAdView nativeAd={nativeAd} style={{ flex: 1 }}>
        <NativeMediaView style={{ width: '100%', height: 96 }} resizeMode="cover" />
        <Box className="flex-1 p-3 justify-between">
          <HStack space="sm" className="items-center">
            {nativeAd.icon?.url ? (
              <NativeAsset assetType={NativeAssetType.ICON}>
                <Image
                  source={nativeAd.icon.url}
                  contentFit="cover"
                  cachePolicy="memory-disk"
                  transition={200}
                  recyclingKey={nativeAd.icon.url}
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                  }}
                />
              </NativeAsset>
            ) : null}

            <AppText size={10} weight={600} lineHeight={12} className="text-secondary-500">
              Sponsorlu
            </AppText>
          </HStack>

          <NativeAsset assetType={NativeAssetType.HEADLINE}>
            <AppText
              size={15}
              lineHeight={19}
              weight={700}
              className="text-headline"
              numberOfLines={3}
            >
              {nativeAd.headline}
            </AppText>
          </NativeAsset>

          <NativeAsset assetType={NativeAssetType.BODY}>
            <AppText size={11} lineHeight={14} className="text-secondary-500" numberOfLines={2}>
              {nativeAd.body}
            </AppText>
          </NativeAsset>

          <NativeAsset assetType={NativeAssetType.CALL_TO_ACTION}>
            <Box className="items-center justify-center bg-primary-500 rounded-lg py-2">
              <AppText
                size={12}
                lineHeight={16}
                weight={700}
                className="text-headline"
                numberOfLines={1}
              >
                {nativeAd.callToAction}
              </AppText>
            </Box>
          </NativeAsset>
        </Box>
      </NativeAdView>
    </Box>
  );
};

type DiscoverListItem =
  | {
      type: 'story';
      story: IStory;
      order: number;
    }
  | {
      type: 'native_ad';
      id: string;
      order: number;
    };

export { DiscoverNativeAd, DiscoverListItem };
