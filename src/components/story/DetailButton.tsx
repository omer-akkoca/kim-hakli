import { Center, HStack, LinearGradient, Pressable } from '@/components/ui';
import { colors } from '@/src/constants';
import { BlurView } from 'expo-blur';
import React from 'react';
import { SvgProps } from 'react-native-svg';
import { AppText } from '../ui/AppText';
import { AppLoading } from '../ui/AppLoading';

interface DetailIconButtonProps {
  icon: React.FC<SvgProps>;
  onPress: () => void;
  disabled?: boolean;
}

const DetailIconButton: React.FC<DetailIconButtonProps> = ({ icon: Icon, onPress, disabled }) => {
  return (
    <Pressable
      onPress={onPress}
      className="bg-background-500/75 rounded-full border border-white/10 overflow-hidden disabled:opacity-50"
      style={{ height: 48, width: 48, boxShadow: '0 10px 24px rgba(0,0,0,0.24)' }}
      disabled={disabled}
    >
      <BlurView intensity={18} tint="dark" className="flex-1">
        <LinearGradient
          colors={['rgba(124,144,164,0.05)', 'rgba(124,144,164,0)']}
          locations={[0, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="flex-1 items-center justify-center"
        >
          <Icon width={26} height={26} color={colors.headline} />
        </LinearGradient>
      </BlurView>
    </Pressable>
  );
};

interface DetailButtonProps {
  label: string;
  icon: React.FC<SvgProps>;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  flex?: boolean;
  reverse?: boolean;
}

const DetailPrimaryButton: React.FC<DetailButtonProps> = ({
  label,
  icon: Icon,
  onPress,
  loading,
  disabled,
  flex = false,
  reverse = false,
}) => {
  return (
    <Pressable
      onPress={loading ? () => null : onPress}
      className="h-button rounded-button overflow-hidden disabled:opacity-50"
      style={{ flex: flex ? 1 : undefined, boxShadow: '0 14px 40px rgba(241,118,42,0.22)' }}
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
          <AppLoading fullScreen color={colors.headline} size={'small'} />
        ) : (
          <HStack
            space="md"
            className="flex-1 items-center z-20 justify-center"
            style={{ flexDirection: reverse ? 'row-reverse' : 'row' }}
          >
            <Center className="w-9 h-9 bg-white/20 rounded-full">
              <Icon width={18} height={18} color={colors.headline} />
            </Center>
            <AppText size={16} lineHeight={20} weight={600} className="text-headline -tracking-2">
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

const DetailSecondaryButton: React.FC<DetailButtonProps> = ({
  label,
  icon: Icon,
  onPress,
  loading,
  disabled,
  flex = false,
  reverse = false,
}) => {
  return (
    <Pressable
      onPress={loading ? () => null : onPress}
      className="h-button bg-detail-secondary-button rounded-button border border-white/10 overflow-hidden disabled:opacity-50"
      style={{ flex: flex ? 1 : undefined, boxShadow: '0 10px 24px rgba(0,0,0,0.18)' }}
      disabled={disabled}
    >
      <BlurView intensity={18} tint="dark" className="flex-1 relative">
        {loading ? (
          <AppLoading fullScreen color={colors.headline} size={'small'} />
        ) : (
          <HStack
            space="md"
            className="flex-1 items-center justify-center z-20"
            style={{ flexDirection: reverse ? 'row-reverse' : 'row' }}
          >
            <Center className="w-9 h-9 bg-white/5 rounded-full border border-white/15">
              <Icon width={18} height={18} color={colors.headline} />
            </Center>
            <AppText size={16} lineHeight={20} weight={600} className="text-headline -tracking-2">
              {label}
            </AppText>
          </HStack>
        )}
        <LinearGradient
          colors={['rgba(124,144,164,0.05)', 'rgba(124,144,164,0)']}
          locations={[0, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="absolute inset-0 h-2 top-1 z-10"
        />
      </BlurView>
    </Pressable>
  );
};

export { DetailIconButton, DetailPrimaryButton, DetailSecondaryButton };
