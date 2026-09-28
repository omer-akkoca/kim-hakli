import React, { useMemo } from 'react';
import { CreditVector } from '@/assets';
import { Box, HStack, LinearGradient } from '@/components/ui';
import { formatStoryVoteCount } from '@/src/utils';
import { useAuth, useTheme } from '@/src/hooks';
import { AppText } from './AppText';

interface CreditLabelProps {
  long?: boolean;
}

const CreditLabel: React.FC<CreditLabelProps> = ({ long = false }) => {
  const { colors } = useTheme();
  const { user, total_credits } = useAuth();

  const creditCount = useMemo(
    () => (long ? total_credits : formatStoryVoteCount(total_credits)),
    [total_credits, long],
  );

  if (!user) return <Box />;

  return (
    <Box
      style={{
        boxShadow: colors.shadow,
        backgroundColor: colors.creditBadgeBg,
        borderColor: colors.primary,
      }}
      className="h-credit-label border rounded-full overflow-hidden"
    >
      <LinearGradient
        colors={['rgba(241,118,42,0.12)', 'rgba(241,118,42,0)']}
        className="flex-1"
        locations={[0, 1]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
      >
        <HStack space="md" className="flex-1 px-3 items-center justify-center">
          <CreditVector width={20} height={20} />
          <HStack space="xs">
            <AppText size={13} weight={700} color="white" className="-tracking-2">
              {creditCount}
            </AppText>
          </HStack>
        </HStack>
      </LinearGradient>
    </Box>
  );
};

export { CreditLabel };
