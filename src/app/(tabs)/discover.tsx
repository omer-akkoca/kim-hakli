import React, { useState } from 'react';
import { Box } from '@/components/ui';
import { GetStoriesParams } from '@/src/types';
import { SearchMagnifyingVector } from '@/assets';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  AppBackground,
  AppBar,
  AppFlatList,
  AppIconButton,
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
        <AppFlatList
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
          loading={isLoading}
          onRefresh={refetch}
          noContentText="Uygun kriterlere uygun hikaye bulunamadı."
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
