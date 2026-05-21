import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Box } from '@/components/ui';
import { AppBar, AppLoading, AppText, SearchInput, SearchRenderItem } from '@/src/components';
import { useSearchStories } from '@/src/actions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SearchScreen = () => {
  const { bottom } = useSafeAreaInsets();

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const { data: stories = [], isFetching } = useSearchStories({ query: debouncedQuery });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 1000);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <Box className="flex-1 bg-background-500">
      <AppBar backIcon leading={<SearchInput query={query} setQuery={setQuery} />} />
      <Box className="flex-1">
        <FlatList
          data={stories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SearchRenderItem story={item} />}
          contentContainerStyle={{ padding: 24, paddingBottom: bottom + 24, gap: 16 }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            debouncedQuery && stories.length !== 0 ? (
              <AppText size={12} lineHeight={16} weight={500} className="text-loginText">
                {`"${debouncedQuery}"`} için{' '}
                <AppText size={12} lineHeight={16} weight={500} className="text-primary-500">
                  {stories?.length}
                </AppText>{' '}
                sonuç{' '}
              </AppText>
            ) : null
          }
          ListEmptyComponent={
            isFetching ? (
              <AppLoading />
            ) : (
              <AppText size={12} lineHeight={16} className="text-loginText text-center">
                {query
                  ? `"${query}" için sonuç bulunamadı.`
                  : 'Hikaye aramak için arama çubuğunu kullanabilirsiniz.'}
              </AppText>
            )
          }
        />
      </Box>
    </Box>
  );
};

export default SearchScreen;
