import { CreditVector } from '@/assets';
import { Box, HStack, LinearGradient } from '@/components/ui';
import React from 'react';
import { AppText } from './AppText';

const CreditLabel = () => {
  const credits = 45;
  return (
    <Box
      className="h-credit-label bg-credit-label border border-primary-500 rounded-full overflow-hidden"
      style={{ boxShadow: '0 5px 10px rgba(0,0,0,0.24)' }}
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
            <AppText size={13} weight={700} className="text-headline -tracking-2">
              {credits}
            </AppText>
            <AppText size={12} weight={500} className="text-loginText">
              K
            </AppText>
          </HStack>
        </HStack>
      </LinearGradient>
    </Box>
  );
};

export { CreditLabel };
