import React, { useEffect } from 'react';
import { useGetCategories } from '@/src/actions';
import { AppBackground, AppBar } from '@/src/components';
import { setCategories, useAppDispatch } from '@/src/store';
import { View, Text } from 'react-native';

const HomePage = () => {
  const dipatch = useAppDispatch();

  const { data: categories, isSuccess } = useGetCategories();
  useEffect(() => {
    if (isSuccess && categories) {
      dipatch(setCategories(categories));
    }
  }, [isSuccess, categories]);

  return (
    <AppBackground>
      <AppBar title="Kim Haklı?" creditLabel />
      <View className="flex-1 items-center justify-center">
        <Text className="text-white">Ana Sayfa</Text>
      </View>
    </AppBackground>
  );
};

export default HomePage;
