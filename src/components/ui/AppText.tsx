import { Text } from '@/components/ui';
import React from 'react';
import { TextProps } from 'react-native';

type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type FontFamily = 'Inter' | 'PlayfairDisplay';

const fontMap: Record<FontFamily, Record<FontWeight, string>> = {
  Inter: {
    100: 'Inter-Thin',
    200: 'Inter-ExtraLight',
    300: 'Inter-Light',
    400: 'Inter-Regular',
    500: 'Inter-Medium',
    600: 'Inter-SemiBold',
    700: 'Inter-Bold',
    800: 'Inter-ExtraBold',
    900: 'Inter-Black',
  },
  PlayfairDisplay: {
    100: 'PlayfairDisplay-Regular',
    200: 'PlayfairDisplay-Regular',
    300: 'PlayfairDisplay-Regular',
    400: 'PlayfairDisplay-Regular',
    500: 'PlayfairDisplay-Medium',
    600: 'PlayfairDisplay-SemiBold',
    700: 'PlayfairDisplay-Bold',
    800: 'PlayfairDisplay-ExtraBold',
    900: 'PlayfairDisplay-Black',
  },
};

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  family?: FontFamily;
  weight?: FontWeight;
  size?: number;
  lineHeight?: number;
  onPress?: () => void;
}

export const AppText: React.FC<AppTextProps> = ({
  family = 'Inter',
  weight = 400,
  size = 14,
  lineHeight = 20,
  style,
  className,
  children,
  onPress,
  ...props
}: AppTextProps) => {
  return (
    <Text
      style={[
        {
          fontFamily: fontMap[family][weight],
          fontSize: size,
          lineHeight: lineHeight,
        },
        style,
      ]}
      className={className}
      onPress={onPress}
      {...props}
    >
      {children}
    </Text>
  );
};
