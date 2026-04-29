import React, { useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Center, Pressable, Text, HStack } from '@/components/ui';
import { GetStoriesParams } from '@/src/types';
import { useStories } from '@/src/actions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/src/constants';
import { FilterVector } from '@/assets';
import { StoryFilterDrawer, StoryRenderItem, StorySearchInput } from '@/src/components';

export default function StoriesPage() {
  const { top } = useSafeAreaInsets();

  const [showDrawer, setShowDrawer] = useState(false);

  const [appliedFilters, setAppliedFilters] = useState<GetStoriesParams>({
    artStyle: '',
    categoryIds: [],
  });

  const [query, setQuery] = useState('');

  const { data: stories, isLoading } = useStories(appliedFilters);

  return (
    <>
      <View className="flex-1 bg-backgroud gap-6" style={{ paddingTop: top }}>
        <StorySearchInput query={query} setQuery={setQuery} />
        <HStack className="items-center justify-between px-6">
          <Text className="text-xl text-headline font-semibold">{stories?.length} Hikaye</Text>
          <Pressable onPress={() => setShowDrawer(true)}>
            <FilterVector width={24} height={24} color={colors.headline} />
          </Pressable>
        </HStack>
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
              contentContainerStyle={{ paddingHorizontal: 24, gap: 24 }}
              contentContainerClassName="pb-6"
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
}
