import React from 'react';
import { VStack } from '@/components/ui';
import { AppText } from '../ui/AppText';

const LeaderTitle = () => {
  return (
    <VStack space="sm" className="mb-6">
      <AppText
        family="PlayfairDisplay"
        size={36}
        lineHeight={44}
        weight={600}
        className="text-headline text-center"
      >
        Haklılar Tablosu
      </AppText>
      <AppText className="text-secondary-500 text-center">En çok haklı tarafı bulanlar</AppText>
    </VStack>
  );
};

export { LeaderTitle };
