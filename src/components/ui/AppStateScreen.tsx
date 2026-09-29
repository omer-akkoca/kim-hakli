import React from 'react';
import { SvgProps } from 'react-native-svg';
import { ErrorCircleVector } from '@/assets';
import { VStack } from '@/components/ui';
import { W } from '@/src/constants';
import { useTheme } from '@/src/hooks';
import { AppButtonProps } from '@/src/types';
import { AppText } from './AppText';
import { AppBackground } from './AppBackground';
import { AppPrimaryButton, AppSecondaryButton } from './AppButtons';

interface AppStateScreenProps {
  icon?: React.FC<SvgProps>;
  title: string;
  description?: string;
  primaryButton?: AppButtonProps;
  secondaryButton?: AppButtonProps;
}

const AppStateScreen: React.FC<AppStateScreenProps> = ({
  icon: Icon = ErrorCircleVector,
  title,
  description = 'Bir şeyler yanlış gitti. Lütfen tekrar deneyin.',
  primaryButton,
  secondaryButton,
}) => {
  const { colors } = useTheme();
  return (
    <AppBackground>
      <VStack space="xl" className="flex-1 w-full justify-center items-center px-6">
        <Icon width={W(200)} height={W(200)} color={colors.primary} />
        <VStack space="sm" className="w-full">
          <AppText size={16} lineHeight={24} color="headline" weight={600} className="text-center">
            {title}
          </AppText>
          <AppText size={12} color="headline_82" className="text-center w-3/4 mx-auto">
            {description}
          </AppText>
        </VStack>
        <VStack space="sm" className="w-full">
          {primaryButton ? (
            <AppPrimaryButton {...primaryButton} className="w-11/12 mx-auto" />
          ) : null}
          {secondaryButton ? (
            <AppSecondaryButton {...secondaryButton} className="w-11/12 mx-auto" />
          ) : null}
        </VStack>
      </VStack>
    </AppBackground>
  );
};

export { AppStateScreen };
