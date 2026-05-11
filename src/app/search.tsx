import React, { useState } from 'react';
import { Box, Center } from '@/components/ui';
import { AppBar, AppText, SearchInput, SearchRenderItem } from '../components';
import { useStories } from '../actions';
import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SearchScreen = () => {
  const { bottom } = useSafeAreaInsets();

  const [query, setQuery] = useState('');

  const { data: stories } = useStories();

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
            query ? (
              <AppText size={12} lineHeight={16} weight={500} className="text-loginText">
                {`"${query}"`} için{' '}
                <AppText size={12} lineHeight={16} weight={500} className="text-primary-500">
                  {stories?.length}
                </AppText>{' '}
                sonuç{' '}
              </AppText>
            ) : null
          }
          ListEmptyComponent={
            <Center>
              <AppText size={12} lineHeight={16} className="text-loginText">
                Hikaye bulunamadı
              </AppText>
            </Center>
          }
        />
      </Box>
    </Box>
  );
};

export default SearchScreen;
