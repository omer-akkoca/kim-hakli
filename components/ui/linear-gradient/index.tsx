'use client';

import { forwardRef } from 'react';
import {
  LinearGradient as ExpoLinearGradient,
  type LinearGradientProps,
} from 'expo-linear-gradient';
import { cssInterop } from 'nativewind';
import { tva } from '@gluestack-ui/utils/nativewind-utils';

cssInterop(ExpoLinearGradient, {
  className: 'style',
});

const linearGradientStyle = tva({
  base: '',
});

type Props = LinearGradientProps & {
  className?: string;
};

export const LinearGradient = forwardRef<any, Props>(({ className, ...props }, ref) => {
  return (
    <ExpoLinearGradient
      ref={ref}
      {...props}
      className={linearGradientStyle({ class: className })}
    />
  );
});

LinearGradient.displayName = 'LinearGradient';
