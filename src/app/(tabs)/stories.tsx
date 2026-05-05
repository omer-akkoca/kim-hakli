import React, { useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Center, Pressable, Text, HStack } from '@/components/ui';
import { GetStoriesParams } from '@/src/types';
import { useStories } from '@/src/actions';
import { colors } from '@/src/constants';
import { FilterVector } from '@/assets';
import { AppBar, StoryFilterDrawer, StoryRenderItem } from '@/src/components';

const StoriesPage = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const [appliedFilters, setAppliedFilters] = useState<GetStoriesParams>({
    artStyle: '',
    categoryIds: [],
  });

  const { data: stories, isLoading } = useStories(appliedFilters);

  return (
    <>
      <View className="flex-1 bg-backgroud-500">
        <AppBar>
          <HStack className="items-center justify-between">
            <Text className="text-headline-500 text-2xl font-bold">Hikayeler</Text>
            <Pressable onPress={() => setShowDrawer(true)}>
              <FilterVector width={24} height={24} color={colors.white} />
            </Pressable>
          </HStack>
        </AppBar>
        <View className="flex-1">
          {isLoading ? (
            <Center className="flex-1">
              <ActivityIndicator size={'large'} />
            </Center>
          ) : (
            <FlatList
              data={stories}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <StoryRenderItem item={item} />}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              columnWrapperClassName="justify-between"
              contentContainerStyle={{ gap: 24 }}
              contentContainerClassName="px-6 py-6"
              ListEmptyComponent={
                <View className="mt-10 items-center">
                  <Text className="text-base text-text">Henüz hikaye bulunmuyor.</Text>
                </View>
              }
            />
          )}
        </View>
      </View>
      <StoryFilterDrawer
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        appliedFilters={appliedFilters}
        setAppliedFilters={setAppliedFilters}
      />
    </>
  );
};

export default StoriesPage;
