import { Box, Spinner } from '@/components/ui';
import { colors } from '@/src/constants';
import React from 'react';

interface AppLoadingProps {
  fullScreen?: boolean;
  size?: number | 'small' | 'large' | undefined;
  color?: string;
}

const AppLoading: React.FC<AppLoadingProps> = ({
  fullScreen,
  size = 'large',
  color = colors.primary,
}) => {
  return (
    <Box style={{ flex: fullScreen ? 1 : undefined }} className="justify-center items-center">
      <Spinner color={color} size={size} />
    </Box>
  );
};

export { AppLoading };
