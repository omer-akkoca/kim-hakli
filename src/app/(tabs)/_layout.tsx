import React from 'react';
import { Tabs } from 'expo-router';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { HStack, VStack, Center, Pressable, Text, Box, Image } from '@/components/ui';
import { APP_LOGO, HomeVector, ProfileVetor } from '@/assets';
import { bottomBarHeight, colors, width } from '@/src/constants';
import { useTranslation } from 'react-i18next';
import { AppIcon } from '@/src/components';

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

const LOGO_SIZE = bottomBarHeight + 25;
const LOGO_BOX_SIZE = LOGO_SIZE;

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
    <View
      className="relative bg-backgroud shadow-md shadow-black/50"
      style={{ paddingBottom: bottom }}
    >
      <Box className="relative" style={{ height: 56, zIndex: 9 }}>
        <Box
          className="bg-backgroud rounded-full shadow-md shadow-black/50"
          style={styles.centerButtonCircle}
        />
        <HStack
          className="bg-backgroud absolute left-0 top-0 w-full"
          style={{ height: bottomBarHeight + bottom, paddingBottom: bottom }}
        >
          <Pressable style={styles.centerButton} onPress={() => navigate('stories')}>
            <Image
              source={APP_LOGO}
              style={{ width: LOGO_SIZE, height: LOGO_SIZE, backgroundColor: 'red' }}
              alt="logo"
            />
          </Pressable>
          <Center className="flex-1">
            <Pressable onPress={() => navigate('home')}>
              <VStack>
                <Center>
                  <AppIcon
                    icon={HomeVector}
                    width={24}
                    height={24}
                    color={isFocused('home') ? colors.primary : colors.black}
                    darkColor={isFocused('home') ? colors.primary : colors.white}
                  />
                  <Text
                    className={`font-semibold ${isFocused('home') ? 'text-primary' : 'text-black'}`}
                  >
                    {t('tabs.home')}
                  </Text>
                </Center>
              </VStack>
            </Pressable>
          </Center>
          <Box className="flex-1" />
          <Center className="flex-1">
            <Pressable onPress={() => navigate('profile')}>
              <VStack>
                <Center>
                  <AppIcon
                    icon={ProfileVetor}
                    width={24}
                    height={24}
                    color={isFocused('profile') ? colors.primary : colors.black}
                    darkColor={isFocused('profile') ? colors.primary : colors.white}
                  />
                  <Text
                    className={`font-semibold ${isFocused('profile') ? 'text-primary' : 'text-black'}`}
                  >
                    {t('tabs.profile')}
                  </Text>
                </Center>
              </VStack>
            </Pressable>
          </Center>
        </HStack>
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  centerButtonCircle: {
    position: 'absolute',
    bottom: 0,
    left: width / 2 - LOGO_BOX_SIZE / 2,
    width: LOGO_BOX_SIZE,
    height: LOGO_BOX_SIZE,
  },
  centerButton: {
    position: 'absolute',
    left: width / 2 - LOGO_BOX_SIZE / 2,
    top: -(LOGO_BOX_SIZE - bottomBarHeight),
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
