import { Box, LinearGradient } from '@/components/ui';
import React, { PropsWithChildren } from 'react';
import { ImageBackground } from 'react-native';

interface StoryDetailBgProps extends PropsWithChildren {
  coverImage: string;
}

const StoryDetailBg: React.FC<StoryDetailBgProps> = ({ coverImage, children }) => {
  return (
    <Box style={{ flex: 1, backgroundColor: '#050816' }}>
      <ImageBackground source={{ uri: coverImage }} style={{ flex: 1 }}>
        <LinearGradient
          colors={[
            'rgba(5,8,22,0.96)',
            'rgba(5,8,22,0.85)',
            'rgba(5,8,22,0.65)',
            'rgba(5,8,22,0.35)',
            'rgba(5,8,22,0.00)',
          ]}
          locations={[0, 0.25, 0.5, 0.75, 1]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          className="absolute inset-0"
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.55)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.55)']}
          locations={[0, 0.5, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="absolute inset-0"
        />
        <LinearGradient
          colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0)']}
          locations={[0, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="absolute top-0 left-0 right-0 h-1/4"
        />
        <Box className="flex-1">{children}</Box>
      </ImageBackground>
    </Box>
  );
};

export { StoryDetailBg };
