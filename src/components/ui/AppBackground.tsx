import React, { PropsWithChildren } from 'react';
import { Box } from '@/components/ui';

type IAppBackgroundProps = PropsWithChildren;

const AppBackground: React.FC<IAppBackgroundProps> = ({ children }) => {
  return (
    <Box className="flex-1 bg-background-500">
      <Box className="flex-1 z-20">{children}</Box>
    </Box>
  );
};

export { AppBackground };
