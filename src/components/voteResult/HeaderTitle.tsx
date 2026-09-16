import React from 'react';
import { Box } from '@/components/ui';
import { AppText } from '../ui';

interface HeaderTitleProps {
  title: string;
  fontSize: number;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ title, fontSize }) => {
  return (
    <Box className="relative">
      {/* Shadow */}
      <AppText
        family="PlayfairDisplay"
        size={fontSize}
        weight={700}
        lineHeight={fontSize + 4}
        color="primary"
        className="-tracking-3 text-center opacity-80"
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.72}
        style={{
          position: 'absolute',
          top: 1,
          left: 1,
          right: -1,
        }}
      >
        {title}
      </AppText>

      {/* Main text */}
      <AppText
        family="PlayfairDisplay"
        size={fontSize}
        weight={700}
        lineHeight={fontSize + 4}
        color="headline"
        className="-tracking-3 text-center"
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.72}
      >
        {title}
      </AppText>
    </Box>
  );
};

export { HeaderTitle };
