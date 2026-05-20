import { Box, Spinner } from '@/components/ui';
import { colors } from '@/src/constants';
import React from 'react';

interface AppLoadingProps {
  fullScreen?: boolean;
}

const AppLoading: React.FC<AppLoadingProps> = ({ fullScreen }) => {
  return (
    <Box style={{ flex: fullScreen ? 1 : undefined }} className="justify-center items-center">
      <Spinner color={colors.primary} size="large" />
    </Box>
  );
};

export { AppLoading };
