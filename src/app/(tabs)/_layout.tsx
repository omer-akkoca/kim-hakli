import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HStack, Pressable, Box } from '@/components/ui';
import {
  DiscoverVector,
  GlowEffect,
  HomeFillVector,
  HomeOutlineVector,
  ProfileFillVector,
  ProfileOutlineVector,
} from '@/assets';
import { bottomBarHeight, colors, width } from '@/src/constants';
import { useTranslation } from 'react-i18next';
import { SvgProps } from 'react-native-svg';
import { BlurView } from 'expo-blur';
import { AppText } from '@/src/components';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useAppSelector } from '@/src/store';
import { useModal } from '@/src/hooks';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false, tabBarStyle: { position: 'absolute' } }}
      safeAreaInsets={{ bottom: 0 }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="discover" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

const tabIcons: Record<string, React.FC<SvgProps>[]> = {
  home: [HomeFillVector, HomeOutlineVector],
  discover: [DiscoverVector, DiscoverVector],
  profile: [ProfileFillVector, ProfileOutlineVector],
};

const tabWidth = width / 3;

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation();
  const { show } = useModal();

  const { user } = useAppSelector((state) => state.auth);

  const isFocused = (routeName: string) => {
    return state.routes[state.index].name === routeName;
  };

  const navigate = (routeName: string) => {
    if (routeName === 'profile' && !user) {
      show({
        title: 'Giriş Yap',
        subtitle:
          'Profiline erişmek ve uygulama deneyimini kişiselleştirmek için giriş yapmalısın.',
        buttons: [
          {
            label: 'Giriş Yap',
            onPress: () => navigation.navigate('auth/login'),
          },
          {
            label: 'İptal',
          },
        ],
      });
    } else {
      navigation.navigate(routeName);
    }
  };

  const activeIndex = state.routes.findIndex((e) => isFocused(e.name));

  const translateX = useSharedValue(activeIndex * tabWidth + tabWidth / 2 - 2);

  useEffect(() => {
    translateX.value = withSpring(activeIndex * tabWidth + tabWidth / 2 - 2, {
      stiffness: 500,
    });
  }, [activeIndex]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Box
      className="absolute -left-[1px] bottom-0 w-full bg-dreamless-sleep/75 border-t border-r border-l border-white/10 rounded-tr-bottom-nav-bar rounded-tl-bottom-nav-bar overflow-hidden"
      style={{
        width: width + 2,
        height: bottomBarHeight + bottom,
        boxShadow: '0 14px 36px rgba(0,0,0,0.32)',
      }}
    >
      <Box className="flex-1 bg-bottom-nav-bar rounded-tr-bottom-nav-bar rounded-tl-bottom-nav-bar">
        <BlurView intensity={18} tint="dark" className="flex-1">
          <HStack className="flex-1" style={{ marginBottom: bottom }}>
            {state.routes.map((e) => {
              const active = isFocused(e.name);
              const Icon = active ? tabIcons[e.name][0] : tabIcons[e.name][1];
              return (
                <Box key={e.name} className="relative flex-1 items-center justify-center">
                  <Pressable
                    className="items-center justify-center"
                    onPress={() => navigate(e.name)}
                  >
                    <Icon
                      width={24}
                      height={24}
                      color={active ? colors.primary : colors.secondary}
                    />
                    <AppText
                      size={13}
                      lineHeight={18}
                      weight={500}
                      className={`w-full mt-1 ${active ? 'text-primary-500' : 'text-secondary-500'}`}
                    >
                      {t(`tabs.${e.name}`)}
                    </AppText>
                    <Box className="h-1" />
                  </Pressable>
                  {active ? (
                    <GlowEffect
                      style={{ position: 'absolute', top: 0, left: width / 3 / 2 - 60 }}
                    />
                  ) : null}
                </Box>
              );
            })}
          </HStack>
          <Animated.View
            className="absolute left-0 w-1.5 h-1.5 rounded-full bg-primary-500"
            style={[{ bottom: bottom + 4, backgroundColor: colors.primary }, animatedStyle]}
          />
        </BlurView>
      </Box>
    </Box>
  );
};
