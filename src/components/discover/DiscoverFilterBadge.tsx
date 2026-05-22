import React from 'react';
import { Pressable } from '@/components/ui';
import { AppText } from '../ui/AppText';

interface DiscoverFilterBadgeProps {
  active: boolean;
  label: string;
  onPress: () => void;
}

const DiscoverFilterBadge: React.FC<DiscoverFilterBadgeProps> = ({ label, onPress, active }) => {
  return (
    <Pressable
      onPress={onPress}
      className={`px-4 py-2 border rounded-full ${active ? 'border-primary-500/75 bg-primary-500/5' : 'border-transparent bg-transparent'}`}
    >
      <AppText className={active ? 'text-primary-500/75' : 'text-whiteSmoke-500/75'}>
        {label}
      </AppText>
    </Pressable>
  );
};

export { DiscoverFilterBadge };
