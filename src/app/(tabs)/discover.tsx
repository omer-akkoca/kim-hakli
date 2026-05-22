import React, { useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { Box } from '@/components/ui';
import { GetStoriesParams } from '@/src/types';
import { SearchMagnifyingVector } from '@/assets';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  AppBackground,
  AppBar,
  AppIconButton,
  AppText,
  DiscoverFilterDrawer,
  DiscoverFilterTabs,
  StoryRenderItem,
} from '@/src/components';
import { bottomBarHeight, colors } from '@/src/constants';
import { useRouter } from 'expo-router';
import { useGetStories } from '@/src/actions';

const DiscoverPage = () => {
  const { push } = useRouter();
  const { bottom } = useSafeAreaInsets();

  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const [filters, setFilters] = useState<GetStoriesParams>({
    artStyle: 'all',
    categoryCode: undefined,
    creditFilter: 'all',
  });

  const {
    data: stories,
    isLoading,
    refetch,
  } = useGetStories({
    artStyle: filters.artStyle,
    categoryCode: filters.categoryCode,
    creditFilter: filters.creditFilter,
  });

  return (
    <AppBackground>
      <AppBar
        creditLabel
        title="Keşfet"
        actions={[
          <AppIconButton
            key="search"
            icon={SearchMagnifyingVector}
            onPress={() => push('/search')}
            width={20}
            height={20}
            color={colors.headline}
          />,
        ]}
      >
        <DiscoverFilterTabs
          filters={filters}
          setFilters={setFilters}
          setShowDrawer={setShowDrawer}
        />
      </AppBar>
      <Box className="w-full flex-1">
        <FlatList
          data={stories}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => <StoryRenderItem order={index} story={item} />}
          contentContainerStyle={{
            paddingTop: 24,
            paddingBottom: bottom + bottomBarHeight + 24,
            paddingHorizontal: 24,
            gap: 8,
          }}
          contentContainerClassName="px-6"
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            isLoading ? undefined : (
              <AppText size={12} weight={600} className="text-loginText text-center">
                Uygun kriterlere göre hikaye bulunamadı.
              </AppText>
            )
          }
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={refetch}
              tintColor={colors.primary}
              progressBackgroundColor={colors.backgroud}
              colors={[colors.primary]}
            />
          }
        />
      </Box>
      <DiscoverFilterDrawer
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        filters={filters}
        setFilters={setFilters}
      />
    </AppBackground>
  );
};

export default DiscoverPage;
