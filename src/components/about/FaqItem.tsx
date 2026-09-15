import React, { useState } from 'react';
import { RightChevronVector } from '@/assets';
import { HStack, VStack } from '@/components/ui';
import { IFaq } from '@/src/types';
import { useTheme } from '@/src/hooks';
import { AppCard, AppText } from '../ui';

interface FaqItemProps {
  item: IFaq;
}

const FaqItem: React.FC<FaqItemProps> = ({ item }) => {
  const { colors } = useTheme();

  const [expanded, setExpanded] = useState(false);

  return (
    <AppCard onPress={() => setExpanded((prev) => !prev)}>
      <VStack space="xl" className="p-4">
        <HStack space="md" className="items-center">
          <AppText
            size={16}
            lineHeight={22}
            weight={600}
            color="headline"
            className="-tracking-2 flex-1"
          >
            {item.question}
          </AppText>
          <RightChevronVector
            width={16}
            height={16}
            color={colors.headline_50}
            transform={[{ rotate: expanded ? '90deg' : '0deg' }]}
          />
        </HStack>
        {expanded ? <AppText color="headline_90">{item.answer}</AppText> : null}
      </VStack>
    </AppCard>
  );
};

export { FaqItem };
