import React from 'react';
import { Box, Pressable } from '@/components/ui';
import { useTheme } from '@/src/hooks';
import { AppCard, AppText } from '../ui';

interface DiscoverFilterBadgeProps {
  active: boolean;
  label: string;
  onPress: () => void;
}

const DiscoverFilterBadge: React.FC<DiscoverFilterBadgeProps> = ({ label, onPress, active }) => {
  const { colors } = useTheme();

  if (active) {
    return (
      <AppCard style={{ borderColor: colors.primary }} className="rounded-full">
        <Box className="px-4 py-2">
          <AppText color="primary" weight={500}>
            {label}
          </AppText>
        </Box>
      </AppCard>
    );
  }

  return (
    <Pressable onPress={onPress} className="px-4 py-2 border-none">
      <AppText color="headline">{label}</AppText>
    </Pressable>
  );
};

export { DiscoverFilterBadge };
