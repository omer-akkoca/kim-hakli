import React, { useMemo } from 'react';
import { FlatList } from 'react-native';
import { AppBackground, AppBar, AppText, StoryRenderItem } from '@/src/components';
import { Box, Spinner } from '@/components/ui';
import { useAppSelector } from '@/src/store';
import { colors } from '@/src/constants';
import { useGetStoriesByIds } from '@/src/actions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BookmarksPage = () => {
  const { bottom } = useSafeAreaInsets();

  const bookmarks = useAppSelector((state) => state.bookmark.bookmarks);

  const { data, isLoading } = useGetStoriesByIds(bookmarks);

  const bookmarkData = useMemo(() => {
    if (!data) return [];
    return data.filter((e) => bookmarks.includes(e.id));
  }, [bookmarks, data]);

  return (
    <AppBackground>
      <AppBar backIcon title="Kaydedilenler" />
      <Box className="flex-1">
        {isLoading ? (
          <Box className="flex-1 items-center justify-center">
            <Spinner color={colors.primary} size="large" />
          </Box>
        ) : (
          <FlatList
            data={bookmarkData}
            numColumns={2}
            keyExtractor={(e) => e.id}
            renderItem={({ item, index }) => <StoryRenderItem order={index} story={item} />}
            contentContainerStyle={{ padding: 24, paddingBottom: bottom + 24, gap: 8 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <AppText size={12} weight={600} className="text-loginText text-center">
                Kaydedilen hikayeniz bulunmamaktadır.
              </AppText>
            }
          />
        )}
      </Box>
    </AppBackground>
  );
};

export default BookmarksPage;
