import React from 'react';
import { VStack } from '@/components/ui';
import { AppText } from '../ui/AppText';

interface LeaderTitleProps {
  title: string;
  subTitle: string;
}

const LeaderTitle: React.FC<LeaderTitleProps> = ({ title, subTitle }) => {
  return (
    <VStack space="sm" className="mb-6">
      <AppText
        family="PlayfairDisplay"
        size={36}
        lineHeight={44}
        weight={600}
        className="text-headline text-center"
      >
        {title}
      </AppText>
      <AppText className="text-secondary-500 text-center">{subTitle}</AppText>
    </VStack>
  );
};

export { LeaderTitle };
