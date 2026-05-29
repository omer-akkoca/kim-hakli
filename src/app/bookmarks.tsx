import React, { useCallback, useMemo } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { Box } from '@/components/ui';
import { AppBackground, AppBar, AppFlatList, AppLoading, StoryRenderItem } from '@/src/components';
import { useAppSelector } from '@/src/store';
import { useGetStoriesByIds } from '@/src/actions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IStory } from '../types';

const BookmarksPage = () => {
  const { bottom } = useSafeAreaInsets();

  const bookmarks = useAppSelector((state) => state.bookmark.bookmarks);

  const { data, isLoading } = useGetStoriesByIds(bookmarks);

  const bookmarkData = useMemo(() => {
    if (!data) return [];
    return data.filter((e) => bookmarks.includes(e.id));
  }, [bookmarks, data]);

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<IStory>) => <StoryRenderItem story={item} order={index} />,
    [],
  );

  return (
    <AppBackground>
      <AppBar backIcon title="Kaydedilenler" />
      <Box className="flex-1">
        {isLoading ? (
          <AppLoading fullScreen />
        ) : (
          <AppFlatList
            data={bookmarkData}
            numColumns={2}
            keyExtractor={(e) => e.id}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 24, paddingBottom: bottom + 24, gap: 8 }}
            noContentText="Kaydedilen hikayeniz bulunmamaktadır."
          />
        )}
      </Box>
    </AppBackground>
  );
};

export default BookmarksPage;
