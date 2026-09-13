import React, { useCallback, useMemo, useState } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { useRouter } from 'expo-router';
import { FilterVector, SearchMagnifyingVector } from '@/assets';
import { Box } from '@/components/ui';
import { GetStoriesParams } from '@/src/types';
import {
  AppBackground,
  AppBar,
  AppFlatList,
  AppIconButton,
  AppLoading,
  DiscoverFilterDrawer,
  DiscoverListItem,
  DiscoverNativeAd,
  DiscoverSkeleton,
  StoryRenderItem,
} from '@/src/components';
import { colors } from '@/src/constants';
import { useGetStories } from '@/src/actions';

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

  const discoverItems = useMemo<DiscoverListItem[]>(() => {
    const items: DiscoverListItem[] = [];

    stories.forEach((story, index) => {
      items.push({
        type: 'story',
        story,
        order: items.length,
      });

      if ((index + 1) % 6 === 0) {
        items.push({
          type: 'native_ad',
          id: `discover-native-ad-${index}`,
          order: items.length,
        });
      }
    });

    return items;
  }, [stories]);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<DiscoverListItem>) => {
    if (item.type === 'native_ad') {
      return <DiscoverNativeAd order={item.order} />;
    }

    return <StoryRenderItem order={item.order} story={item.story} />;
  }, []);

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
          <AppIconButton
            key={'filter'}
            icon={FilterVector}
            onPress={() => setShowDrawer(true)}
            width={20}
            height={20}
            color={colors.headline}
          />,
        ]}
      />
      <Box className="w-full flex-1">
        {isLoading ? (
          <DiscoverSkeleton />
        ) : (
          <AppFlatList
            data={discoverItems}
            keyExtractor={(item) => (item.type === 'story' ? item.story.id : item.id)}
            numColumns={2}
            renderItem={renderItem}
            initialNumToRender={6}
            maxToRenderPerBatch={6}
            updateCellsBatchingPeriod={50}
            windowSize={7}
            removeClippedSubviews
            loading={isRefetching}
            onRefresh={refetch}
            noContentText="Uygun kriterlere uygun hikaye bulunamadı."
            paddingHorizontal={24}
            topPadding
            bottomPadding
            gap={8}
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={isFetchingNextPage ? <AppLoading size="small" /> : null}
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
