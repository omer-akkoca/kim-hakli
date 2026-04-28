import React from 'react';
import { Tabs } from 'expo-router';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import { HStack, VStack, Text, Center, Pressable, Box, Image } from '@/components/ui';
import { useTranslation } from 'react-i18next';
import { HomeVector, LOGO, ProfileVetor } from '@/assets';
import { AppIcon } from '@/src/components';
import { colors, width } from '@/src/constants';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <CustomTabBar {...props} />}>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="stories" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

const LOGO_SIZE = 96;

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
      className="relative bg-white shadow-md rounded-tl-3xl rounded-tr-3xl"
      style={{ paddingBottom: bottom }}
    >
      <HStack style={{ height: 56, zIndex: 9 }}>
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
                  className={`font-semibold ${isFocused('home') ? 'text-primary-500' : 'text-black'}`}
                >
                  {t('tabs.home')}
                </Text>
              </Center>
            </VStack>
          </Pressable>
        </Center>
        <Box className="w-28 h-28" />
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
                  className={`font-semibold ${isFocused('profile') ? 'text-primary-500' : 'text-black'}`}
                >
                  {t('tabs.profile')}
                </Text>
              </Center>
            </VStack>
          </Pressable>
        </Center>
      </HStack>
      <Box style={styles.semicircle} className="bg-white shadow-md">
        <Pressable onPress={() => navigate('stories')} className=" z-20">
          <Image source={LOGO} className="w-28 h-28" alt="logo" />
        </Pressable>
        <Box style={styles.shadowCoverSemicircle} className=" bg-white rotate-180" />
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  semicircle: {
    position: 'absolute',
    left: width / 2 - LOGO_SIZE / 2,
    top: -LOGO_SIZE / 2,
    width: LOGO_SIZE,
    height: LOGO_SIZE / 2,
    borderTopLeftRadius: LOGO_SIZE / 2,
    borderTopRightRadius: LOGO_SIZE / 2,
    zIndex: 11,
  },
  shadowCoverSemicircle: {
    position: 'absolute',
    left: 0,
    bottom: -LOGO_SIZE / 2,
    width: LOGO_SIZE,
    height: LOGO_SIZE / 2,
    borderTopLeftRadius: LOGO_SIZE / 2,
    borderTopRightRadius: LOGO_SIZE / 2,
  },
});
