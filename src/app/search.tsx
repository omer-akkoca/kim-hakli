import React, { useCallback, useEffect, useState } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { Box } from '@/components/ui';
import {
  AppBackground,
  AppBar,
  AppFlatList,
  AppLoading,
  AppText,
  SearchInput,
  SearchRenderItem,
} from '@/src/components';
import { useSearchStories } from '@/src/actions';
import { IStory } from '../types';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const {
    data: stories = [],
    isLoading,
    refetch,
    isRefetching,
  } = useSearchStories({ query: debouncedQuery });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 1000);

    return () => clearTimeout(timeout);
  }, [query]);

  const ListHeaderComponent = useCallback(() => {
    if (!(debouncedQuery && stories.length !== 0)) return null;
    return (
      <AppText size={12} lineHeight={16} weight={500} className="text-loginText">
        {`"${debouncedQuery}"`} için{' '}
        <AppText size={12} lineHeight={16} weight={500} className="text-primary-500">
          {stories?.length}
        </AppText>{' '}
        sonuç{' '}
      </AppText>
    );
  }, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<IStory>) => <SearchRenderItem story={item} />,
    [],
  );

  return (
    <AppBackground>
      <AppBar backIcon leading={<SearchInput query={query} setQuery={setQuery} />} />
      <Box className="flex-1">
        {isLoading ? (
          <AppLoading fullScreen />
        ) : (
          <AppFlatList
            data={stories}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListHeaderComponent={ListHeaderComponent}
            onRefresh={refetch}
            refreshing={isRefetching}
            noContentText={
              query
                ? `"${query}" için sonuç bulunamadı.`
                : 'Hikaye aramak için arama çubuğunu kullanabilirsiniz.'
            }
            paddingHorizontal={24}
            topPadding
            safeBottom
            bottomPadding
            gap={16}
          />
        )}
      </Box>
    </AppBackground>
  );
};

export default SearchScreen;
