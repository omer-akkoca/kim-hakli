import { NOISY_TEXTURE } from '@/assets';
import { LinearGradient } from '@/components/ui';
import React, { PropsWithChildren } from 'react';
import { ImageBackground, View } from 'react-native';

const AppPage: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <View className="flex-1 bg-backgroud-500">
      <LinearGradient
        colors={['#1C1F30', '#161927']}
        locations={[0, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="flex-1"
      >
        <View className="flex-1 bg-black/50">
          <ImageBackground source={NOISY_TEXTURE} resizeMode="cover" className="flex-1 relative">
            {children}
          </ImageBackground>
        </View>
      </LinearGradient>
    </View>
  );
};

export { AppPage };
