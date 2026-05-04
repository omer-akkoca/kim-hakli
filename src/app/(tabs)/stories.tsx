import React, { useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Center, Pressable, Text, HStack, Box } from '@/components/ui';
import { GetStoriesParams } from '@/src/types';
import { useStories } from '@/src/actions';
import { colors } from '@/src/constants';
import { FilterVector, SearchMagnifyingVector } from '@/assets';
import { AppBar, StoryFilterDrawer, StoryRenderItem, StorySearchInput } from '@/src/components';

const StoriesPage = () => {
  const [showSearchInput, setShowSearchInput] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);

  const [appliedFilters, setAppliedFilters] = useState<GetStoriesParams>({
    artStyle: '',
    categoryIds: [],
  });

  const [query, setQuery] = useState('');

  const { data: stories, isLoading } = useStories(appliedFilters);

  return (
    <>
      <View className="flex-1 bg-backgroud">
        <AppBar>
          {showSearchInput ? (
            <StorySearchInput
              query={query}
              setQuery={setQuery}
              setShowSearchInput={setShowSearchInput}
            />
          ) : (
            <HStack space="md" className="items-center">
              <Box className="w-10 h-10" />
              <Text className="flex-1 text-center text-white font-semibold text-2xl">
                Hikayeler
              </Text>
              <Pressable
                onPress={() => setShowSearchInput(true)}
                className="w-10 h-10 items-center justify-center"
              >
                <SearchMagnifyingVector width={20} height={20} color={colors.white} />
              </Pressable>
            </HStack>
          )}
        </AppBar>
        <View className="flex-1">
          {isLoading ? (
            <Center className="flex-1">
              <ActivityIndicator size={'large'} />
            </Center>
          ) : (
            <FlatList
              data={stories?.filter((e) => e.title.toLowerCase().includes(query.toLowerCase()))}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <StoryRenderItem item={item} />}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              columnWrapperClassName="justify-between"
              contentContainerStyle={{ gap: 24 }}
              contentContainerClassName="px-6 pt-6"
              ListHeaderComponent={
                <HStack className="items-center justify-between">
                  <Text className="text-xl text-white font-semibold">{stories?.length} Hikaye</Text>
                  <Pressable onPress={() => setShowDrawer(true)}>
                    <FilterVector width={24} height={24} color={colors.white} />
                  </Pressable>
                </HStack>
              }
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
