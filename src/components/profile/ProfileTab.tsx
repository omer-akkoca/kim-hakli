import { RightChevronVector } from '@/assets';
import { HStack, Pressable } from '@/components/ui';
import { colors } from '@/src/constants';
import React from 'react';
import { SvgProps } from 'react-native-svg';
import { AppText } from '../ui/AppText';

interface ProfileTabProps {
  icon: React.FC<SvgProps>;
  label: string;
  onPress: () => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ icon: Icon, label, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <HStack className="py-4 items-center justify-between">
        <HStack space="lg" className="flex-1 items-center">
          <Icon width={20} height={20} color={colors.text} />
          <AppText size={14} weight={500} className="text-headline -tracking-2">
            {label}
          </AppText>
        </HStack>
        <RightChevronVector width={16} height={16} color={colors.whiteSmoke_32} />
      </HStack>
    </Pressable>
  );
};

export { ProfileTab };
