import React from 'react';
import { Divider } from '@/components/ui';
import { useTheme } from '@/src/hooks';

interface AppDividerProps {
  className?: string;
}

const AppDivider: React.FC<AppDividerProps> = ({ className }) => {
  const { colors } = useTheme();
  return <Divider style={{ backgroundColor: colors.divider }} className={className} />;
};

export { AppDivider };
