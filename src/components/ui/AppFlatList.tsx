import React, { useMemo } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { AppText } from './AppText';
import { bottomBarHeight, colors } from '@/src/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type AppFlatListOmittedProps =
  | 'refreshControl'
  | 'ListEmptyComponent'
  | 'showsVerticalScrollIndicator'
  | 'showsHorizontalScrollIndicator'
  | 'contentContainerStyle';

interface AppFlatListProps<T> extends Omit<
  React.ComponentProps<typeof FlatList<T>>,
  AppFlatListOmittedProps
> {
  noContentText?: string;
  loading?: boolean;
  onRefresh?: () => void;
  flatListRef?: React.Ref<FlatList<T>>;
  topPadding?: boolean;
  safeTop?: boolean;
  bottomPadding?: boolean;
  safeBottom?: boolean;
  safeBottomNav?: boolean;
  paddingHorizontal?: number;
  gap?: number;
}

const AppFlatList = <T,>({
  noContentText,
  loading = false,
  onRefresh,
  flatListRef,
  topPadding,
  safeTop,
  bottomPadding,
  safeBottom,
  safeBottomNav,
  paddingHorizontal,
  gap,
  ...props
}: AppFlatListProps<T>) => {
  const { top, bottom } = useSafeAreaInsets();

  const paddingTop = useMemo(() => {
    let padding = 0;
    if (topPadding) padding += 24;
    if (safeTop) padding += top;
    return padding;
  }, [topPadding, safeTop, top]);

  const paddingBottom = useMemo(() => {
    let padding = 0;
    if (bottomPadding) padding += 24;
    if (safeBottom) padding += bottom;
    if (safeBottomNav) padding += bottomBarHeight;
    return padding;
  }, [bottomPadding, safeBottom, safeBottomNav, bottom]);

  const ListEmptyComponent = useMemo(() => {
    if (loading || !noContentText) return undefined;
    return (
      <AppText size={12} weight={600} className="text-loginText text-center">
        {noContentText}
      </AppText>
    );
  }, [loading, noContentText]);

  return (
    <FlatList<T>
      ref={flatListRef}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={{ paddingTop, paddingBottom, paddingHorizontal, gap }}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            progressBackgroundColor={colors.backgroud}
            colors={[colors.primary]}
          />
        ) : undefined
      }
      {...props}
    />
  );
};

export { AppFlatList };
