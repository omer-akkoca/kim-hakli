import React from 'react';
import { SvgProps } from 'react-native-svg';
import { Center, HStack, LinearGradient, Pressable } from '@/components/ui';
import { useTheme } from '@/src/hooks';
import { AppLoading } from './AppLoading';
import { AppText } from './AppText';
import { AppColors } from '@/src/types';

interface AppButtonProps {
  label: string;
  icon: React.FC<SvgProps>;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  flex?: boolean;
  reverse?: boolean;
  className?: string;
}

interface DetailIconButtonProps {
  icon: React.FC<SvgProps>;
  onPress: () => void;
  disabled?: boolean;
  withBg?: boolean;
  color?: keyof AppColors;
  buttonSize?: number;
  size?: number;
}

const AppPrimaryButton: React.FC<AppButtonProps> = ({
  label,
  icon: Icon,
  onPress,
  loading,
  disabled,
  flex = false,
  reverse = false,
  className,
}) => {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={loading ? () => null : onPress}
      className={`h-button rounded-xl overflow-hidden disabled:opacity-50 ${className}`}
      style={{ flex: flex ? 1 : undefined, boxShadow: colors.shadow }}
      disabled={disabled}
    >
      <LinearGradient
        colors={['#F05A28', '#F1762A', '#FF9A1F']}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="flex-1 relative items-center justify-center"
      >
        {loading ? (
          <AppLoading fullScreen color={colors.title} size={'small'} />
        ) : (
          <HStack
            space="md"
            className="flex-1 items-center z-20 justify-center"
            style={{ flexDirection: reverse ? 'row-reverse' : 'row' }}
          >
            <Center style={{ backgroundColor: colors.white_20 }} className="w-9 h-9 rounded-full">
              <Icon width={16} height={16} color={colors.white} />
            </Center>
            <AppText size={16} lineHeight={20} weight={600} color="white" className="-tracking-2">
              {label}
            </AppText>
          </HStack>
        )}
        <LinearGradient
          colors={['rgba(241,118,42,0.14)', 'rgba(241,118,42,0)']}
          locations={[0, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="absolute inset-0 h-6 z-10"
        />
      </LinearGradient>
    </Pressable>
  );
};

const AppSecondaryButton: React.FC<AppButtonProps> = ({
  label,
  icon: Icon,
  onPress,
  loading,
  disabled,
  flex = false,
  reverse = false,
}) => {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={loading ? () => null : onPress}
      className="h-button rounded-xl overflow-hidden disabled:opacity-50"
      style={{
        flex: flex ? 1 : undefined,
        backgroundColor: colors.appSecondaryButton,
        boxShadow: colors.shadow,
        borderWidth: 1.75,
        borderColor: colors.white_10,
      }}
      disabled={disabled}
    >
      {loading ? (
        <AppLoading fullScreen color={colors.headline} size={'small'} />
      ) : (
        <HStack
          space="md"
          className="flex-1 items-center justify-center z-20"
          style={{ flexDirection: reverse ? 'row-reverse' : 'row' }}
        >
          <Center className="w-9 h-9 bg-white/5 rounded-full border border-white/15">
            <Icon width={16} height={16} color={colors.title} />
          </Center>
          <AppText size={16} lineHeight={20} weight={600} color="title" className="-tracking-2">
            {label}
          </AppText>
        </HStack>
      )}
    </Pressable>
  );
};

const AppIconButton: React.FC<DetailIconButtonProps> = ({
  icon: Icon,
  onPress,
  disabled,
  withBg = false,
  buttonSize = 48,
  size = 24,
  color = 'black',
}) => {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{
        boxShadow: withBg ? colors.shadow : undefined,
        height: withBg ? buttonSize : undefined,
        width: withBg ? buttonSize : undefined,
        backgroundColor: withBg ? colors.appIconButtonBg : undefined,
        borderWidth: withBg ? 1 : undefined,
        borderColor: withBg ? colors.white_10 : undefined,
      }}
      hitSlop={withBg ? undefined : { bottom: 4, left: 4, right: 4, top: 4 }}
      className="justify-center items-center rounded-full overflow-hidden disabled:opacity-50"
    >
      <Icon width={size} height={size} color={colors[color]} />
    </Pressable>
  );
};

export { AppPrimaryButton, AppSecondaryButton, AppIconButton };
