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
        className="-tracking-3 text-headline text-center"
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.72}
        style={{
          position: 'absolute',
          textShadowColor: 'rgba(241,118,42,0.18)',
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 28,
        }}
      >
        {title}
      </AppText>
      <AppText
        family="PlayfairDisplay"
        size={72}
        weight={700}
        lineHeight={74}
        className="-tracking-3 text-headline text-center"
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.72}
        style={{
          textShadowColor: 'rgba(0,0,0,0.32)',
          textShadowOffset: { width: 0, height: 8 },
          textShadowRadius: 24,
        }}
      >
        {title}
      </AppText>
    </Box>
  );
};

export { HeaderTitle };
