import React, { useCallback, useMemo } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { Box } from '@/components/ui';
import {
  AppBackground,
  AppBannerAd,
  AppBar,
  AppFlatList,
  AppLoading,
  StoryRenderItem,
} from '@/src/components';
import { useAppSelector } from '@/src/store';
import { useGetStoriesByIds } from '@/src/actions';
import { IStory } from '@/src/types';
import { ADS } from '../constants';

const BookmarksPage = () => {
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
      <AppBar backIcon title="Kaydedilenler">
        <AppBannerAd unitId={ADS.banner.bookmark} />
      </AppBar>
      <Box className="flex-1">
        {isLoading ? (
          <AppLoading fullScreen />
        ) : (
          <AppFlatList
            data={bookmarkData}
            numColumns={2}
            keyExtractor={(e) => e.id}
            renderItem={renderItem}
            noContentText="Kaydedilen hikayeniz bulunmamaktadır."
            topPadding
            paddingHorizontal={24}
            safeBottom
            bottomPadding
            gap={8}
          />
        )}
      </Box>
    </AppBackground>
  );
};

export default BookmarksPage;
