import React from 'react';
import { Image } from 'expo-image';
import { LOGO } from '@/assets';
import { HStack } from '@/components/ui';
import { AppText } from './AppText';

interface AppNamedLogoProps {
  imageSize: number;
  fontSize: number;
}

const AppNamedLogo: React.FC<AppNamedLogoProps> = ({ fontSize, imageSize }) => {
  return (
    <HStack className="items-center" style={{ gap: imageSize / 5 }}>
      <Image
        source={LOGO}
        contentFit="cover"
        cachePolicy="memory-disk"
        transition={200}
        recyclingKey={'logo'}
        style={{
          width: imageSize,
          height: imageSize,
          borderRadius: imageSize / 5,
        }}
      />
      <HStack space="xs">
        <AppText size={fontSize} lineHeight={fontSize * 1.5} weight={700} color="primary">
          KİM
        </AppText>
        <AppText size={fontSize} lineHeight={fontSize * 1.5} weight={700} color="headline">
          HAKLI?
        </AppText>
      </HStack>
    </HStack>
  );
};

export { AppNamedLogo };
