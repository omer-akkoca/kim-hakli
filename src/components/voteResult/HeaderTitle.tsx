import { Box } from '@/components/ui';
import React from 'react';
import { AppText } from '../ui/AppText';

interface HeaderTitleProps {
  title: string;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ title }) => {
  return (
    <Box className="relative">
      <AppText
        family="PlayfairDisplay"
        size={72}
        weight={700}
        lineHeight={74}
        color="primary"
        className="-tracking-3 text-center"
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.72}
        style={{
          position: 'absolute',
          top: 1,
          left: 1,
        }}
      >
        {title}
      </AppText>
      <AppText
        family="PlayfairDisplay"
        size={72}
        weight={700}
        lineHeight={74}
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
