import React, { useMemo } from 'react';
import { CreditVector } from '@/assets';
import { HStack } from '@/components/ui';
import { useTheme } from '@/src/hooks';
import { AppText } from './AppText';

interface CreditBadgeProps {
  credit: number;
  withBg?: boolean;
  withNumber?: boolean;
}

const CreditBadge: React.FC<CreditBadgeProps> = ({
  credit,
  withBg = false,
  withNumber = false,
}) => {
  const { colors } = useTheme();
  if (withBg) {
    return (
      <HStack
        space="sm"
        style={{
          backgroundColor: colors.creditBadgeBg,
          borderColor: colors.primary,
        }}
        className="h-9 border items-center px-3 rounded-full"
      >
        <CreditVector width={14} height={14} />
        <CreditText credit={credit} withNumber={withNumber} withBg={withBg} />
      </HStack>
    );
  } else {
    return (
      <HStack space="sm" className=" items-center">
        <CreditVector width={14} height={14} />
        <CreditText credit={credit} withNumber={withNumber} withBg={withBg} />
      </HStack>
    );
  }
};

const CreditText: React.FC<{ credit: number; withNumber?: boolean; withBg: boolean }> = ({
  credit,
  withNumber,
  withBg,
}) => {
  const creditLabel = useMemo(() => (credit !== 0 || withNumber ? credit : 'Kredisiz'), [credit]);
  return (
    <AppText size={12} lineHeight={14} weight={600} color={withBg ? 'title' : 'headline'}>
      {creditLabel}
    </AppText>
  );
};

export { CreditBadge };
