import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import { SvgProps } from 'react-native-svg';
import { BlurView } from 'expo-blur';
import { HStack, Pressable, Box } from '@/components/ui';
import {
  CrownOutlineVector,
  CrownVector,
  DiscoverVector,
  GlowEffect,
  HomeFillVector,
  HomeOutlineVector,
  ProfileFillVector,
  ProfileOutlineVector,
} from '@/assets';
import { bottomBarHeight, colors, W, width } from '@/src/constants';
import { AppText } from '@/src/components';
import { useAuth, useModal } from '@/src/hooks';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { position: 'absolute' },
      }}
      safeAreaInsets={{ bottom: 0 }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="discover" />
      <Tabs.Screen name="leaderboard" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

const tabIcons: Record<string, React.FC<SvgProps>[]> = {
  home: [HomeFillVector, HomeOutlineVector],
  discover: [DiscoverVector, DiscoverVector],
  profile: [ProfileFillVector, ProfileOutlineVector],
  leaderboard: [CrownVector, CrownOutlineVector],
};

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation();
  const { show } = useModal();
  const { user } = useAuth();

  const visibleRoutes = state.routes.filter((route) => {
    return user || route.name !== 'leaderboard';
  });

  const tabWidth = width / visibleRoutes.length;

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

  const activeIndex = visibleRoutes.findIndex(
    (route) => route.name === state.routes[state.index].name,
  );

  const translateX = useSharedValue(activeIndex * tabWidth + tabWidth / 2 - 2);

  useEffect(() => {
    const safeIndex = activeIndex >= 0 ? activeIndex : 0;

    translateX.value = withSpring(safeIndex * tabWidth + tabWidth / 2 - 2, { stiffness: 500 });
  }, [activeIndex, tabWidth]);

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
            {visibleRoutes.map((e) => {
              const active = isFocused(e.name);
              const Icon = active ? tabIcons[e.name][0] : tabIcons[e.name][1];
              return (
                <Box key={e.name} className="relative flex-1 items-center justify-center">
                  <Pressable
                    className="items-center justify-center"
                    onPress={() => navigate(e.name)}
                  >
                    <Icon
                      width={W(23)}
                      height={W(23)}
                      color={active ? colors.primary : colors.secondary}
                    />
                    <AppText
                      size={W(12)}
                      lineHeight={W(18)}
                      weight={500}
                      className={`w-full mt-1 ${active ? 'text-primary-500' : 'text-secondary-500'}`}
                    >
                      {t(`tabs.${e.name}`)}
                    </AppText>
                    <Box className="h-1" />
                  </Pressable>
                  {active ? (
                    <GlowEffect
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: tabWidth / 2 - 60,
                      }}
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
