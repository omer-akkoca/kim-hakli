import React from 'react';
import { VStack } from '@/components/ui';
import { AppText } from '../ui';

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
        color="headline"
        className="text-center"
      >
        {title}
      </AppText>
      <AppText color="headline_75" className="text-center">
        {subTitle}
      </AppText>
    </VStack>
  );
};

export { LeaderTitle };
