import React, { PropsWithChildren } from 'react';
import { Box } from '@/components/ui';
import { useTheme } from '@/src/hooks';

type IAppBackgroundProps = PropsWithChildren;

const AppBackground: React.FC<IAppBackgroundProps> = ({ children }) => {
  const { colors } = useTheme();
  return (
    <Box className="flex-1" style={{ backgroundColor: colors.background }}>
      <Box className="flex-1 z-20">{children}</Box>
    </Box>
  );
};

export { AppBackground };
