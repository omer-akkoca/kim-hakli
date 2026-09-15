import React, { useMemo } from 'react';
import { ErrorCircleVector, SuccessCircleVector, WarningCircleVector } from '@/assets';
import { HStack } from '@/components/ui';
import { AlertType } from '@/src/types';
import { AppText } from './AppText';
import { useTheme } from '@/src/hooks';

interface AppAlertProps {
  message: string;
  type: AlertType;
}

const AppAlert: React.FC<AppAlertProps> = ({ message, type }) => {
  const { colors } = useTheme();

  const color = useMemo(() => {
    if (type === 'warning') return colors.headline_50;
    if (type === 'error') return colors.error;
    if (type === 'success') return colors.success;
    return colors.warning;
  }, [type]);

  const Icon = useMemo(() => {
    if (type === 'warning') return WarningCircleVector;
    if (type === 'error') return ErrorCircleVector;
    if (type === 'success') return SuccessCircleVector;
    return WarningCircleVector;
  }, [type]);

  return (
    <HStack space="md" className="items-center">
      <Icon width={20} height={20} color={color} />
      <AppText size={12} lineHeight={16} className="flex-1 -tracking-2 mt-1" style={{ color }}>
        {message}
      </AppText>
    </HStack>
  );
};

export { AppAlert };
