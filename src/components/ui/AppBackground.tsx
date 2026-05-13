import React, { PropsWithChildren } from 'react';
import { Box, LinearGradient } from '@/components/ui';

type IAppBackgroundProps = PropsWithChildren;

const AppBackground: React.FC<IAppBackgroundProps> = ({ children }) => {
  return (
    <Box className="flex-1 bg-background-500">
      <LinearGradient
        colors={['#1C1F30', '#171A29', '#111421']}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="flex-1 relative"
      >
        <Box className="flex-1 z-20">{children}</Box>
      </LinearGradient>
    </Box>
  );
};

export { AppBackground };
