import React, { useMemo } from 'react';
import { CreditVector } from '@/assets';
import { HStack } from '@/components/ui';
import { AppText } from './AppText';

interface CreditBadgeProps {
  credit: number;
  withBg?: boolean;
}

const CreditBadge: React.FC<CreditBadgeProps> = ({ credit, withBg = false }) => {
  if (withBg) {
    return (
      <HStack
        space="sm"
        className="h-9 bg-credit-bg border border-credit-border items-center px-3 rounded-full"
      >
        <CreditVector width={14} height={14} />
        <CreditText credit={credit} />
      </HStack>
    );
  } else {
    return (
      <HStack space="sm" className=" items-center">
        <CreditVector width={14} height={14} />
        <CreditText credit={credit} />
      </HStack>
    );
  }
};

const CreditText: React.FC<{ credit: number }> = ({ credit }) => {
  const creditLabel = useMemo(() => (credit !== 0 ? credit : 'Kredisiz'), [credit]);
  return (
    <AppText size={12} lineHeight={14} weight={600} className="text-headline">
      {creditLabel}
    </AppText>
  );
};

export { CreditBadge };
