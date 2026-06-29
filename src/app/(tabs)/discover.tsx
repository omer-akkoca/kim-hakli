import React, { useCallback, useMemo, useState } from 'react';
import { Box } from '@/components/ui';
import { GetStoriesParams, IStory } from '@/src/types';
import { SearchMagnifyingVector } from '@/assets';
import {
  AppBackground,
  AppBar,
  AppFlatList,
  AppIconButton,
  AppLoading,
  DiscoverFilterDrawer,
  DiscoverFilterTabs,
  StoryRenderItem,
} from '@/src/components';
import { colors } from '@/src/constants';
import { useRouter } from 'expo-router';
import { useGetStories } from '@/src/actions';
import { ListRenderItemInfo } from 'react-native';

const DiscoverPage = () => {
  const { push } = useRouter();

  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const [filters, setFilters] = useState<GetStoriesParams>({
    artStyle: 'all',
    categoryCode: undefined,
    creditFilter: 'all',
  });

  const { data, isLoading, refetch, isRefetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetStories({
      artStyle: filters.artStyle,
      categoryCode: filters.categoryCode,
      creditFilter: filters.creditFilter,
    });

  const stories = useMemo(() => {
    return data?.pages.flat() ?? [];
  }, [data]);

  const renderItem = useCallback(
    ({ index, item }: ListRenderItemInfo<IStory>) => <StoryRenderItem order={index} story={item} />,
    [],
  );

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
        {isLoading ? (
          <AppLoading fullScreen />
        ) : (
          <AppFlatList
            data={stories}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            loading={isRefetching}
            onRefresh={refetch}
            noContentText="Uygun kriterlere uygun hikaye bulunamadı."
            paddingHorizontal={24}
            topPadding
            safeBottom
            safeBottomNav
            bottomPadding
            gap={8}
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={isFetchingNextPage ? <AppLoading size={'small'} /> : null}
          />
        )}
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
