import React from 'react';
import { Tabs } from 'expo-router';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HStack, VStack, Center, Pressable, Text, Box } from '@/components/ui';
import {
  BookFillVector,
  BookOutlineVector,
  HomeFillVector,
  HomeOutlineVector,
  ProfileFillVector,
  ProfileOutlineVector,
} from '@/assets';
import { bottomBarHeight, colors } from '@/src/constants';
import { useTranslation } from 'react-i18next';
import { SvgProps } from 'react-native-svg';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      safeAreaInsets={{ bottom: 0 }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="stories" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

const icons: Record<string, React.FC<SvgProps>[]> = {
  home: [HomeFillVector, HomeOutlineVector],
  stories: [BookFillVector, BookOutlineVector],
  profile: [ProfileFillVector, ProfileOutlineVector],
};

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation();

  const isFocused = (routeName: string) => {
    return state.routes[state.index].name === routeName;
  };

  const navigate = (routeName: string) => {
    navigation.navigate(routeName);
  };

  return (
    <Box
      className="relative bg-backgroud-700 shadow-md shadow-white/10"
      style={{ paddingBottom: bottom }}
    >
      <HStack className="bg-backgroud-700" style={{ height: bottomBarHeight }}>
        {state.routes.map((e, i) => {
          const active = isFocused(e.name);
          const Icon = active ? icons[e.name][0] : icons[e.name][1];
          return (
            <Center
              key={i.toString()}
              className={`flex-1 border-t ${active ? 'border-headline-500' : 'border-transparent'}`}
            >
              <Pressable onPress={() => navigate(e.name)}>
                <VStack className="items-center">
                  <Icon
                    width={20}
                    height={20}
                    color={active ? colors.headline : colors.quickSilver}
                    strokeWidth={1}
                  />
                  <Text
                    style={{
                      color: active ? colors.headline : colors.quickSilver,
                      fontWeight: active ? '600' : '500',
                    }}
                    className="text-sm tracking-wide leading-6"
                  >
                    {t(`tabs.${e.name}`)}
                  </Text>
                </VStack>
              </Pressable>
            </Center>
          );
        })}
      </HStack>
    </Box>
  );
};
