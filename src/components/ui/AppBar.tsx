import React, { PropsWithChildren } from 'react';
import { Box, HStack, LinearGradient, Pressable } from '@/components/ui';
import { appBarHeight, colors } from '@/src/constants';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CreditLabel } from './CreditLabel';
import { LeftChevronVector } from '@/assets';
import { useRouter } from 'expo-router';
import { AppText } from './AppText';
import { AppIconButton } from './AppIconButton';

interface IAppBar extends PropsWithChildren {
  backIcon?: boolean;
  creditLabel?: boolean;
  title?: string;
  leading?: React.ReactNode;
  actions?: React.ReactNode[];
}

const AppBar: React.FC<IAppBar> = ({
  backIcon,
  creditLabel,
  leading,
  title,
  actions = [],
  children,
}) => {
  const { top } = useSafeAreaInsets();
  const { back } = useRouter();

  return (
    <Box
      className="relative bg-background-500 border-b border-white/5"
      style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.18)' }}
    >
      <Box className="bg-app-bar">
        <BlurView intensity={18} tint="dark">
          <LinearGradient
            colors={['rgba(124,144,164,0.08)', 'rgba(124,144,164,0)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <LinearGradient
              colors={['rgba(241,118,42,0.04)', 'rgba(241,118,42,0)']}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
            >
              <Box style={{ height: appBarHeight, marginTop: top }}>
                <HStack
                  className="flex-1 items-center justify-between"
                  style={{ paddingHorizontal: 24 }}
                >
                  {leading ? (
                    <HStack space="lg" className="items-center">
                      {backIcon ? (
                        <AppIconButton
                          icon={LeftChevronVector}
                          onPress={back}
                          width={24}
                          height={24}
                          color={colors.headline}
                        />
                      ) : null}
                      {leading}
                    </HStack>
                  ) : (
                    <HStack space="lg" className="items-center">
                      {backIcon ? (
                        <Pressable onPress={back}>
                          <LeftChevronVector width={24} height={24} color={colors.headline} />
                        </Pressable>
                      ) : null}
                      {title ? (
                        <AppText size={18} weight={700} className="text-headline">
                          {title}
                        </AppText>
                      ) : null}
                    </HStack>
                  )}
                  <HStack space="lg" className="items-center">
                    {creditLabel ? <CreditLabel /> : <Box />}
                    {actions.map((e) => e)}
                  </HStack>
                </HStack>
              </Box>

              <Box className="w-full">{children}</Box>
            </LinearGradient>
          </LinearGradient>
        </BlurView>
      </Box>
    </Box>
  );
};

export { AppBar };
