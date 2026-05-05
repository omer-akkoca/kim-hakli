import { Box } from '@/components/ui';
import { appBarHeight } from '@/src/constants';
import React, { PropsWithChildren } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AppBar: React.FC<PropsWithChildren> = ({ children }) => {
  const { top } = useSafeAreaInsets();

  return (
    <Box
      style={{ height: appBarHeight + top, paddingTop: top }}
      className="bg-backgroud-700 border-b border-white/10"
    >
      <Box className="px-6 justify-center" style={{ height: appBarHeight }}>
        {children}
      </Box>
    </Box>
  );
};

export { AppBar };
