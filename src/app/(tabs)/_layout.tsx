import React, { useEffect } from 'react';
import { SvgProps } from 'react-native-svg';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Tabs } from 'expo-router';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { HStack, Pressable, Box } from '@/components/ui';
import {
  CrownOutlineVector,
  DiscoverVector,
  HomeOutlineVector,
  ProfileOutlineVector,
} from '@/assets';
import { bottomBarHeight, width } from '@/src/constants';
import { useAuth, useModal, useTheme } from '@/src/hooks';
import { ProfileAvatar } from '@/src/components';

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

const tabIcons: Record<string, React.FC<SvgProps>> = {
  home: HomeOutlineVector,
  discover: DiscoverVector,
  profile: ProfileOutlineVector,
  leaderboard: CrownOutlineVector,
};

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const { bottom } = useSafeAreaInsets();
  const { show } = useModal();
  const { user } = useAuth();
  const { colors } = useTheme();

  const visibleRoutes = state.routes.filter((route) => user || route.name !== 'leaderboard');

  const tabWidth = width / visibleRoutes.length;
  const activeRouteName = state.routes[state.index]?.name;

  const activeTabIndex = Math.max(
    visibleRoutes.findIndex((route) => route.name === activeRouteName),
    0,
  );

  const indicatorTranslateX = useSharedValue(activeTabIndex * tabWidth);

  useEffect(() => {
    indicatorTranslateX.value = withTiming(activeTabIndex * tabWidth, {
      duration: 250,
    });
  }, [activeTabIndex, tabWidth, indicatorTranslateX]);

  const indicatorAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorTranslateX.value }],
  }));

  const isFocused = (routeName: string) => activeRouteName === routeName;

  const handleTabPress = (routeName: string, routeKey: string) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: routeKey,
      canPreventDefault: true,
    });

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

      return;
    }

    if (!isFocused(routeName) && !event.defaultPrevented) {
      navigation.navigate(routeName);
    }
  };

  return (
    <Box
      className="border-white/5"
      style={{
        height: bottomBarHeight + bottom,
        borderTopWidth: 1.75,
        backgroundColor: colors.background,
        boxShadow: colors.shadow,
      }}
    >
      <Box className="flex-1" style={{ backgroundColor: colors.navBarBg }}>
        <HStack className="relative flex-1" style={{ marginBottom: bottom }}>
          <Animated.View
            pointerEvents="none"
            style={[
              {
                position: 'absolute',
                top: -1.75,
                left: 0,
                width: tabWidth,
                height: 1.75,
                backgroundColor: colors.primary,
                zIndex: 10,
              },
              indicatorAnimatedStyle,
            ]}
          />

          {visibleRoutes.map((route) => {
            const active = isFocused(route.name);
            const Icon = tabIcons[route.name];
            return (
              <Box key={route.key} className="relative flex-1 items-center justify-center">
                <Pressable
                  className="items-center justify-center"
                  onPress={() => handleTabPress(route.name, route.key)}
                  hitSlop={{ top: 12, right: 12, bottom: 12, left: 12 }}
                >
                  {route.name === 'profile' && user ? (
                    <ProfileAvatar
                      size={25}
                      borderWidth={1.75}
                      borderColor={active ? colors.primary : colors.transparent}
                    />
                  ) : (
                    <Icon
                      width={route.name === 'leaderboard' ? 22 : 25}
                      height={route.name === 'leaderboard' ? 22 : 25}
                      color={active ? colors.primary : colors.headline_50}
                    />
                  )}
                </Pressable>
              </Box>
            );
          })}
        </HStack>
      </Box>
    </Box>
  );
};
