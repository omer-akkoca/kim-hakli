import React from 'react';
import { Box, Spinner } from '@/components/ui';

interface AppLoadingProps {
  fullScreen?: boolean;
  size?: number | 'small' | 'large' | undefined;
  color?: string;
}

const AppLoading: React.FC<AppLoadingProps> = ({
  fullScreen,
  size = 'large',
  color = '#F56B20',
}) => {
  return (
    <Box style={{ flex: fullScreen ? 1 : undefined }} className="justify-center items-center">
      <Spinner color={color} size={size} />
    </Box>
  );
};

export { AppLoading };
