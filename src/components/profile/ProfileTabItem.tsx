import { HStack, Text, Pressable } from '@/components/ui';
import { colors } from '@/src/constants';
import React from 'react';
import { SvgProps } from 'react-native-svg';

interface IProfileTabItem {
  label: string;
  icon?: React.FC<SvgProps>;
  onPress: () => void;
}

const ProfileTabItem: React.FC<IProfileTabItem> = ({ icon: Icon, label, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <HStack className="justify-between items-center">
        <Text className="text-text-500 text-base">{label}</Text>
        {Icon ? <Icon width={20} height={20} color={colors.text} /> : null}
      </HStack>
    </Pressable>
  );
};

export { ProfileTabItem };
