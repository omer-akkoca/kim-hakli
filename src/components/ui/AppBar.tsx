import React, { PropsWithChildren } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { LeftChevronVector, LOGO } from '@/assets';
import { Box, HStack } from '@/components/ui';
import { appBarHeight, colors } from '@/src/constants';
import { useAppSelector } from '@/src/store';
import { commonStyles } from '@/src/styles';
import { AppText } from './AppText';
import { AppIconButton } from './AppIconButton';
import { CreditLabel } from './CreditLabel';

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
    <Box className="relative bg-background-500" style={commonStyles.barShadow}>
      <Box className="bg-app-bar" style={{ paddingTop: top }}>
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
      </Box>
      <Box className="absolute bottom-0 left-0 right-0 bg-white/5 " style={{ height: 1.75 }} />
    </Box>
  );
};

export { AppBar };
