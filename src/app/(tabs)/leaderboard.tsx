import { useEffect, useState } from 'react';
import { Pressable, useWindowDimensions } from 'react-native';
import { NavigationState, SceneRendererProps, TabView } from 'react-native-tab-view';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { HStack } from '@/components/ui';
import {
  AllTimeLeaderboard,
  AppBackground,
  AppBar,
  AppText,
  MonthlyLeaderboard,
} from '@/src/components';
import { appBarHeight, colors } from '@/src/constants';

type LeaderboardRoute = {
  key: 'all' | 'month';
  title: string;
};

const routes: LeaderboardRoute[] = [
  { key: 'all', title: 'Genel Sıralama' },
  { key: 'month', title: 'Aylık Sıralama' },
];

type LeaderboardTabBarProps = SceneRendererProps & {
  navigationState: NavigationState<LeaderboardRoute>;
};

const LeaderboardTabBar: React.FC<LeaderboardTabBarProps> = ({ navigationState, jumpTo }) => {
  const [barWidth, setBarWidth] = useState(0);
  const tabProgress = useSharedValue(navigationState.index);

  const tabWidth = barWidth / navigationState.routes.length;

  useEffect(() => {
    tabProgress.value = withTiming(navigationState.index, {
      duration: 280,
      easing: Easing.out(Easing.cubic),
    });
  }, [navigationState.index, tabProgress]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: tabProgress.value * tabWidth,
      },
    ],
  }));

  return (
    <AppBar>
      <HStack
        className="relative w-full"
        style={{ height: appBarHeight }}
        onLayout={(event) => setBarWidth(event.nativeEvent.layout.width)}
      >
        {navigationState.routes.map((route, routeIndex) => {
          const active = routeIndex === navigationState.index;

          return (
            <Pressable
              key={route.key}
              onPress={() => jumpTo(route.key)}
              className="flex-1 h-full items-center justify-center px-3"
            >
              <AppText
                size={14}
                lineHeight={16}
                weight={active ? 500 : 400}
                className={active ? 'text-primary-500' : 'text-loginText'}
              >
                {route.title}
              </AppText>
            </Pressable>
          );
        })}

        {barWidth > 0 && (
          <Animated.View
            pointerEvents="none"
            style={[
              {
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: tabWidth,
                height: 1.75,
                backgroundColor: colors.primary,
              },
              indicatorStyle,
            ]}
          />
        )}
      </HStack>
    </AppBar>
  );
};

const LeaderBoardPage = () => {
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const renderScene = ({ route }: { route: LeaderboardRoute }) => {
    if (route.key === 'all') return <AllTimeLeaderboard />;
    if (route.key === 'month') return <MonthlyLeaderboard />;
  };

  return (
    <AppBackground>
      <TabView
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        renderTabBar={(props) => <LeaderboardTabBar {...props} />}
        initialLayout={{ width }}
        animationEnabled
        swipeEnabled
        lazy
        lazyPreloadDistance={1}
      />
    </AppBackground>
  );
};

export default LeaderBoardPage;
