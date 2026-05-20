import React, { useState } from 'react';
import { HStack, VStack } from '@/components/ui';
import { IFaq } from '@/src/types';
import { AppCard } from '../ui/AppCard';
import { AppText } from '../ui/AppText';
import { RightChevronVector } from '@/assets';
import { colors } from '@/src/constants';

interface FaqItemProps {
  item: IFaq;
}

const FaqItem: React.FC<FaqItemProps> = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <AppCard onPress={() => setExpanded((prev) => !prev)}>
      <VStack space="xl" className="p-4">
        <HStack space="md" className="items-center">
          <AppText
            size={16}
            lineHeight={22}
            weight={600}
            className="text-headline -tracking-2 flex-1"
          >
            {item.question}
          </AppText>
          <RightChevronVector
            width={16}
            height={16}
            color={colors.whiteSmoke_50}
            transform={[{ rotate: expanded ? '90deg' : '0deg' }]}
          />
        </HStack>
        {expanded ? <AppText className="text-whiteSmoke-500/75">{item.answer}</AppText> : null}
      </VStack>
    </AppCard>
  );
};

export { FaqItem };
