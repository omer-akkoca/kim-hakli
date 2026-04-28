import React from 'react';
import { Tabs } from 'expo-router';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { HStack, VStack, Center, Pressable } from '@/components/ui';
import { BookVector, HomeVector, ProfileVetor } from '@/assets';
import { colors } from '@/src/constants';
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

const icons: Record<string, React.FC<SvgProps>> = {
  home: HomeVector,
  stories: BookVector,
  profile: ProfileVetor,
};

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={{ paddingBottom: bottom }} className="bg-white shadow-lg">
      <HStack className="h-14">
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const Icon = icons[route.name];

          return (
            <Pressable key={route.key} onPress={onPress} className="flex-1">
              <Center className="flex-1">
                <VStack space="xs" className="items-center">
                  <Icon width={40} height={40} color={isFocused ? colors.primary : colors.text} />
                  {/* <Text>{t(`tabs.${route.name}`)}</Text> */}
                </VStack>
              </Center>
            </Pressable>
          );
        })}
      </HStack>
    </View>
  );
};
