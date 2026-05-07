import { Text } from '@/components/ui';
import React from 'react';
import { TextProps } from 'react-native';

type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

const fontMap: Record<FontWeight, string> = {
  100: 'Inter-Thin',
  200: 'Inter-ExtraLight',
  300: 'Inter-Light',
  400: 'Inter-Regular',
  500: 'Inter-Medium',
  600: 'Inter-SemiBold',
  700: 'Inter-Bold',
  800: 'Inter-ExtraBold',
  900: 'Inter-Black',
};

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  weight?: FontWeight;
  size?: number;
  lineHeight?: number;
}

export const AppText: React.FC<AppTextProps> = ({
  weight = 400,
  size = 14,
  lineHeight = 20,
  style,
  className,
  children,
  ...props
}: AppTextProps) => {
  return (
    <Text
      style={[
        {
          fontFamily: fontMap[weight],
          fontSize: size,
          lineHeight: lineHeight,
        },
        style,
      ]}
      className={className}
      {...props}
    >
      {children}
    </Text>
  );
};
