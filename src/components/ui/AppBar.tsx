import React, { PropsWithChildren } from 'react';
import { Box, HStack, LinearGradient } from '@/components/ui';
import { appBarHeight, colors } from '@/src/constants';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CreditLabel } from './CreditLabel';
import { LeftChevronVector, LOGO } from '@/assets';
import { useRouter } from 'expo-router';
import { AppText } from './AppText';
import { AppIconButton } from './AppIconButton';
import { useAppSelector } from '@/src/store';
import { Image } from 'expo-image';

interface IAppBar extends PropsWithChildren {
  backIcon?: boolean;
  creditLabel?: boolean;
  showLogo?: boolean;
  title?: string;
  leading?: React.ReactNode;
  actions?: React.ReactNode[];
}

const AppBar: React.FC<IAppBar> = ({
  backIcon,
  creditLabel,
  leading,
  showLogo = false,
  title,
  actions = [],
  children,
}) => {
  const { top } = useSafeAreaInsets();
  const { back } = useRouter();

  const { user } = useAppSelector((state) => state.auth);

  const hasContent =
    backIcon || creditLabel || Boolean(leading) || Boolean(title) || actions.length > 0;

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
              style={{ paddingTop: top }}
            >
              {hasContent ? (
                <Box style={{ height: appBarHeight }}>
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
                            width={20}
                            height={20}
                            color={colors.headline}
                          />
                        ) : null}
                        {leading}
                      </HStack>
                    ) : (
                      <HStack space="lg" className="items-center">
                        {backIcon ? (
                          <AppIconButton
                            icon={LeftChevronVector}
                            onPress={back}
                            width={20}
                            height={20}
                            color={colors.headline}
                          />
                        ) : null}
                        {title ? (
                          <HStack space="sm" className="items-center">
                            {showLogo ? (
                              <Image
                                source={LOGO}
                                contentFit="cover"
                                cachePolicy="memory-disk"
                                transition={200}
                                recyclingKey={'logo'}
                                style={{ width: 36, height: 36, borderRadius: 8 }}
                              />
                            ) : null}
                            <AppText size={18} weight={700} className="text-headline">
                              {title}
                            </AppText>
                          </HStack>
                        ) : null}
                      </HStack>
                    )}
                    <HStack space="lg" className="items-center">
                      {creditLabel && user ? <CreditLabel /> : <Box />}
                      {actions.map((e) => e)}
                    </HStack>
                  </HStack>
                </Box>
              ) : null}

              <Box className="w-full">{children}</Box>
            </LinearGradient>
          </LinearGradient>
        </BlurView>
      </Box>
    </Box>
  );
};

export { AppBar };
